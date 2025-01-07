import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import { useState } from "react";
import { loginStore } from "@/store/LoginStore";

function decode(credential: string) {
  const decoded = jwt.decode(credential);

  if (decoded && typeof decoded !== "string") {
    return (decoded as jwt.JwtPayload).name as string;
  }
  return null;
}

export const CACHE_NAME = "token";
export function loadFromCache() {

  const token = localStorage?.getItem(CACHE_NAME);
  if (token) {
    const decoded = jwt.decode(token) as { exp: number };
    // 检查decoded是否过期
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      localStorage?.removeItem(CACHE_NAME);
    } else {
      let username = (decoded as jwt.JwtPayload).name as string;
      if (username) {
        return { username, token };
      }
    }
  }

  return null;
}

export default function LoginPanel() {

  const [loginError, setLoginError] = useState(false);
  const setShowLoginPanel = loginStore((state) => state.setShowLoginPanel);
  const setUsername = loginStore((state) => state.setUsername);
  const setToken = loginStore((state) => state.setToken);


  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  const handleGoogleLogin = (credentialResponse: any) => {
    setLoginError(false);
    const { credential } = credentialResponse;
    let username = decode(credential)
    if (username) {
      localStorage?.setItem(CACHE_NAME, credential);
      setUsername(username);
      setShowLoginPanel(false);
      setToken(credentialResponse);
    } else {
      setLoginError(true);
    }
  };

  const handleGoogleLoginError = () => {
    setLoginError(true);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl w-1/4 h-1/4 flex flex-col items-center justify-center">
      <GoogleOAuthProvider clientId={googleClientId} >
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleLoginError}
        />
      </GoogleOAuthProvider>

      {loginError && (
        <div className="text-red-500 text-sm mt-2">Login failed</div>
      )}
      <button
        onClick={() => setShowLoginPanel(false)}
        className="mt-4 w-1/2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  )
}
