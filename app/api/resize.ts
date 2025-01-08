import { TOKEN_CACHE_NAME } from "../components/LoginPanel";
import { base_url } from "./base";

export async function resize(
  blob: Blob,
  width: number,
  height: number,
  sizes: { scale: number; use_ai: boolean }[]
) {
  const body = new FormData();
  body.append("blob", blob);
  body.append("width", width.toString());
  body.append("height", height.toString());
  body.append("sizes", JSON.stringify(sizes));

  const token = localStorage.getItem(TOKEN_CACHE_NAME);
  return fetch(`${base_url}/resize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });
}

export async function resizeFree(
  blob: Blob,
  width: number,
  height: number,
  sizes: { scale: number; use_ai: boolean }[]
) {
  const body = new FormData();
  body.append("blob", blob);
  body.append("width", width.toString());
  body.append("height", height.toString());
  body.append("sizes", JSON.stringify(sizes));
  return fetch(`${base_url}/resizefree`, {
    method: "POST",
    body,
  });
}
