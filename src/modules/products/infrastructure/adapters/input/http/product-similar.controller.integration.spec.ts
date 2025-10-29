import { Test, TestingModule } from '@nestjs/testing';
import { GetSimilarProductsUseCaseImpl } from 'src/modules/products/application/use-cases/get-similar-products.use-case.impl';
import { IGetSimilarProductsUseCase } from 'src/modules/products/application/ports/input/get-similar-products.use-case';
import { ISimilarProductsService } from 'src/modules/products/application/ports/output/similar-products.service';
import { IProductService } from 'src/modules/products/application/ports/output/product.service';
import { ProductSimilarController } from './product.controller';

describe('ProductSimilarController (Integration)', () => {
  let controller: ProductSimilarController;

  const mockSimilarService = {
    getSimilarIds: jest.fn().mockResolvedValue(['2', '3']),
  };

  const mockProductService = {
    getProductById: jest.fn()
      .mockResolvedValueOnce({ id: '2', name: 'A', price: 10 })
      .mockResolvedValueOnce({ id: '3', name: 'B', price: 20 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSimilarController],
      providers: [
        {
          provide: IGetSimilarProductsUseCase,
          useClass: GetSimilarProductsUseCaseImpl,
        },
        { provide: ISimilarProductsService, useValue: mockSimilarService },
        { provide: IProductService, useValue: mockProductService },
      ],
    }).compile();

    controller = module.get<ProductSimilarController>(ProductSimilarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return similar products correctly', async () => {
    const result = await controller.getSimilar({ productId: '1' });
    expect(result).toEqual([
      expect.objectContaining({ id: '2', name: 'A' }),
      expect.objectContaining({ id: '3', name: 'B' }),
    ]);
  });
});
