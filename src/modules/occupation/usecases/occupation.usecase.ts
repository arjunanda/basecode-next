import { OccupationReq } from "../models/occupation-request";
import {
  ResponseUseCase,
  ResponseUseCasePaginate,
} from "@/models/api-response.models";
import {
  AddOccupationRepository,
  DeleteOccupationByIdRepo,
  GetOccupationByIdRepo,
  GetOccupationRepository,
  UpdateOccupationByIdRepo,
} from "../repositories/occupation.repository";
import { parseErrorArray } from "@/shared/utils/helper";
import { OccupationRes } from "../models/occupation-response";

export const AddOccupationCase = async (
  data: OccupationReq
): Promise<ResponseUseCase<null>> => {
  const add = await AddOccupationRepository(data);

  if (add.valid) {
    return {
      valid: true,
      message: "Succesfully Added Data",
      data: null,
    };
  }

  return {
    valid: false,
    message: parseErrorArray(add.errors) ?? add.message,
  };
};

export const GetOccupationCase = async (
  query?: string
): Promise<ResponseUseCasePaginate<Array<OccupationRes>>> => {
  const get = await GetOccupationRepository<Array<OccupationRes>>(query ?? "");

  if (get.valid) {
    return {
      valid: true,
      message: "Succesfully Added Data",
      data: get.data,
    };
  }

  return {
    valid: false,
    message: parseErrorArray(get.errors) ?? get.message,
  };
};

export const GetOccupationByIdCase = async (
  id: string
): Promise<ResponseUseCase<OccupationRes>> => {
  const getById = await GetOccupationByIdRepo<OccupationRes>(id);

  if (getById.valid) {
    return {
      valid: true,
      message: "Succesfully Retrive Data",
      data: getById.data,
    };
  }

  return {
    valid: false,
    message: parseErrorArray(getById.errors) ?? getById.message,
  };
};

export const UpdateOccupationByIdCase = async (
    data: OccupationReq,
    id: string
  ): Promise<ResponseUseCase<OccupationRes>> => {
    const update = await UpdateOccupationByIdRepo<OccupationRes>(data, id);
  
    if (update.valid) {
      return {
        valid: true,
        message: "Succesfully Update Data",
        data: null,
      };
    }
  
    return {
      valid: false,
      message: parseErrorArray(update.errors) ?? update.message,
    };
  };

  export const DeleteOccupationByIdCase = async (
    id: string
  ): Promise<ResponseUseCase<null>> => {
    const update = await DeleteOccupationByIdRepo(id);
  
    if (update.valid) {
      return {
        valid: true,
        message: "Succesfully Remove Data",
        data: null,
      };
    }
  
    return {
      valid: false,
      message: parseErrorArray(update.errors) ?? update.message,
    };
  };
