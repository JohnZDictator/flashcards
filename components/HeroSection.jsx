'use client'

import { MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Button } from "./ui/button"
import Link from "next/link"

import { motion } from "framer-motion"
import { SignedIn, SignedOut } from "@clerk/nextjs"

const HeroSection = () => {
  return (
    <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
    >
      <section id="products" className="rounded-2xl text-white bg-primary mt-24 mx-4 py-16 px-12 flex flex-col justify-center items-center">
        <div className="rounded-full px-3 py-1 border border-white mb-8">
          <p className="text-sm">Products</p>
        </div>
        <h2 className="text-3xl  md:text-4xl xl:text-5xl md:max-w-[60%] text-center font-medium mb-4">
          Master any subject with <span className="text-secondary text-nowrap">AI-Powered</span> Flashcards
        </h2>
        <h3 className="text-base md:max-w-[60%] xl:max-w-[40%] text-center font-light text-cardBackgroundPrimary">
          Transform your learning experience with personalized flashcards generated by advanced AI. Study smarter, retain more, and achieve your goals.
        </h3>
        <div className="flex flex-col items-center gap-6 md:flex-row my-8">
          <SignedIn>
            <Link href="/dashboard">
              <Button size="md">Go to Dashboard<MdOutlineKeyboardArrowRight className="text-2xl ml-2" /></Button>
            </Link>
            <Link href="/generate">
              <Button variant="outline" size="md" className="text-white">Generate Flashcards</Button>
            </Link>
          </SignedIn>
          <SignedOut className="flex flex-col items-center gap-6 md:flex-row my-8">
            <Link href="/sign-up">
              <Button size="md">Get started<MdOutlineKeyboardArrowRight className="text-2xl ml-2" /></Button>
            </Link>
            <Link href="/generate">
              <Button variant="outline" size="md" className="text-white">Try for free</Button>
            </Link>
          </SignedOut>
        </div>
      </section>
    </motion.div>
  )
}

export default HeroSection