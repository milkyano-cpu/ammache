"use client"

import { motion } from "framer-motion"

import Header from "@/components/layouts/header";
import Hero from "@/components/sections/hero/hero";
import About from "@/components/sections/about/about";
import Stats from "@/components/sections/stats/stats";
import Projects from "@/components/sections/projects/projects";
import type { ProjectCardData } from "@/components/sections/projects/projects";
import Studio from "@/components/sections/studio/studio";
import CTA from "@/components/sections/cta/cta";
import Footer from "@/components/layouts/footer"

export default function HomeClient({ projects }: { projects: ProjectCardData[] }) {

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  return (
    <main className="w-full overflow-hidden">

      <Header/>

      {/* HERO */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <Hero/>
      </motion.div>

      {/* ABOUT */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <About />
      </motion.div>

      {/* STATS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Stats />
      </motion.div>

      {/* PROJECTS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Projects projects={projects} />
      </motion.div>

      {/* STUDIO */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Studio />
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <CTA />
      </motion.div>

      <Footer />

    </main>
  );
}
