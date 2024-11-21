import { atom } from "jotai";
import { INotification } from "../types/client.types";

export const notificationAtom = atom<INotification>({
  message: "",
  isOpen: false,
  isAutoClose: true,
  type: "loading",
});
export const isAuthAtom = atom(false);
