'use client'

import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex flex-col my-12 items-center justify-center flex-grow">
      <SignUp />
    </div>
  )
}

export default SignUpPage