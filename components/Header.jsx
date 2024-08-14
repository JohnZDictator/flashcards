import Link from 'next/link'
import Nav from './Nav'
import MobileNav from './MobileNav'

import { SignIn, SignedOut } from '@clerk/nextjs'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className='pt-6 pb-4 text-black fixed top-0 left-0 w-full bg-inherit'>
      <div className='mx-4 md:mx-12 flex justify-between items-center'>
        <Link href="/">
          <h1 className='text-2xl text-primary font-semibold'>
            Flashy
          </h1>
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
        <SignedOut>
          <div className="hidden xl:flex xl:gap-2">
            <Link href="/sign-in">
              <Button variant="outline">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button>
                Signup
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
    </header>
  )
}

export default Header