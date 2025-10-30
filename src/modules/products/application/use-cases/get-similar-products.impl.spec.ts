import { GetSimilarProductsUseCaseImpl } from './get-similar-products.use-case.impl';
import { ProductNotFoundError } from '../../domain/errors/product-not-found.error';
import { ProductMapper } from '../../infrastructure/adapters/input/http/mappers/product.mapper';

describe('GetSimilarProductsUseCaseImpl', () => {
  let useCase: GetSimilarProductsUseCaseImpl;
  let mockSimilarService: any;
  let mockProductService: any;

  beforeEach(() => {
    mockSimilarService = { getSimilarIds: jest.fn() };
    mockProductService = { getProductById: jest.fn() };
    useCase = new GetSimilarProductsUseCaseImpl(mockSimilarService, mockProductService);
  });

  it('should throw ProductNotFoundError if the product is not found', async () => {
    mockSimilarService.getSimilarIds.mockResolvedValueOnce(null);

    await expect(useCase.execute('1')).rejects.toThrow(ProductNotFoundError);
  });

  it('should return a correctly mapped list of products', async () => {
    mockSimilarService.getSimilarIds.mockResolvedValueOnce(['2', '3']);
    mockProductService.getProductById
      .mockResolvedValueOnce({ id: '2', name: 'A', price: 10 })
      .mockResolvedValueOnce({ id: '3', name: 'B', price: 20 });

    const spyMapper = jest.spyOn(ProductMapper, 'toResponseDto');

    const result = await useCase.execute('1');

    expect(result).toHaveLength(2);
    expect(spyMapper).toHaveBeenCalled();
  });
});
