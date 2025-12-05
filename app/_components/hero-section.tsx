"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "motion/react";
import { ChevronDown } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCursor } from "./cursorContext";
import { AnimatedLogo } from "./navBar";

const GradientBackground = () => (
  <motion.div 
    className="absolute inset-0 grid place-items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
  >
    <div 
      className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-purple-300/80 via-pink-300/80 to-indigo-300/80 opacity-20 blur-[80px]"
    />
  </motion.div>
);

const ScrollIndicator = () => {
  const { setIsHovering } = useCursor();
  
  return (
    <motion.div
      className="absolute bottom-8 left-0 right-0 mx-auto flex flex-col items-center gap-2 w-full max-w-xs p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 3,
        duration: 0.3, 
        ease: [0.4, 0.0, 0.2, 1]
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })}
    >
      <motion.p 
        className="text-sm text-gray-900 font-medium text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Scroll to explore
      </motion.p>
      <motion.div
        animate={{ 
          y: [0, 8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
      </motion.div>
    </motion.div>
  );
};

function PortfolioHeroContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <GradientBackground />
      
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          className="mb-8"
        >
          <AnimatedLogo size="xl" autoAnimate animateDuration={5000} />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-700 font-light max-w-xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        >
          Simple. Elegant. Effective.
        </motion.p>

        <motion.p
          className="mt-4 text-sm md:text-base text-gray-600 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 8 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          I build performant React/Next.js and Swift apps for startups and creatives.
        </motion.p>

        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <Button asChild>
            <Link href="/projects">See projects</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="mailto:charlie@unedited.site">Contact</Link>
          </Button>
        </motion.div>
      </div>

      <ScrollIndicator />
    </div>
  );
}

export default function PortfolioHero() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <PortfolioHeroContent />
    </Suspense>
  );
}

