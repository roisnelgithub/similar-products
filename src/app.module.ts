import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './modules/products/product.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PRODUCT_SERVICE_URL: Joi.string()
          .uri()
          .required()
          .messages({
            'any.required': 'PRODUCT_SERVICE_URL is required',
            'string.uri': 'PRODUCT_SERVICE_URL most be a valid url',
          }),
      }),
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
