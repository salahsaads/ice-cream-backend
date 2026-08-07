import {
  Body,
  Controller,
  Post,
  UploadedFile,
  Get,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { File as MulterFile } from 'multer';
import { extname } from 'path';
import { ProductService } from '../service/product.service';
import { productDto } from '../dto/product.dto';
import { Roles } from 'src/common/guards/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LoginGuard } from 'src/common/guards/login.guard';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

const imageStorage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  @Post('create')
  async create(
    @Body() productDto: productDto,
    @UploadedFile() image: MulterFile,
  ) {
    console.log('body:', productDto);
    console.log('typeof name:', typeof productDto?.name);
    console.log('file:', image);
    return this.productService.create({
      ...productDto,
      image: image ? `/uploads/${image.filename}` : productDto.image,
    });
  }
  @UseGuards(LoginGuard)
  @Get('all')
  async findAll() {
    return this.productService.findAll();
  }
  @UseGuards(LoginGuard)
  @Get(':id')
  async findById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productService.findById(id);
  }
}
