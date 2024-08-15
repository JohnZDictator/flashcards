import React from 'react'

const StatsSection = () => {
  return (
    <section id="features" className="flex flex-col gap-8 md:flex-row mx-auto md:max-w-[80%] justify-evenly items-center mt-16">
      <article className="text-center flex flex-col gap-4">
        <p className="text-5xl font-medium">2M+</p>
        <div>
          <p className="text-sm font-normal text-black-accent">Customers</p>
          <p className="text-sm font-normal text-black-accent">building with Netgo</p>
        </div>
      </article>
      <article className="text-center flex flex-col gap-4">
        <p className="text-5xl font-medium">98%</p>
        <div>
          <p className="text-sm font-normal text-black-accent">Uptime SLA</p>
          <p className="text-sm font-normal text-black-accent">Volumes block storage</p>
        </div>
      </article>
      <article className="text-center flex flex-col gap-4">
        <p className="text-5xl font-medium">24/5</p>
        <div>
          <p className="text-sm font-normal text-black-accent">Global</p>
          <p className="text-sm font-normal text-black-accent">support coverage</p>
        </div>
      </article>
    </section>
  )
}

export default StatsSection