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
