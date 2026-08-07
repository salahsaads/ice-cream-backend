import { Inject, Injectable ,NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from '../interfaces/product.interfaces';
import { productDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private readonly productModel: Model<Product>,
  ) {}

  async create(product: productDto) {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }
}
