'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/router"
import { useState } from "react"

const Generate = () => {
  const {isLoaded, isSignedIn, user} = useUser()
  const [flashcards, setflashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  // const router = useRouter()

  const handleSubmit = async () => {
    fetch('api/generate', {
      method: 'POST',
      body: text,
    })
    .then((res) => res.json())
    .then((data) => setflashcards(data))
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const saveFlashCards = async () => {
    if(!name) {
      alert('Please enter a name')
    }
  }

  return (
    <section className="flex flex-col gap-8 flex-grow w-full items-center mt-32 mb-12 mx-auto py-12 px-4 md:max-w-[70%] xl:max-w-[60%]">
      <p className="text-3xl md:4xl xl:5xl font-medium">Generate Flashcard</p>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Input placeholder="Enter your topic here" />
        <Button>Generate</Button>
      </div>
    </section>
  )
}

export default Generate