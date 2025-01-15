import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { loginStore } from "@/store/LoginStore";
import { login } from "../api/login";


export default function LoginPanel() {

  const [loginError, setLoginError] = useState(false);
  const setShowLoginPanel = loginStore((state) => state.setShowLoginPanel);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

  const handleGoogleLogin = (credentialResponse: any) => {
    setLoginError(false);
    const { credential } = credentialResponse;

    login(credential).then(success => {
      if (success) {
        setShowLoginPanel(false);
      } else {
        setLoginError(true);
      }
    });

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
          size="medium"

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
