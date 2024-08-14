const FeaturesSection = () => {
  return (
    <section className="flex flex-col gap-8 rounded-2xl bg-card_bg items-center mx-4 my-16 py-12">
      <div className="rounded-full px-3 py-1 border border-black">
        <p className="text-sm">Features</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-3xl md:text-4xl xl:text-5xl font-semibold">Explore our features</p>
        <p className="text-base text-center font-light text-black mt-4">
          Unlock the Power of Learning with AI-Driven Flashcards
        </p>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mx-8 md:max-w-[80%]">
        <article className="rounded-2xl bg-white py-12 px-8">
          <h3 className="text-xl font-medium">Custom Flashcards in Seconds</h3>
          <p className="text-base font-light text-black mt-2">No more manual input. Just provide your topic, and our AI generates concise, accurate flashcards instantly, tailored to your learning needs.</p>
        </article>
        <article className="rounded-2xl bg-primary text-white py-12 px-8">
          <h3 className="text-xl font-medium">Personalized Learning</h3>
          <p className="text-base font-light text-white mt-2">Our AI adapts to your study habits, creating flashcards that focus on areas you need to improve. Study efficiently and effectively.</p>
        </article>
        <article className="rounded-2xl bg-card_bg-accent py-12 px-8">
          <h3 className="text-xl font-medium">Multi-Topic Coverage</h3>
          <p className="text-base font-light mt-2">From languages to sciences, our AI can handle it all. Generate flashcards for any subject or topic, ensuring comprehensive coverage for your studies.</p>
        </article>
        <article className="md:col-start-2 col-span-1 rounded-2xl bg-white py-12 px-8">
          <h3 className="text-xl font-medium">Seamless Integration</h3>
          <p className="text-base font-light text-black mt-2">Access your flashcards on any device, anywhere. Sync across platforms and study on the go with ease.</p>
        </article>
      </section>
    </section>
  )
}

export default FeaturesSection