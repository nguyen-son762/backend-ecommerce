import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import mongoose from 'mongoose';
import { CreateProductDto, FindByPaginationParams } from './product.dto';
import { errorException } from 'src/helpers/error.helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (err) {
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async findByPagination(params: FindByPaginationParams) {
    const { keyword, limit, page = 1, sort_by = '', sort_value = '' } = params;
    let options = {};
    if (keyword) {
      options = {
        $or: [
          {
            name: new RegExp(keyword, 'i'),
          },
        ],
      };
    }
    const products = this.productModel.find(options);
    if (sort_by && sort_value) {
      products.sort({ [sort_value]: sort_by === 'asc' ? -1 : 1 });
    }
    const data = await products
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await this.productModel.countDocuments();

    return {
      pagination: {
        total,
        current_page: page,
        total_page: Math.round(total / limit),
      },
      data,
      sort_by,
      sort_value,
    };
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      return product;
    } catch (err) {
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
