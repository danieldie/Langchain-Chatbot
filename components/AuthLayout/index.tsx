import {ReactNode} from "react";

const AuthLayout = ({ children }: {children:ReactNode}) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-100'>
      {children}
      <footer className=' fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-gradient-to-r from-violet-800 to-fuchsia-500 flex justify-between p-4 items-center text-white'>
        <span className='ml-1'>Made with &#9829;</span>
        <a
          className='ml-1 font-bold hover:text-black'
        >
          Bible
        </a>
      </footer>
    </div>
  );
};

export default AuthLayout;