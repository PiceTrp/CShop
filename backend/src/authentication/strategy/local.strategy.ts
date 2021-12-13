import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJs from 'crypto-js';
import { customer } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private prisma: PrismaService, private jwt: JwtService) {
		super();
	}

	async validate(email: string, password: string): Promise<any> {
		console.log('VALIDATING: ', email, password);

		const user: any = await this.prisma.customer.findFirst({
			where: { email },
			include: {
				customer_info: true,
				shop_info: true,
			},
		});

		if (!user) {
			throw new HttpException('Account is not found.', 500);
		}

		if (user.password !== CryptoJs.HmacSHA512(password, process.env.PASSWORD_KEY).toString()) {
			throw new HttpException('Password is incorrect.', 500);
		}

		delete user.password;
		let role = 'CUSTOMER';

		if (user.shop_info.length > 0) {
			role = 'SELLER';
		}

		const userWithRole = { ...user, role };

		return {
			success: true,
			message: 'Sign in successfully.',
			user: userWithRole,
			access_token: this.jwt.sign(userWithRole),
		};
	}
}
