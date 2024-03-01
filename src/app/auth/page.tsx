import { LoginComponent } from '@/modules/auth/presentations'
import React from 'react'


const LoginPage = () => {
  return (
    <div className='h-[100vh] w-full flex justify-center items-center bg-slate-200'>
        <div className='rounded-lg shadow-md bg-white w-[90%] md:w-[50%] lg:w-[40%] xl:w-[30%] pb-5'>
            <div className='border-b border-gray-300 p-4'>
                <h1 className='text-gray-600 font-semibold text-lg'>LOGIN </h1>
            </div>
            <div className='px-7 py-5'>
                <div>
                    <LoginComponent />
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage