'use client'

import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { collection, doc, getDoc, setDoc } from "@firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IoAdd } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link"

const Dashboard = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const [flashcards, setflashcards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // const handleCardClick = (id, question) => {
  //   router.push(`/flashcard?id=${id}&question=${question}`)
  // }
  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  useEffect(() => {
    async function getFlashcards() {
      if(!user) return
      setIsLoading(true)
      try {
        const docRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          const collections = docSnap.data().flashcardSets || []
          setflashcards(collections)
        } else {
          await setDoc(docRef, {flashcards: []})
        }
      } catch(error) {
        console.error(`Failed to fetch flashcards: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }
    getFlashcards()
  },[user])

  const dotVariants = {
    start: { y: "0%" },
    end: { y: "100%" },
  };

  return (
    <main className="flex flex-col flex-grow mt-32 mx-4 md:mx-12">
     <div className="max-w-[90%]">
      <p className="text-3xl md:text-4xl xl:text-5xl font-medium">Welcome back, <span className="text-primary font-semibold">Yohannes</span></p>
      <p className="text-xl my-4">Create flashcards and continue studying</p>
     </div>
    <div className="flex flex-row justify-end mt-8">
        <Link href="/generate">
          <Button><IoAdd className="text-xl mr-1 stroke-2 fill-black"/>Create</Button>
        </Link>
      </div>
      {isLoading && (
        <div className="flex gap-2 m-auto items-center justify-center">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="w-4 h-4 bg-gray-600 rounded-full"
              variants={dotVariants}
              initial="start"
              animate="end"
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: "easeInOut",
                delay: index * 0.09,
              }}
            />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-8">
        {flashcards.map((flashcard, index) => 
          <Card key={index} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{flashcard.name}</CardTitle>
              <CardDescription>{flashcard.question}</CardDescription>
            </CardHeader>
            <CardFooter>
              {/* <Button onClick={() => handleCardClick(flashcard.name, flashcard.question ?? '')}><FaArrowRight/></Button> */}
              <Button onClick={() => handleCardClick(flashcard.name)}><FaArrowRight/></Button>
            </CardFooter>
          </Card>
      )}
      </div>
    </main>
  )
}

export default Dashboard