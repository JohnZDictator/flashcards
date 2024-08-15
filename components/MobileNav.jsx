'use client'

import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { CiMenuFries } from 'react-icons/ci' 
import { usePathname } from "next/navigation";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";

const links = [
  {name: 'Products', path: '#products'},
  {name: 'Features', path: '#features'},
  {name: 'Pricing', path: '#pricing'},
];

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className='text-[32px] text-black' />
      </SheetTrigger> 
      <SheetContent className="flex flex-col justify-between">
        <div className="mt-32 text-center text-2xl text-primary">
          <Link href="/">
            <h1>Flashy</h1>
          </Link>
        </div>
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => 
          <Link 
            href={link.path} 
            key={index}
            className={`${link.path === pathname && "text-accent border-b-2 border-accent"} text-xl capitalize hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        )}
        </nav>
        <SignedOut>
          <div className="flex flex-col gap-4 mb-12 items-center">
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
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav