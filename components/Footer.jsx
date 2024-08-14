import Link from "next/link";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"

const Footer = () => {
  return (
    <footer className='pt-6 pb-4 bg-primary text-white w-full bg-inherit'>
      <div className='mx-4 md:mx-12 flex justify-between items-center'>
        <Link href="/">
          <h1 className='text-2xl text-white font-semibold'>
            Flashy
          </h1>
        </Link>
        <p className="text-white hidden xl:flex">&copy; 2024 Flashy. All rights reserved.</p> 
        <div className="flex flex-row gap-4">
          <span><FaXTwitter color="white" /></span>
          <span><FaLinkedin color="white" /></span>
          <span><FaFacebook color="white" /></span>
        </div>
      </div>
      <p className="text-white xl:hidden mt-2 mx-4">&copy; 2024 Flashy. All rights reserved.</p> 
    </footer>
  )
}

export default Footer