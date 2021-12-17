import { Catch, HttpException, Injectable } from '@nestjs/common';
import { CreateSellershopDto } from './dto/create-sellershop.dto';
import { UpdateSellershopDto } from './dto/update-sellershop.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/authentication/dto/user.dto';

@Injectable()
export class SellershopService {
	constructor(private readonly prisma: PrismaService) {}

	public async findOne(id: number) {
		try {
			const shopinfo = await this.prisma.shop_info.findUnique({
				where: {
					id: id,
				},
				include: {
					shop_picture: true,
				},
			});
			const fetchrating = await this.prisma.product.aggregate({
				where: {
					shop_id: shopinfo.id,
				},
				_avg: {
					rating: true,
				},
			});
			const products = await this.prisma.product.count({
				where: {
					shop_id: shopinfo.id,
				},
			});
			const categories = await this.prisma.shop_category.findMany({
				where: {
					shop_id: shopinfo.id,
				},
			});
			let rating = fetchrating._avg.rating;

			return { ...shopinfo, products, categories, rating };
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying shop infomation please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying shop infomation request body incorrect', 500);
		}
	}

	public async getShopProduct(
		id: number,
		page: number,
		category_id: number,
		priceLow: number,
		priceHigh: number,
		readyToShip: boolean,
		outOfStock: boolean,
		rating: number,
	) {
		try {
			if (category_id != 0) {
				const shop_category = await this.prisma.shop_category.findFirst({
					where: {
						shop_id: id,
						id: category_id,
					},
					select: {
						products: true,
						id: true,
					},
				});
				if (readyToShip && outOfStock) {
					const products = await this.prisma.product.findMany({
						where: {
							id: {
								in: shop_category.products,
							},
							rating: {
								gte: rating,
							},
							price: {
								gte: priceLow,
								lte: priceHigh,
							},
						},
						include: {
							product_picture: true,
						},
						skip: (page - 1) * 16,
						take: 16,
					});
					const count = await this.prisma.product.count({
						where: {
							id: {
								in: shop_category.products,
							},
							rating: {
								gte: rating,
							},
							price: {
								gte: priceLow,
								lte: priceHigh,
							},
						},
					});
					return { products, count };
				} else if (readyToShip) {
					const products = await this.prisma.product.findMany({
						where: {
							id: {
								in: shop_category.products,
							},
							quantity: {
								gt: 0,
							},
							rating: {
								gte: rating,
							},
							price: {
								gte: priceLow,
								lte: priceHigh,
							},
						},
						include: {
							product_picture: true,
						},
						skip: (page - 1) * 16,
						take: 16,
					});
					const count = await this.prisma.product.count({
						where: {
							id: {
								in: shop_category.products,
							},
							quantity: {
								gt: 0,
							},
							rating: {
								gte: rating,
							},
							price: {
								gte: priceLow,
								lte: priceHigh,
							},
						},
					});
					return { products, count };
				}
				const products = await this.prisma.product.findMany({
					where: {
						id: {
							in: shop_category.products,
						},
						rating: {
							gte: rating,
						},
						price: {
							gte: priceLow,
							lte: priceHigh,
						},
					},
					include: {
						product_picture: true,
					},
					skip: (page - 1) * 16,
					take: 16,
				});
				const count = await this.prisma.product.count({
					where: {
						id: {
							in: shop_category.products,
						},
						rating: {
							gte: rating,
						},
						price: {
							gte: priceLow,
							lte: priceHigh,
						},
					},
				});
				return { products, count };
			} else if (readyToShip && outOfStock) {
				const products = await this.prisma.product.findMany({
					where: {
						shop_id: id,
						rating: {
							gte: rating,
						},
						price: {
							gte: priceLow,
							lte: priceHigh,
						},
					},
					include: {
						product_picture: true,
					},
					skip: (page - 1) * 16,
					take: 16,
				});
				const count = await this.prisma.product.count({
					where: {
						shop_id: id,
						rating: {
							gte: rating,
						},
						price: {
							gte: priceLow,
							lte: priceHigh,
						},
					},
				});
				return { products, count };
			} else if (readyToShip) {
				const products = await this.prisma.product.findMany({
					where: {
						shop_id: id,
						quantity: {
							gt: 0,
						},
						rating: {
							gte: rating,
						},
						price: {
							gte: priceLow,
							lte: priceHigh,
						},
					},
					include: {
						product_picture: true,
					},
					skip: (page - 1) * 16,
					take: 16,
				});
				const count = await this.prisma.product.count({
					where: {
						shop_id: id,
						quantity: {
							gt: 0,
						},
						rating: {
							gte: rating,
						},
						price: {
							gte: priceLow,
							lte: priceHigh,
						},
					},
				});
				return { products, count };
			}
			const products = await this.prisma.product.findMany({
				where: {
					shop_id: id,
					rating: {
						gte: rating,
					},
					price: {
						gte: priceLow,
						lte: priceHigh,
					},
				},
				include: {
					product_picture: true,
				},
				skip: (page - 1) * 16,
				take: 16,
			});
			const count = await this.prisma.product.count({
				where: {
					shop_id: id,
					rating: {
						gte: rating,
					},
					price: {
						gte: priceLow,
						lte: priceHigh,
					},
				},
			});

			return { products, count };
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying products please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying products request body incorrect', 500);
		}
	}

	// async followShop(user_id: number, shop_id:number){
	// 	try {
	// 		const check = await this.prisma.customer_followed_shop
	// 	} catch (error) {

	// 	}
	// };

