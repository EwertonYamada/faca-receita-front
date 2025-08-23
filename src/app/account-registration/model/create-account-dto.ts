export interface CreateAccountDto {
  name: string;
  doc: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirmation: string;
}