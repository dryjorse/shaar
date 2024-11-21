export type LanguageType = "ru" | "en" | "kg";
export interface IRegisterForm {
  email: string;
  username: string;
  password: string;
  ava: FileList;
}

export interface ILoginForm extends Omit<IRegisterForm, "username"> {}
export interface INotification {
  message: string;
  isOpen: boolean;
  isAutoClose: boolean;
  type: "success" | "error" | "loading";
}