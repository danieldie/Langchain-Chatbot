'use client'

import { FormEvent, useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import TextInput from "@/components/Patterns/Input";
import PrimaryButton from "@/components/Patterns/Button/PrimaryButton";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import AdSense from "@/components/AdSense";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  const handleSubmit =async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  }

  return (
    <AuthLayout>
      <div className='card shadow-lg w-4/5 md:w-[768px] h-[500px]  flex justify-center bg-white'>
        <div className='flex-1 p-12 flex flex-col justify-center items-center w-1/2'>
          <div className='flex justify-between items-center w-full mb-5'>
            <h3 className='text-3xl '>Sign In</h3>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500">{error}</div>}
            <TextInput placeholder={"Email"} label={"Email"} type="email" name="email" />
            <TextInput
              placeholder={"******"}
              label={"Password"}
              type="password"
              name="password"
              className='mt-2 '
            />
            <PrimaryButton text={"Sign In"} className='mt-4'/>
            <div 
              onClick={()=> {
                console.log("google secret===>", process.env.GOOGLE_SECRET)
                signIn('google')
              }} 
              className="mt-4 bg-gradient-to-r from-violet-800 to-fuchsia-500 w-full rounded-xl p-2 flex justify-center items-center text-white font-bold cursor-pointer">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <p>&nbsp;&nbsp;Signin with Google</p>
            </div>
          </form>
        </div>
        <div className='flex-1 hidden md:flex p-10 w-1/2 text-white leading-8  flex-col justify-center items-center bg-gradient-to-r from-violet-800 to-fuchsia-500'>
          <p className='text-2xl font-bold'>Welcome to Bible</p>
          <p className='text-sm leading-10 font-thin'>Don't have account ?</p>
          <button
            className='border border-white px-4 rounded-xl hover:bg-violet-500 hover:text-white font-bold shadow'
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
      
      <AdSense
        data-ad-slot={process.env.GOOGLE_ADS_SLOT ?? ""}
        data-full-width-responsive="true"
        data-ad-format="fluid"
      />
    </AuthLayout>
  );
};

export default SignIn;