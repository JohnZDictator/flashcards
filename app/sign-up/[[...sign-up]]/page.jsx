import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex flex-row my-12 items-center justify-center flex-grow">
      <div>
        <p>hi</p>
      </div>
      <SignUp />
    </div>
  )
}

export default SignUpPage