import { Product } from 'src/modules/products/domain/models/product';
import { ProductDetailDto } from '../dtos/product-similar.dto';
import { ProductDto } from '../dtos/product.dto';

export class ProductMapper {
  static toDomain(apiData: ProductDetailDto): Product {
    return {
      id: apiData.id,
      name: apiData.name,
      price: apiData.price,
      availability: apiData.availability,
    };
  }

  static toResponseDto(domain: Product): ProductDetailDto {
    return {
      id: domain.id,
      name: domain.name,
      price: domain.price,
      availability: domain.availability,
    };
  }

  static fromProductDto(dto: ProductDto): Product {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      availability: dto.availability,
    };
  }

  static toProductDto(domain: Product): ProductDto {
    return {
      id: domain.id,
      name: domain.name,
      price: domain.price,
      availability: domain.availability,
    };
  }
}
