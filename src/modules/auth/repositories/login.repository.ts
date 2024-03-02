import { postData } from "@utils/api";
import { DataResponse, HttpResponse } from "@models/api-response.models";
import { LoginRequest } from "../models/login-request.model";

export const LoginRepository = async <T extends DataResponse>(
  data: LoginRequest
): Promise<HttpResponse<T>> => {
  const res: HttpResponse<T> = await postData("/login", data);

  return res;
};
