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
import Review from "@/components/sections/review/review";
import SocialMedia from "@/components/sections/social-media/social-media";

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
        className="
          relative
          z-20
          -mt-[10vh] md:mt-0
          bg-white md:bg-white
          rounded-t-[20px] md:rounded-t-[30px]
          pt-12 md:pt-16
        "
      >
        <Stats />
      </motion.div>

      {/* STATS */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >

      <About />
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

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Review />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <SocialMedia />
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
