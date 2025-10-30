import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ISimilarProductsService } from '../src/modules/products/application/ports/output/similar-products.service';
import { IProductService } from '../src/modules/products/application/ports/output/product.service';

describe('ProductSimilarController (e2e)', () => {
  let app: INestApplication;

  const mockSimilarService = {
    getSimilarIds: jest.fn().mockResolvedValue(['2', '3']),
  };

  const mockProductService = {
    getProductById: jest.fn()
      .mockResolvedValueOnce({ id: '2', name: 'A', price: 10 })
      .mockResolvedValueOnce({ id: '3', name: 'B', price: 20 }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ISimilarProductsService)
      .useValue(mockSimilarService)
      .overrideProvider(IProductService)
      .useValue(mockProductService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/product/:id/similar (GET) should respond with 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/product/1/similar')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual([
      expect.objectContaining({ id: '2', name: 'A' }),
      expect.objectContaining({ id: '3', name: 'B' }),
    ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
