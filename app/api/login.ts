import { base_url } from "./base";
import { UserInfo } from "@/store/LoginStore";

interface LoginResponse {
  token: string;
  meta: UserMeta;
}

interface UserMeta {
  username: string;
  email: string;
  picture: string | null;
  credits: number;
  exp: number;
}

const USER_INFO_CACHE_KEY = "userInfo";

export function getToken(): string | null {
  const info = localStorage?.getItem(USER_INFO_CACHE_KEY);
  if (info) {
    const resp = JSON.parse(info) as LoginResponse;
    if (expValid(resp.meta.exp)) {
      return resp.token;
    }
  }

  return null;
}
export async function login(
  token: string,
  setUserInfo: (info: UserInfo | null) => void
): Promise<boolean> {
  const resp = await fetch(`${base_url}/login?token=${token}`);

  if (resp.status === 200) {
    const data = (await resp.json()) as LoginResponse;

    console.log(data);

    setUserInfo(data.meta);
    localStorage?.setItem(USER_INFO_CACHE_KEY, JSON.stringify(data));

    return true;
  }

  return false;
}

export function costCredits(
  userInfo: UserInfo,
  setUserInfo: (info: UserInfo | null) => void,
  credits: number
) {
  userInfo.credits -= credits;

  setUserInfo(userInfo);

  localStorage?.setItem(USER_INFO_CACHE_KEY, JSON.stringify(userInfo));
}

export function loadFromCache(setUserInfo: (info: UserInfo) => void) {
  const info = localStorage?.getItem(USER_INFO_CACHE_KEY);
  if (info) {
    const respCache = JSON.parse(info) as LoginResponse;

    if (expValid(respCache.meta.exp)) {
      setUserInfo(respCache.meta);
      return true;
    } else {
      localStorage?.removeItem(USER_INFO_CACHE_KEY);
    }
  }

  return false;
}

export function logout(setUserInfo: (info: UserInfo | null) => void) {
  setUserInfo(null);
  localStorage?.removeItem(USER_INFO_CACHE_KEY);
}

function expValid(exp: number) {
  const currentTime = Math.floor(Date.now() / 1000);

  console.log("exp: ", exp, "currentTime: ", currentTime);

  return exp > currentTime;
}
