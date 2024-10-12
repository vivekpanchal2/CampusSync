import React, { useState } from "react";
import SignupForm from "../components/Auth/Signup";
import LoginForm from "../components/Auth/Login";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="mt-[4.5rem] flex flex-col justify-center align-middle">
      {isLogin ? (
        <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <SignupForm isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
