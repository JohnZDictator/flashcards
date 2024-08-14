import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <SignUp />
    </div>
  )
}

export default SignUpPage