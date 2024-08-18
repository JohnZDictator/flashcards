'use client'

import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { collection, doc, getDoc, setDoc } from "@firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

const Dashboard = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const [flashcards, setflashcards] = useState([])
  const router = useRouter()

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  useEffect(() => {
    async function getFlashcards() {
      if(!user) return
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
      }
    }
    getFlashcards()
  },[user])

  return (
    <main className="flex-grow mt-32 mx-4 md:mx-12">
     <div className="max-w-[90%]">
      <p className="text-3xl md:text-4xl xl:text-5xl font-medium">Welcome back, <span className="text-primary font-semibold">Yohannes</span></p>
      <p className="text-xl my-4">Create flashcards and continue studying</p>
     </div>
    <div className="flex flex-row justify-end mt-8">
        <Button><IoAdd className="text-xl mr-1 stroke-2 fill-black"/>Create</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-center mt-8">
        {flashcards.map((flashcard, index) => 
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{flashcard.name}</CardTitle>
              <CardDescription>{flashcard.question}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => handleCardClick(flashcard.name)}><FaArrowRight/></Button>
            </CardFooter>
          </Card>
      )}
      </div>
    </main>
  )
}

export default Dashboard