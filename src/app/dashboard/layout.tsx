
import NavbarComponent from '@/shared/components/navbar'
import { AuthProvider } from '@/shared/context/auth/AuthContext'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const LayoutDashboard = (props: Props) => {
  return (
    <AuthProvider>
        <div className='min-h-[100vh] w-full bg-gray-700'>
            <div>
                <NavbarComponent />
            </div>
            
            <div className='p-5'>
                {props.children}
            </div>
        </div>
    </AuthProvider>
  )
}

export default LayoutDashboard