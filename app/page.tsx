"use client";

import Hero from "@/components/Hero"
import { FloatingNav } from "@/components/ui/FloatingNavbar"
import { Grid }  from "@/components/Grid";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px10 px-5">
      <section className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
      </section>
    </main>
  );
}