import { Injectable, HttpStatus } from '@nestjs/common';
import { CreatePromotionDto, UpdatePromotionDto } from './promotion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Promotion } from './schemas/promotion.schema';
import mongoose from 'mongoose';
import { errorException } from 'src/helpers/error.helper';

@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    private promotionModel: mongoose.Model<Promotion>,
  ) {}
  async create(createPromotionDto: CreatePromotionDto) {
    try {
      const promotion = await this.promotionModel.create(createPromotionDto);
      return promotion;
    } catch (err) {
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async findAll() {
    try {
      const promotions = await this.promotionModel.find();
      return promotions;
    } catch (err) {
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return `This action updates a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
