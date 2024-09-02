'use client'

import { useEffect, useRef, useState } from "react";
import TextInput from "@/components/Patterns/Input";
import PrimaryButton from "@/components/Patterns/Button/PrimaryButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link"
import { edit } from "@/actions/edit";

const Profile = () => {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [ username, setUserName ] = useState("");

  const { data: session, status, update } = useSession();

  if(status === 'unauthenticated') {
    router.push('/auth/signin')
  }

  useEffect(()=> {
    setUserName(session?.user?.name||"");
  },[])

  const handleSubmit = async (formData: FormData) =>{
    const r = await edit({
      email: session?.user?.email,
      password: formData.get("password"),
      name: formData.get("name")
    }).then( async()=> {
      update({ name: username }).then(()=>{
        router.push("/")
      });
    });
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-100'>
      <div className='card shadow-lg w-4/5 md:w-[768px] h-[500px]  flex justify-center bg-white'>
        <div className='flex-1 p-12 flex flex-col justify-center items-center w-1/2'>
          <h1 className="text-3xl dark:text-white">
            Profile
          </h1>
          <form ref={ref} action={handleSubmit} className="w-2/5">
            <TextInput
              type="email"
              label={"E-mail"}
              value={session?.user?.email}
              disabled={true}
              className='mt-2'
            />
            <TextInput placeholder={"Username"} label={"Username"} name="name" value={username} changeHandle={(e) =>setUserName(e.target.value)}/>
            <TextInput
              placeholder={"******"}
              label={"Password"}
              className='mt-2'
              type='password'
              name="password"
            />
            <div className="flex justify-between">
              <PrimaryButton text={"Save"} className='mt-4 mr-3'/>
              <Link href="/" className="mt-4 bg-gradient-to-r from-violet-800 to-fuchsia-500 w-full rounded-xl p-2 flex justify-center items-center text-white font-bold">Back</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;