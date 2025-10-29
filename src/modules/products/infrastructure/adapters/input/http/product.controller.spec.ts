import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductSimilarController } from './product.controller';

describe('ProductSimilarController', () => {
  let controller: ProductSimilarController;
  let mockUseCase: any;

  beforeEach(() => {
    mockUseCase = { execute: jest.fn() };
    controller = new ProductSimilarController(mockUseCase);
  });

  it('should throw BadRequestException if the productId is empty', async () => {
    await expect(controller.getSimilar({ productId: '' })).rejects.toThrow(BadRequestException);
  });

  it('should throw NotFoundException if the useCase returns null', async () => {
    mockUseCase.execute.mockResolvedValueOnce(null);
    await expect(controller.getSimilar({ productId: '1' })).rejects.toThrow(NotFoundException);
  });

  it('should return a list of products when the useCase succeeds', async () => {
    const mockResponse = [{ id: '2', name: 'A', price: 10 }];
    mockUseCase.execute.mockResolvedValueOnce(mockResponse);

    const result = await controller.getSimilar({ productId: '1' });

    expect(result).toEqual(mockResponse);
    expect(mockUseCase.execute).toHaveBeenCalledWith('1');
  });
});
