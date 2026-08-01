export interface ForgotPasswordDto {
  email: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}