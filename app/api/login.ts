import { base_url } from "./base";
import { loginStore } from "@/store/LoginStore";

interface LoginResponse {
  username: string;
  token: string;
  exp: number;
}
const USER_INFO_CACHE_KEY = "userInfo";

export function getToken(): string | null {
  const info = localStorage?.getItem(USER_INFO_CACHE_KEY);
  if (info) {
    const userInfo = JSON.parse(info) as LoginResponse;
    if (expValid(userInfo.exp)) {
      return userInfo.token;
    }
  }

  return null;
}
export async function login(token: string): Promise<boolean> {
  const resp = await fetch(`${base_url}/login?token=${token}`);

  if (resp.status === 200) {
    const data = (await resp.json()) as LoginResponse;

    const { setUsername } = loginStore();

    setUsername(data.username);
    localStorage?.setItem(USER_INFO_CACHE_KEY, JSON.stringify(data));

    return true;
  }

  return false;
}

export function loadFromCache() {
  const info = localStorage?.getItem(USER_INFO_CACHE_KEY);
  if (info) {
    const userInfo = JSON.parse(info) as LoginResponse;

    if (expValid(userInfo.exp)) {
      localStorage?.removeItem(USER_INFO_CACHE_KEY);
    } else {
      loginStore().setUsername(userInfo.username);
    }
  }
}

function expValid(exp: number) {
  const currentTime = Math.floor(Date.now() / 1000);

  return exp > currentTime;
}
