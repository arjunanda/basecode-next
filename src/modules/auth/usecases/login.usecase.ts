import { ResponseUseCase } from "@models/api-response.models"
import { LoginResponse } from "../models/login-response.model"
import { LoginRepository } from "../repositories/login.repository"
import { LoginRequest } from "../models/login-request.model"
import { getSessionStorage, setSessionStorage } from "@utils/storage"
import { LocalStorageConfig } from "@/shared/configs/defaultConfig"

export const LoginCase = async (data: LoginRequest): Promise<ResponseUseCase<LoginResponse>> => {

  const loginProses = await LoginRepository<LoginResponse>(data)


  if (loginProses.valid) {

    setSessionStorage(LocalStorageConfig.UserData, JSON.stringify(loginProses.data))

    return {
      valid: true,
      message: 'Succesfully retrieve Data',
      data: loginProses.data
    }
  }

  return {
    valid: false,
    message: 'Silakan periksa kembali username dan password yang Anda masukkan..'
  }
}

export const CheckLoginCase = () : LoginResponse | null =>  {

  const getSessLogin = getSessionStorage(LocalStorageConfig.UserData)

  if (getSessLogin) {

    const parse = JSON.parse(getSessLogin)

    return parse

  }

  return null
}