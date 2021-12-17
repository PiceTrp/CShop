import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Address } from './dto/address.dto';
import { DeliveryLoginDTO } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
	constructor(private readonly deliveryService: DeliveryService) { }

	@Post('login')
	public async login(@Body() createDeliveryDto: DeliveryLoginDTO, @Res() res) {
		try {
			const loginCheck = await this.deliveryService.login(createDeliveryDto);
			if (loginCheck.success) {
				res.cookie('cshop-delivery-admin', loginCheck.token)
				res.send({
					success: true
				})
			} else {
				res.send({
					success: false
				})
			}
		} catch (e) {
			res.send(e)
		}

	}

	@Post('generate-tracking')
	generateTrackingNumber(@Body() address: Address) {
		return this.deliveryService.generateTrackingNumber(address)
	}

	@Get()
	findAll() {
		return this.deliveryService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.deliveryService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
		return this.deliveryService.update(+id, updateDeliveryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.deliveryService.remove(+id);
	}
}
