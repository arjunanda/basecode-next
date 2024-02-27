
import { getData } from "@utils/api"
import { DataResponse, HttpResponsePaginate } from "@models/api-response.models"

export const GetDataProductsRepository = async <T extends DataResponse>(
    query: string
  ): Promise<HttpResponsePaginate<T>> => {
    const res: HttpResponsePaginate<T> = await getData('/products' + query)
  
    return res
  }
  