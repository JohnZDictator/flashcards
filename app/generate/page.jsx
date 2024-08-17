'use client'
import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { collection, doc, getDoc, writeBatch } from "@firebase/firestore"

import { db } from "@/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const Generate = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const [flashcards, setflashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [text, setText] = useState('')
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const [api, setApi] = useState()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const handleSubmit = async () => {
    if(!text.trim()) {
      // alert('Please enter some text to generate flashcards')
      setAlertMessage('Please enter some text to generate flashcards')
      handleOpenAlert()
      return
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text}),
      })
        if(!response.ok) {
        throw new Error("Failed to generate flashcards")
      }
      const data = await response.json()
      setflashcards(data)
    } catch (error) {
      console.error("Error generating flashcards:", error)
      // alert("An error occured while generating flashcards. Please try again.")
      setAlertMessage("An error occured while generating flashcards. Please try again.")
      handleOpenAlert()
    }
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)
  const handleOpenAlert = () => setAlertOpen(true) 
  const handleCloseAlert = () => setAlertOpen(false)

  const saveFlashCards = async () => {
    if(!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)

      const batch = writeBatch(db)
      if(userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), {name: setName}]
        batch.update(userDocRef, {flashcardSets: updatedSets})
      } else {
        batch.update(userDocRef, {flashcardSets: [{name: setName}]})
      }

      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, {flashcards})

      await batch.commit()
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setName('')
    } catch (error) {
      console.error("Error saving flashcards", error)
      alert('An error occured while saving flashcards. Please try again.')  
    }
  }

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section className="flex flex-col gap-8 flex-grow w-full items-center mt-32 mb-12 mx-auto py-12 px-4 md:max-w-[70%] xl:max-w-[60%]">
      <p className="text-3xl xl:text-4xl text-center font-medium">Generate Flashcards</p>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Input
          placeholder="Enter your topic here"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSubmit}>Generate</Button>
      </div>

      {alertOpen && (
        <AlertDialog>
          {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {alertMessage}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* <AlertDialogAction>Continue</AlertDialogAction> */}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>      
      )}

      {flashcards.length > 0 && (
        <div>
          <Button onClick={handleOpenDialog}>Save Flashcards</Button>
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              {flashcards.map((card, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col gap-12 aspect-square items-center justify-center p-6">
                      <span className="text-xl font-medium">{card.front}</span>
                      <Button onClick={handleCardClick}>Flip</Button>
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
    </section>
  )
}

export default Generate