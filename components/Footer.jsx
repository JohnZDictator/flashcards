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
        <div className="">
          <p className="text-white">&copy; 2024 Flashy. All rights reserved.</p> 
        </div>
        <div className="flex flex-row gap-4">
          <span><FaXTwitter color="white" /></span>
          <span><FaLinkedin color="white" /></span>
          <span><FaFacebook color="white" /></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer