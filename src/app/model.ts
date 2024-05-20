export interface userRegisterPayloadI {
  email: string;
  phone_number: string;
  fullname: string;
  password: string;
}

export interface userregistrationResponse {
  message: [string];
  username: string;
  phone_number: string;
  email: string;
}

export interface userLoginResponse {
  message: [string];
  username: string;
  phone_number: string;
  email: string;
}
export type ActiveTab = 1 | 2 | 3 | 4 | 5 | 6;
