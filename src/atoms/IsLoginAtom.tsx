import { atom } from "jotai";

export const isLogin = atom<boolean>(false);
export const loginName = atom<string>('');