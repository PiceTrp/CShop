import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PictureListDto } from './dto/pictureList.dto';

@Injectable()
export class ReviewProductService {
	constructor(private readonly prisma: PrismaService) {}

	async createReview(
		reviewInput: Prisma.product_reviewsCreateInput,
		// reviewPicturesInput: Prisma.product_reviews_pictureCreateInput,
		reviewPictureList: PictureListDto,
		product_id: number,
		customer_id: number,
	) {
		// let defaultList = {
		// 	id: 0,
		// 	title: '',
		// 	path: '',
		// 	thumbnail: '',
		// };
		let ProductPictures: Promise<any>[] = [];
		for (let i = 0; i < reviewPictureList.pictureList.length; i++) {
			ProductPictures.push(
				this.prisma.product_reviews_picture.create({
					data: {
						title: reviewPictureList.pictureList[i].title,
						path: reviewPictureList.pictureList[i].path,
						thumbnail: reviewPictureList.pictureList[i].thumbnail,
					},
				}),
			);
		}
		const pictures = await Promise.all(ProductPictures);

		const reviewPicturesId =[]
		for (let index = 0; index < pictures.length; index++) {
			reviewPicturesId.push(pictures[index].id);
		}

		const createReview = this.prisma.product_reviews.create({
			data: {
				product_id,
				customer_id: customer_id,
				rating: reviewInput.rating,
				comment: reviewInput.comment,
				review_picture_id: reviewPicturesId,
			},
		});
		return createReview;
	}
}
