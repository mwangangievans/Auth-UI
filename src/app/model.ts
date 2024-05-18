interface userRegisterPayloadI {
  email: string;
  phone_number: string;
  fullname: string;
  password: string;
}

interface userregistrationResponse {
  message: [string];
  username: string;
  phone_number: string;
  email: string;
}
