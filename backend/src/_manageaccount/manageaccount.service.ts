import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserSuspensionDto } from './dto/create_usersuspension.dto';
import { CreateSellerSuspensionDto } from './dto/create_sellersuspension.dto';
import { UpdateUserSuspensionDto } from './dto/update_usersuspension.dto';
import { UpdateSellerSuspensionDto } from './dto/update_sellersuspension.dto';
import { Prisma } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManageaccountService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserSuspension(createUserSuspensionDto: CreateUserSuspensionDto) {
    try {
			await this.prisma.admin_customer_suspensions.create({
				data: {
          customer_id: createUserSuspensionDto.customer_id,
          description: createUserSuspensionDto.description,
          picture_id: createUserSuspensionDto.picture_id,
          suspension_type_id: createUserSuspensionDto.suspension_type_id,
          admin_id : createUserSuspensionDto.admin_id,
          start_date: new Date(),
          end_date: new Date(createUserSuspensionDto.year, createUserSuspensionDto.month, createUserSuspensionDto.day),
				},
			});
			return 'User Suspension Added!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating user suspension!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating user suspension body incorrect', 500);
		}
  }

  async createSellerSuspension(createSellerSuspensionDto: CreateSellerSuspensionDto) {
    try {
			await this.prisma.admin_shop_suspensions.create({
				data: {
          shop_id: createSellerSuspensionDto.shop_id,
          description: createSellerSuspensionDto.description,
          picture_id: createSellerSuspensionDto.picture_id,
          suspension_type_id: createSellerSuspensionDto.suspension_type_id,
          admin_id : createSellerSuspensionDto.admin_id,
          start_date: new Date(),
          end_date: new Date(createSellerSuspensionDto.year, createSellerSuspensionDto.month, createSellerSuspensionDto.day),
				},
			});
			return 'Seller Suspension Added!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error creating seller suspension!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error creating seller suspension body incorrect', 500);
		}
  }

  //TEST THIS - USER
  async updateUserSuspension(updateUserSuspensionDto: UpdateUserSuspensionDto) {
    try {
			await this.prisma.customer.update({
        where: {
          id: updateUserSuspensionDto.id,
        },
				data: {
          admin_customer_suspensions:{
            update:{
              description: updateUserSuspensionDto.description,
              picture_id: updateUserSuspensionDto.picture_id,
              suspension_type_id: updateUserSuspensionDto.suspension_type_id,
              admin_id : updateUserSuspensionDto.admin_id,
              start_date: new Date(),
              end_date: new Date(updateUserSuspensionDto.year, updateUserSuspensionDto.month, updateUserSuspensionDto.day),
            },
          },
				},
			});
			return 'User Suspension Updated!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating user suspension!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating user suspension body incorrect', 500);
		}
  }

  //TEST THIS - SELLER
  async updateSellerSuspension(updateSellerSuspensionDto: UpdateSellerSuspensionDto) {
    try {
			await this.prisma.shop_info.update({
        where: {
          id: updateSellerSuspensionDto.id,
        },
				data: {
          admin_shop_suspensions:{
            update:{
              description: updateSellerSuspensionDto.description+"",
              picture_id: updateSellerSuspensionDto.picture_id,
              suspension_type_id: updateSellerSuspensionDto.suspension_type_id,
              admin_id : updateSellerSuspensionDto.admin_id,
              start_date: new Date(),
              end_date: new Date(updateSellerSuspensionDto.year, updateSellerSuspensionDto.month, updateSellerSuspensionDto.day),
            },
          },
				},
			});
			return 'Seller Suspension Updated!';
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e.message);
				throw new HttpException('Error updating seller suspension!', 500);
			}
			console.log(e.message);
			throw new HttpException('Error updating seller suspension body incorrect', 500);
		}
  }

  findAll() {
    return `This action returns all manageaccount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manageaccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} manageaccount`;
  }
}