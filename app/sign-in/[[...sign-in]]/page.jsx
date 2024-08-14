import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}

export default SignInPage