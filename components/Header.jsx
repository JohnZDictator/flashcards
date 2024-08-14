import Link from 'next/link'
import Nav from './Nav'
import MobileNav from './MobileNav'

import { SignIn, SignedOut } from '@clerk/nextjs'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className='py-6 text-black'>
      <div className='container mx-auto xl:max-w-[90%] flex justify-between items-center'>
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
            <Button variant="outline">Login</Button>
            <Button>Signup</Button>
          </div>
        </SignedOut>
      </div>
    </header>
  )
}

export default Header