import { LoginResponse } from "@/modules/auth/models/login-response.model"

export type AuthValuesType = {
  user: LoginResponse | null
  setUser: (value: LoginResponse | null) => void
}
