import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const PRODUCT_SERVICE_URL = 'PRODUCT_SERVICE_URL';

export const ProductServiceUrlProvider: Provider = {
  provide: PRODUCT_SERVICE_URL,
  useFactory: (configService: ConfigService) => {
    const url = configService.get<string>('PRODUCT_SERVICE_URL');
    if (!url) {
      throw new Error('PRODUCT_SERVICE_URL is not defined in environment variables');
    }
    return url;
  },
  inject: [ConfigService],
};
