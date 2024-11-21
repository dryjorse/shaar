import { IRegisterForm } from "./client.types";

export interface IUser {
  id: number;
  email: string;
  username: string;
}
export interface IAuthResponse {
  user: IUser;
  tokens: {
    access: string;
    refresh: string;
  };
}
export interface IRegisterBody extends Omit<IRegisterForm, "ava"> {
  ava: File;
}
