import React from 'react'
import { Button } from './ui/button'

const PricingSection = () => {
  return (
    <section id="pricing" className="flex flex-col gap-4 items-center mx-4 my-16">
      <div className="rounded-full px-3 py-1 border border-primary mb-8">
        <p className="text-sm">Pricing</p>
      </div>
      <p className="text-3xl md:text-4xl xl:text-5xl font-semibold text-center">Choose the solution you need</p>
      <section className="flex flex-col gap-8 md:flex-row mx-auto md:max-w-[80%] justify-evenly mt-16">
        <article className="flex flex-col gap-6 rounded-2xl bg-primary text-white py-12 px-8">
          <p className='text-2xl font-semibold'>Free Plan</p>
          <p>Perfect for casual learners. Get started with basic features and generate up to <span className='text-secondary font-semibold'>50</span> flashcards per month.</p>
          <Button>View plan</Button>
        </article>
        <article className="flex flex-col gap-6 rounded-2xl bg-primary text-white py-12 px-8">
          <p className='text-2xl font-semibold'>Pro Plan: $9.99/month</p>
          <p>Ideal for dedicated students. Unlock <span className='text-secondary font-semibold'>unlimited</span> flashcard generation, advanced personalization, and priority support.</p>
          <Button>View plan</Button>
        </article>
        <article className="flex flex-col gap-6 rounded-2xl bg-primary text-white py-12 px-8">
          <p className='text-2xl font-semibold'>Team Plan: $29.99/month</p>
          <p>Best for groups and classrooms. Enjoy all <span className='text-secondary font-medium'>Pro</span> features, plus collaborative tools and group study sessions.</p>
          <Button>View plan</Button>
        </article>
      </section>
    </section>
  )
}

export default PricingSection