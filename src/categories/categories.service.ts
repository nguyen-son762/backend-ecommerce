import mongoose from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateCategoryDto,
  DeleteCategoryDto,
  UpdateCategoryDto,
} from './categories.dto';
import { Category } from './schemas/category.schema';
import { errorException } from 'src/helpers/error.helper';
import { InjectModel } from '@nestjs/mongoose';
import { ERROR_CODE, ErrorCodeEnums } from 'src/constants/http.constants';
import { CATEGORY_ERROR_MESSAGES } from './categories';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (err) {
      if (err?.code === ERROR_CODE.DUPLICATED) {
        throw errorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          CATEGORY_ERROR_MESSAGES.DUPLICATED,
          ErrorCodeEnums.DUPLICATED,
        );
      } else {
        throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
      }
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find();
      return categories;
    } catch (err) {
      if (err?.code === ERROR_CODE.DUPLICATED) {
        throw errorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          CATEGORY_ERROR_MESSAGES.DUPLICATED,
          ErrorCodeEnums.DUPLICATED,
        );
      } else {
        throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
      }
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        id,
        updateCategoryDto,
      );
      return category;
    } catch (err) {
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async remove(params: DeleteCategoryDto) {
    try {
      await this.categoryModel.deleteMany({ _id: { $in: params.ids } });
      return 'success';
    } catch (err) {
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }
}
