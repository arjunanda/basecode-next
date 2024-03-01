export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}
