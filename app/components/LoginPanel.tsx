import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Store } from "@/app/Context";
import { StoreApi } from "zustand";
import { UseBoundStore } from "zustand/react";
import jwt from "jsonwebtoken";
import { useState } from "react";

function decode(credentialResponse: string) {
  const decoded = jwt.decode(credentialResponse);
  console.log(decoded);

  if (decoded && typeof decoded !== "string") {
    return (decoded as jwt.JwtPayload).name as string;
  }
  return null;
}

export function decodeFromCache() {
  const token = localStorage?.getItem("token");
  if (token) {
    const decoded = jwt.decode(token) as { exp: number };
    // 检查decoded是否过期
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      localStorage?.removeItem("token");
    } else {
      return (decoded as jwt.JwtPayload).name as string;
    }
  }

  return null;
}

export default function LoginPanel({ useStore }: {
  useStore: UseBoundStore<StoreApi<Store>>
}) {

  const [loginError, setLoginError] = useState(false);
  const setShowLoginPanel = useStore((state) => state.setShowLoginPanel);
  const setUsername = useStore((state) => state.setUsername);


  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  const handleGoogleLogin = (credentialResponse: any) => {
    setLoginError(false);
    let username = decode(credentialResponse)
    if (username) {
      localStorage?.setItem("token", credentialResponse);
      setUsername(username);
      setShowLoginPanel(false);
    } else {
      setLoginError(true);
    }
  };

  const handleGoogleLoginError = () => {
    setLoginError(true);
  }

  return (
    <div className="absolute top-full left-0 mt-2 bg-white p-4 rounded-lg shadow-xl w-64">
      <GoogleOAuthProvider clientId={googleClientId}>
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
        className="mt-4 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  )
}
