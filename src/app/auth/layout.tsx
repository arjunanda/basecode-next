import { AuthProvider } from '@/shared/context/auth/AuthContext'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const LayoutAuth = (props: Props) => {
  return (
    <AuthProvider>
        <div className='h-[100vh] w-full flex justify-center items-center bg-slate-200'>{props.children}</div>
    </AuthProvider>
  )
}

export default LayoutAuth