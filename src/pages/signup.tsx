import { useRef } from "react";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../config";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  function signupbtn() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    axios.post(`${BACKEND_URL}/signup`, { username, password });
    navigate("/signin")
  }

  return (
    <>
      <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">
        <h2 className="text-slate-900 text-3xl mb-8 font-bold tracking-tight ">
          Sign up
        </h2>
        <div className="bg-white rounded-xl flex  flex-col gap-4 border min-w-72 p-8">
          <InputBox placeholder="Username" refrence={usernameRef} />
          <InputBox placeholder="password" refrence={passwordRef} />
          <div className="flex justify-center pt-4">
            <Button onClick={signupbtn} variant="primary" text="Signup" />
          </div>
        </div>
      </div>
    </>
  );
}
