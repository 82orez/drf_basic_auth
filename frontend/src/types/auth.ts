export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface PasswordResetForm {
  email: string;
}

export interface PasswordResetConfirmForm {
  new_password: string;
  new_password_confirm: string;
}
