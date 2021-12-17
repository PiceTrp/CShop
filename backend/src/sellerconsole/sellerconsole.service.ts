import { HttpException, Injectable } from '@nestjs/common';
import { CreateSellerconsoleDto } from './dto/create-sellerconsole.dto';
import { UpdateSellerconsoleDto } from './dto/update-sellerconsole.dto';
import { DiscountClass, DiscountTypes, OrderStatus, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Timestamp } from 'rxjs';

@Injectable()
export class SellerconsoleService {
	constructor(private readonly prisma: PrismaService) { }

	async getstockHistory(shopid: number) {
		const res = await this.prisma.product.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				id: true,
				title: true,
				sconsole_stock_history: {
					select: {
						quantity: true,
						updated_date: true,
					},
				},
			},
		});
		return res;
	}

	async getdiscountHistory(shopid: number) {
		const res = await this.prisma.sconsole_discount_log.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				discount_id: true,
				customer_id_from_sconsole_discount_log: true,
				product_id_from_sconsole_discount_log: true,
			},
		});
		return res;
	}

	async getOrderHistory(shopid: number) {
		const res = await this.prisma.sconsole_order_history.findMany({
			where: {
				shop_id: shopid,
			},
			select: {
				order_id_from_sconsole_order_history: {
					select: {
						id: true,
						customer_id_from_order: {
							select: {
								customer_info: {
									select: {
										firstname: true,
										lastname: true,
									},
								},
							},
						},
						total_price: true,
						order_date: true,
					},
				},
				product_id_from_sconsole_order_history: {
					select: {
						title: true,
					},
				},
				status: true,
			},
		});

		return res;
	}

	async getOrderStatus(orderid: number) {
		const res = await this.prisma.sconsole_order_status.findMany({
			where: {
				order_id: orderid
			}, select: {}
		})
	}

	async findOneOrder(orderid: number) {
		const res = await this.prisma.order.findUnique({
			where: {
				id: orderid,
			},
		});
		return res;
	}

	async removeOrderFromOrderStatus(orderid: number) {
		const res = await this.prisma.sconsole_order_status.delete({
			where: {
				id: orderid, // wrong
			},
		});
		return res;
	}

	async addOrderStatusToOrderHistory(
		order_id: number,
		product_id: number,
		shop_id: number,
		started_date: Date,
		status: string,
	) {
		await this.prisma.sconsole_order_history.create({
			data: {
				order_id: order_id,
				product_id: product_id,
				shop_id: shop_id,
				started_date: started_date,
				ended_date: new Date(),
				status: status,
			},
		});
	}


	seller_refundhistory(id: number) {
		return `#${id}`;
	}

	async getStock(id: number) {
		return await this.prisma.product.findMany({
			where: {
				shop_id: id,
			},
			select: {
				id: true,
				title: true,
				quantity: true,
				price: true,
			},
		});
	}
	async AddToStock(
		id: number,
		shopId: number,
		title: string,
		sub_title: string,
		price: number,
		quantity: number,
		categoryId: number,
		sold: number,
		suggest_product: number[],
		rating: number,
	) {
		console.log({
			shop_id: shopId,
			title: title,
			sub_title: sub_title,
			price: price,
			quantity: quantity,
			category_id: categoryId,
			sold: sold,
			suggest_products: suggest_product,
			rating: rating,
		});
		await this.prisma.product.create({
			data: {
				shop_id: shopId,
				title: title,
				sub_title: sub_title,
				price: price,
				quantity: quantity,
				category_id: categoryId,
				sold: sold,
				suggest_products: suggest_product,
				rating: rating,
			},
		});
	}
	async UpdatetoStockLog(shopId: number, productId: number, quantity: number) {
		await this.prisma.sconsole_stock_history.create({
			data: {
				shop_id: shopId,
				product_id: productId,
				quantity: quantity,
				updated_date: new Date(),
			},
		});
		return this.prisma.sconsole_stock_history.findUnique({
			where: {
				id: productId,
			},
			select: {
				shop_id: true,
				product_id: true,
				quantity: true,
				updated_date: true,
			},
		});
	}

	async CardOfProduct(id: number) {
		return await this.prisma.product.count({
			where: {
				shop_id: id,
			},
			select: {
				quantity: true
			}
		})
	}
	async CardOfFollows(id: number) {
		return await this.prisma.shop_info.findUnique({
			where: {
				id: id,
			},
			select: {
				followers: true,
			}
		})
	}
	async CardOfRating(id: number) {
		return await this.prisma.product.aggregate({
			where: {
				shop_id: id,
			},
			_avg: {
				rating: true,
			}
		})
	}
	async CardOfSales1(id: number) {
		return await this.prisma.sconsole_order_history.findMany({
			where: {
				shop_id: id,
			},
			select: {
				order_id: true,
			}
		})
	}
	async CardOfSales2(id: number) {
		return await this.prisma.order.findMany({
			where: {
				id: id,
				status: "Delivered",
			},
			select: {
				total_price: true,
			},
		});
	}

	// async Cheat(id: number){
	// 	return await this.prisma.order.aggregate({
	// 		where : {
	// 			customer_id : id,
	// 		},
	// 		_sum : {
	// 			total_price : true,
	// 		}
	// 	})
	// }
	async Discount(shop_id: number, code: string, starte_date: Date, end_date: Date, description: string,
		class_types: DiscountClass, min_price: number, reduce_price: number, 
		picture_path: string, picture_thumbnail: string, picture_title: string) {
		if (class_types === DiscountClass.ReducePrice) {
			const reducePrice = await this.prisma.discount.create({
				data: {
					code: code,
					start_date: new Date(),
					end_date: new Date(),
					description: description,
					class: "ReducePrice",
					min_price: min_price,
					reduce_price: reduce_price,
					discount_types: "Shop",
					added_date: new Date(),
					picture_path: picture_path,
					picture_thumbnail: picture_thumbnail,
					picture_title: picture_title,
				}
			})
			return reducePrice.id;
		} else {
			const FreeShipping = await this.prisma.discount.create({
				data: {
					code: code,
					start_date: new Date(),
					end_date: new Date(),
					description: description,
					class: "FreeShipping",
					min_price: min_price,
					reduce_price: reduce_price,
					discount_types: "Shop",
					added_date: new Date(),
					picture_path: picture_path,
					picture_thumbnail: picture_thumbnail,
					picture_title: picture_title,
				},
			});
			return FreeShipping.id;
		}
	}
	async DiscountShop(id: number, discount_id: number, quantity: number, max_quantity: number) {
		await this.prisma.discount_shop.create({
			data: {
				shop_id: id,
				discount_id: discount_id,
				quantity: quantity,
				max_quantity: max_quantity,
			},
		});
		return this.prisma.discount_shop.findUnique({
			where: {
				discount_id: id,
			},
			select: {
				discount_id: true,
				quantity: true,
				max_quantity: true,
			},
		});

	}
}