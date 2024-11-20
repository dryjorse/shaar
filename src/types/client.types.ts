export type LanguageType = "ru" | "en" | "kg";
export interface IRegisterForm {
  email: string;
  fullname: string;
  password: string;
}

export interface ILoginForm extends Omit<IRegisterForm, "fullname"> {}