	public async getShopSection(id: number) {
		try {
			const shopsections = await this.prisma.shop_section.findUnique({
				where: {
					shop_id: id,
				},
			});
			const sections = shopsections.sections;
			if (shopsections.sections !== null) {
				var parsedsections = JSON.parse(JSON.stringify(sections));
				let resultSections = [];
				console.log(sections);

				for (let index = 0; index < parsedsections.length; index++) {
					let section;

					switch (parsedsections[index].type) {
						case 'Banners':
							section = await this.prisma.shop_banner.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 1 };
							break;
						case 'BannersCarousel':
							section = await this.prisma.shop_banner_carousel.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 2 };
							break;
						case 'ProductCarousel':
							section = await this.prisma.shop_product_carousel.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							const shop_category = await this.prisma.shop_category.findFirst({
								where: {
									title: section.category,
								},
								select: {
									products: true,
								},
							});
							const products = await this.prisma.product.findMany({
								where: {
									id: {
										in: shop_category.products,
									},
								},
								include: {
									product_picture: true,
								},
							});

							section = { ...section, products, type: 3 };
							break;
						case 'ProductCarouselSelect':
							section = await this.prisma.shop_product_carousel_select.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});

							const products_info = await this.prisma.product.findMany({
								where: {
									id: {
										in: section.products,
									},
								},
								include: {
									product_picture: true,
								},
							});

							section = { ...section, products: products_info, type: 3 };
							break;
						case 'Video':
							section = await this.prisma.shop_video.findUnique({
								where: {
									id: parsedsections[index].id,
								},
							});
							section = { ...section, type: 4 };
							break;
					}
					resultSections = [...resultSections, section];
				}

				return resultSections;
			} else {
				return [];
			}
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying sections please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying sections request body incorrect', 500);
		}
	}

	public async getShopComments(id: number, page: number) {
		try {
			const comments = await this.prisma.shop_comment.findMany({
				where: {
					shop_id: id,
				},
				include: {
					customer_id_from_shop_comment: {
						include: {
							customer_info: true,
							customer_picture: true,
						},
					},
				},
				skip: (page - 1) * 10,
				take: 10,
			});
			return comments;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying comments please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying comments request body incorrect', 500);
		}
	}

	public async getShopProductComments(id: number, page: number) {
		try {
			const comments = await this.prisma.product_reviews.findMany({
				where: {
					product_id_from_product_reviews: {
						shop_id: id,
					},
				},
				include: {
					customer_id_from_product_reviews: {
						include: {
							customer_info: true,
							customer_picture: true,
						},
					},
				},
				skip: (page - 1) * 10,
				take: 10,
			});
			return comments;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying comments please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying comments request body incorrect', 500);
		}
	}

	public async getShopDiscount(id: number, discount_user_codeWhereInput: Prisma.discount_user_codeWhereInput) {
		try {
			let getCouponCustomerOwn = [];
			if (discount_user_codeWhereInput.customer_id) {
				getCouponCustomerOwn = await this.prisma.discount_user_code.findMany({
					where: {
						customer_id: discount_user_codeWhereInput.customer_id,
					},
				});
			}

			console.log(getCouponCustomerOwn);
			const vouchers = await this.prisma.discount_shop.findMany({
				where: {
					shop_id: id,
					discount_id: {
						notIn: getCouponCustomerOwn.map((e) => e.discount_id),
					},
				},
				include: {
					discount_id_from_discount_shop: {
						include: {
							discount_user_code: true,
						},
					},
				},
			});
			return vouchers;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying vochers please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying vochers request body incorrect', 500);
		}
	}

	public async getFlashSale(id: number) {
		try {
			console.log(new Date(Date.now()));

			const flashsale = await this.prisma.shop_flashsale.findFirst({
				where: {
					shop_id: id,
					started_date: {
						lte: new Date(Date.now()),
					},
					ended_date: {
						gt: new Date(Date.now()),
					},
				},
			});
			if (flashsale) {
				let productsId = JSON.parse(JSON.stringify(flashsale.products)).map((e) => e.id);
				const products_info = await this.prisma.product.findMany({
					where: {
						id: {
							in: productsId,
						},
					},
					include: {
						product_picture: true,
					},
				});

				return { ...flashsale, products_info };
			}
			return flashsale;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error querying vochers please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error querying vochers request body incorrect', 500);
		}
	}

	public async create(
		Body: any,
		shop_infoCreateInput: Prisma.shop_infoCreateInput,
		addressCreateInput: Prisma.addressCreateInput,
		payment_shop_bank_accountCreateInput: Prisma.payment_shop_bank_accountCreateInput,
	) {
		try {
			const address = await this.prisma.address.create({
				data: {
					address_line: addressCreateInput.address_line,
					district: addressCreateInput.district,
					sub_district: addressCreateInput.sub_district,
					province: addressCreateInput.province,
					postal_code: addressCreateInput.postal_code,
					phone_number: shop_infoCreateInput.phone_number,
					recipient_name: payment_shop_bank_accountCreateInput.firstname,
				},
			});
			await this.prisma.shop_info.create({
				data: {
					shop_name: shop_infoCreateInput.shop_name,
					customer_id: Body.customer_id,
					shop_address_id: address.id,
					phone_number: shop_infoCreateInput.phone_number,
					description: '',
					shop_section: {
						create: {
							sections: [],
						},
					},
					payment_shop_bank_account: {
						create: {
							account_number: payment_shop_bank_accountCreateInput.account_number,
							bank: payment_shop_bank_accountCreateInput.bank,
							firstname: payment_shop_bank_accountCreateInput.firstname,
							lastname: payment_shop_bank_accountCreateInput.lastname,
						},
					},
				},
			});
			return 'Shop created!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating shop please check your information!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating shop request body incorrect', 500);
		}
	}
}