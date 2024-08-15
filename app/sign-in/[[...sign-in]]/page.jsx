import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <div className="flex flex-col my-12 items-center justify-center flex-grow">
      <SignIn />
    </div>
  )
}

export default SignInPage