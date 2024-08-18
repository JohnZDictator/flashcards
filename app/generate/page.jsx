'use client'
import { SignedIn, useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { collection, doc, getDoc, writeBatch } from "@firebase/firestore"
import { motion, useAnimation } from "framer-motion"

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Generate = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  
  const [isLoading, setIsLoading] = useState(false)
  const [flashcards, setflashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  // const [current, setCurrent] = useState(0)
  // const [count, setCount] = useState(0)
  
  const [text, setText] = useState('')
  const [setName, setSetName] = useState('')
  
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isSuccessAlert, setIsSuccessAlert] = useState(false)


  const handleSubmit = async () => {
    setIsLoading(true)
    if(!text.trim()) {
      setIsSuccessAlert(false)
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
      setFlipped(Array(data.length).fill(false))
    } catch (error) {
      console.error("Error generating flashcards:", error)
      setIsSuccessAlert(false)
      setAlertMessage("An error occured while generating flashcards. Please try again.")
      handleOpenAlert()
    } finally {
      setIsLoading(false)
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
  
  const handleOpenAlert = () => {
    setAlertOpen(true)
  }

  // const saveFlashCards = async () => {
  //   if(!setName.trim()) {
  //     setAlertMessage('Please enter a name for your flashcard set.')
  //     handleOpenAlert()
  //     return
  //   }

  //   try {
  //     const userDocRef = doc(collection(db, 'users'), user.id)
  //     const userDocSnap = await getDoc(userDocRef)

  //     const batch = writeBatch(db)
  //     if(userDocSnap.exists()) {
  //       const userData = userDocSnap.data()
  //       const updatedSets = [...(userData.flashcardSets || []), {name: setName}]
  //       batch.update(userDocRef, {flashcardSets: updatedSets})
  //     } else {
  //       batch.update(userDocRef, {flashcardSets: [{name: setName}]})
  //     }

  //     const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
  //     batch.set(setDocRef, {flashcards})

  //     await batch.commit()
  //     setAlertMessage('Flashcards saved successfully!')
  //     handleOpenAlert()
  //     handleCloseDialog()
  //     setSetName('')
  //   } catch (error) {
  //     console.error("Error saving flashcards", error)
  //     setAlertMessage('An error occured while saving flashcards. Please try again.')
  //     handleOpenAlert()  
  //   }
  // }

  const saveFlashCards = async () => {
    if (!setName || !setName.trim()) {
      setIsSuccessAlert(false)
      setAlertMessage('Please enter a name for your flashcard set.');
      handleOpenAlert();
      return;
    }
  
    try {
      const userDocRef = doc(db, 'users', user.id); // Simplified the doc reference
      const userDocSnap = await getDoc(userDocRef);
  
      const batch = writeBatch(db);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedSets = [...(userData.flashcardSets || []), { name: setName, question: text }];
        batch.update(userDocRef, { flashcardSets: updatedSets });
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName, question: text }] }); // Use set instead of update
      }
  
      const setDocRef = doc(userDocRef, 'flashcardSets', setName.trim()); // Trimmed setName for safety
      batch.set(setDocRef, { flashcards });
  
      await batch.commit();
  
      setIsSuccessAlert(true);
      setAlertMessage('Flashcards saved successfully!');
      handleOpenAlert();
      handleCloseDialog();
      setSetName('');
    } catch (error) {
      console.error("Error saving flashcards", error);
      setIsSuccessAlert(false);
      setAlertMessage('An error occurred while saving flashcards. Please try again.');
      handleOpenAlert();
    }
  };  

  useEffect(() => {
    if(!alertOpen) {
      setIsSuccessAlert(false)
      setAlertMessage('')
    }
  }, [alertOpen])

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

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isSuccessAlert ? "Success Message" : "Error Message"}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Okay</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="text-center mx-auto max-w-[80%] md:max-w-[60%]">
          <DialogHeader className="flex flex-col items-center gap-4">
            <DialogTitle>Save Flashcard Set</DialogTitle>
            <DialogDescription>
              Please enter a name for your flashcard set.
            </DialogDescription>
            <Input placeholder="Enter flashcard set name here" value={setName} onChange={(e) => setSetName(e.target.value)} />
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-4 md:flex-row mt-4">
            <Button variant="destructive" onClick={handleCloseDialog} className="order-1 md:order-none">Cancel</Button>
            <Button onClick={saveFlashCards} className="order-none md:order-1">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading && (
        <div className="flex gap-2 items-center">
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
        <div className="flex flex-col items-center gap-8">
          <SignedIn>
            <Button onClick={handleOpenDialog}>Save Flashcards</Button>
          </SignedIn>
          <Carousel className="w-[60%] max-w-md xl:max-w-[60%]">
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
    </section>
  )
}

export default Generate