'use client'

import { useState, useRef } from "react";
import AuthLayout from "@/components/AuthLayout";
import TextInput from "@/components/Patterns/Input";
import PrimaryButton from "@/components/Patterns/Button/PrimaryButton";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) =>{
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name")
    });
    ref.current?.reset();
    if(r?.error){
      setError(r.error);
      return;
    } else {
      return router.push("/auth/signin");
    }
  }

  return (
    <AuthLayout>
      <div className='card shadow-lg w-4/5 md:w-[768px] h-[500px]  flex justify-center bg-white'>
        <div className='flex-1 p-10 w-1/2  text-white leading-8 hidden md:flex flex-col justify-center items-center  bg-gradient-to-r from-violet-800 to-fuchsia-500'>
          <p className='text-2xl font-bold'>Are You Ready</p><p className='text-2xl font-bold'> to Register</p>
          <p className='text-sm leading-10 font-thin'>
            Do you have an existing account?
          </p>
          <button
            className='border border-white px-4 rounded-xl hover:bg-violet-500 hover:text-white-blue-600 font-bold shadow'
            onClick={() => {
              router.push("/auth/signin");
            }}
          >
            Sign In
          </button>
        </div>
        <div className='flex-1 p-12 flex flex-col justify-center items-center w-1/2'>
          <form ref={ref} action={handleSubmit}>
            {error && <div className="text-red-500">{error}</div>}
            <TextInput placeholder={"Username"} label={"Username"} name="name" />
            <TextInput
              placeholder={"E-mail"}
              type="email"
              label={"E-mail"}
              name="email"
              className='mt-2 '
            />
            <TextInput
              placeholder={"******"}
              label={"Password"}
              className='mt-2'
              type='password'
              name="password"
            />
            <PrimaryButton text={"Sign Up"} className='mt-4'/>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;