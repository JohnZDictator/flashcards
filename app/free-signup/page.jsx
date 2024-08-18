import { SignUp } from '@clerk/nextjs'
import React from 'react'

const FreeSignUpPage = () => {
  return (
    <div className="flex flex-row my-12 items-center justify-center flex-grow">
        <div className="p-8 bg-gray-100 rounded-lg mx-4">
            <p className="text-2xl">What's included in the free plan?</p>
            <p className="text-primary mt-5">Perfect for casual learners</p>
            <ul className="list-disc list-inside ">
                <li>Flash card feature</li>
                <li>Up to 50 flashcards per month</li>
                <li>Quiz feature</li>
                <li>Flash card organization & storage</li>
            </ul>
        </div>
        <div>
            <SignUp routing="hash"/>
        </div>
    </div>
  )
}

export default FreeSignUpPage