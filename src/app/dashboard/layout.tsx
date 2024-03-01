import { AuthProvider } from '@/shared/context/auth/AuthContext'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const LayoutDashboard = (props: Props) => {
  return (
    <AuthProvider>
        <div className='h-[100vh] w-full p-5 bg-slate-200'>{props.children}</div>
    </AuthProvider>
  )
}

export default LayoutDashboard