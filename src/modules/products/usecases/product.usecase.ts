import { ResponseUseCasePaginate } from "@models/api-response.models"
import { GetDataProductsRepository } from "../repositories/product.repository"
import { ProductsResponse } from "../models/products-response.model"

export const GetDataProducts = async (query?: string): Promise<ResponseUseCasePaginate<Array<ProductsResponse>>> => {
  const getRules = await GetDataProductsRepository<Array<ProductsResponse>>(query ?? '')

  if (getRules.valid) {

    

    return {
      valid: true,
      message: 'Succesfully retrieve Data',
      data: {
        rows: getRules.data.rows,
        ...getRules.data
      }
    }
  }

  return {
    valid: false,
    message: getRules.message
  }
}