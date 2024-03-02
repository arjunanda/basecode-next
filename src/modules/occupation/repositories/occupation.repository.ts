
import { deleteDataWithToken, getDataWithToken, postDataTokenFormData } from "@utils/api"
import { DataResponse, HttpResponse, HttpResponsePaginate } from "@models/api-response.models"
import { OccupationReq } from "../models/occupation-request"

export const AddOccupationRepository = async <T extends DataResponse>(
    data: OccupationReq
  ): Promise<HttpResponse<T>> => {
    const res: HttpResponse<T> = await postDataTokenFormData('/occupation', data)
  
    return res
  }

  export const GetOccupationRepository = async <T extends DataResponse>(
    query: string
  ): Promise<HttpResponsePaginate<T>> => {
    const res: HttpResponsePaginate<T> = await getDataWithToken('/occupation' + query)
  
    return res
  }

  export const GetOccupationByIdRepo = async <T extends DataResponse>(
    id: string
  ): Promise<HttpResponse<T>> => {
    const res: HttpResponse<T> = await getDataWithToken('/occupation/' + id)
  
    return res
  }

  export const UpdateOccupationByIdRepo = async <T extends DataResponse>(
    data: OccupationReq,
    id: string
  ): Promise<HttpResponse<T>> => {
    const res: HttpResponse<T> = await postDataTokenFormData('/occupation/' + id, data)
  
    return res
  }

  export const DeleteOccupationByIdRepo = async <T extends DataResponse>(
    id: string
  ): Promise<HttpResponse<T>> => {
    const res: HttpResponse<T> = await deleteDataWithToken('/occupation/' + id)
  
    return res
  }
  