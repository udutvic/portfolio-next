"use client";

import MagicButton from "./MagicButton"
import { AuroraBackground } from "./ui/AuroraBackground";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { motion } from "framer-motion";
import { FaLocationArrow } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="pb-20 pt-36 ">
      <div>
        <AuroraBackground>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          ></motion.div>
        </AuroraBackground>
      </div>
      <div
        className="h-screen w-full dark:bg-black-100 bg-white dark:bg-hex-grid-white/[0.05] bg-hex-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
      >
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        />
      </div>
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dinamic Web Magic with Next.js
          </p>
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Turning Ideas into Dynamic Web Applications"
            filter
          />
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi, I&apos;m Viktor, a Next.js developer crafting modern solutions for your business.
          </p>
        </div>
      </div>
      <a
        href="#about"
        className="flex justify-center items-center cursor-pointer"
      >
        <MagicButton
          title="See my work"
          icon={<FaLocationArrow />}
          position="right"
        />
      </a>
    </div>
  );
};

export default Hero;
