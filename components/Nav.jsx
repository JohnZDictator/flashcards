'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {name: 'Products', path: '/#products'},
  {name: 'Features', path: '/#features'},
  {name: 'Pricing', path: '/#pricing'},
];

const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => (
        <Link 
          href={link.path} 
          key={index} 
          className={`${link.path === pathname && "text-primary border-b-2 border-primary"} capitalize font-medium hover:text-primary transition-all`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export default Nav