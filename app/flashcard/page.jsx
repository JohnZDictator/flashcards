'use client'

import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { collection, doc, getDoc, getDocs } from "@firebase/firestore"
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"

const Flashcard = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const searchParams = useSearchParams()
  const search = searchParams.get('id')
  // const question = searchParams.get('question')

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  useEffect(() => {
    async function getFlashcard() {
      console.log(search, user)
      if (!search || !user) {
        setAlertMessage('Flashcard not found')
        setAlertOpen(true)
        return
      }

      setIsLoading(true)

      try {
        const colRef = doc(collection(doc(collection(db, 'users'), user.id), "flashcardSets"), search)
        const docs = await getDoc(colRef)
        
        if(docs.exists()) {
          const collections = await docs.data().flashcards || []
          setFlashcards(collections)
        }
      } catch (error) {
        console.error(`Failed to fetch flashcards: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }
    if (isLoaded && isSignedIn && user) {
      getFlashcard()
    }
  }, [search, isLoaded, isSignedIn, user])

  const flipVariants = {
    front: {
      rotateY: 0,
    },
    back: {
      rotateY: 180,
    },
  };

  const flipTransition = {
    duration: 0.6,
    ease: "easeInOut",
  };

  const dotVariants = {
    start: { y: "0%" },
    end: { y: "100%" },
  };

  return (
    <main className="flex flex-col flex-grow mt-32 mb-8 mx-4 md:mx-12">
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error Message</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Okay</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <p className="text-xl md:text-2xl font-medium">{search}</p>
      {/* <p className="text-md md:text-lg">{question}</p> */}

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

      {flashcards.length > 0 && (
        <div className="flex flex-col m-auto justify-center gap-8">
          <Carousel className="w-[80%] max-w-md xl:max-w-[60%]">
            <CarouselContent>
              {flashcards.map((card, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col gap-12 justify-between">
                      <div className="flex flex-col aspect-square items-center justify-center p-6">
                        <motion.div
                          className="absolute w-full h-full backface-hidden"
                          style={{
                            transformStyle: "preserve-3d",
                          }}
                          variants={flipVariants}
                          animate={flipped[index] ? "back" : "front"}
                          transition={flipTransition}
                        >
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(0deg)",
                            }}
                          >
                            <span className="text-md text-center font-medium px-6">{card.front}</span>
                          </div>
                          <div
                            className="absolute inset-0 flex items-center justify-center rotateY-180"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)",
                            }}
                          >
                            <span className="text-md text-center font-medium px-6">{card.back}</span>
                          </div>
                        </motion.div>
                      </div>
                      <Button onClick={() => handleCardClick(index)}>Flip</Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </main>
  )
}

export default Flashcard
