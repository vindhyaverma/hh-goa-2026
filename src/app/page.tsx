'use client'

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export default function Home() {
  const { scrollY } = useScroll()

  // Parallax effects
  const bgY = useTransform(scrollY, [0, 1000], [0, 200])
  const sunY = useTransform(scrollY, [0, 1000], [0, 100])
  const palmsY = useTransform(scrollY, [0, 1000], [0, -100])
  const frontY = useTransform(scrollY, [0, 1000], [0, -200])

  // Animation variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } }
  }

  const letterVars: Variants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring' as const, damping: 12, stiffness: 200 } }
  }

  const wordStaggerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  return (
    <main className="relative min-h-[120vh] overflow-hidden bg-[var(--goa-green)] flex flex-col items-center justify-start pt-[28vh] p-6 texture-grain">
      
      {/* Background layer */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-multiply"
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
      >
        <img src="/assets/goa/v2/beach_sunset.jpg" className="w-full h-full object-cover object-[center_top]" alt="" />
      </motion.div>

      {/* Parallax Assets */}
      <motion.img 
        style={{ y: sunY }}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 0.6, y: 0 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        src="/assets/goa/sun/sun1.jpg" 
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1200px] max-w-none mix-blend-multiply pointer-events-none z-0" 
        alt="" 
      />

      <motion.img 
        style={{ y: frontY }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.8 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        src="/assets/goa/houses/house1.jpg" 
        className="absolute bottom-[20%] -left-10 w-[350px] md:w-[500px] mix-blend-multiply pointer-events-none transform -scale-x-100 z-20" 
        alt="" 
      />

      <motion.img 
        style={{ y: palmsY }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 0.9 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        src="/assets/goa/palms/palm1.jpg" 
        className="absolute -top-10 -right-20 w-[300px] md:w-[600px] mix-blend-multiply pointer-events-none z-20" 
        alt="" 
      />

      <motion.img 
        style={{ y: frontY }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.9 }}
        transition={{ duration: 1, delay: 0.6 }}
        src="/assets/goa/scooters/scooter1.jpg" 
        className="absolute bottom-[15%] right-[5%] md:right-20 w-[200px] md:w-[350px] mix-blend-multiply pointer-events-none z-30" 
        alt="" 
      />



      {/* Content */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="relative z-30 flex flex-col items-center text-center max-w-5xl mx-auto"
      >
        <h1 className="font-serif text-[15vw] md:text-[10rem] leading-[0.8] tracking-tighter text-[var(--goa-yellow)] drop-shadow-[6px_6px_0px_var(--goa-ink)] uppercase relative mb-8">
          
          <motion.div variants={wordStaggerVars} className="block text-left overflow-hidden">
             {'Hacker'.split('').map((char, i) => <motion.span key={i} variants={letterVars} className="inline-block">{char}</motion.span>)}
          </motion.div>

          <motion.span 
            variants={itemVars}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] md:text-[8rem] text-[var(--goa-pink)] font-sans font-black tracking-normal z-10" 
            style={{WebkitTextStroke: '3px var(--goa-ink)'}}
          >
            गोवा
          </motion.span>
          
          <motion.div variants={wordStaggerVars} className="block text-right ml-12 overflow-hidden">
             {'House'.split('').map((char, i) => <motion.span key={i} variants={letterVars} className="inline-block">{char}</motion.span>)}
          </motion.div>
        </h1>
        
        <motion.div variants={itemVars} className="mt-12 mb-12 flex flex-col md:flex-row gap-4 md:gap-12 font-mono text-[var(--goa-cream)] font-bold text-lg md:text-2xl tracking-widest uppercase">
          <p className="bg-[var(--goa-ink)] px-4 py-2 border-[4px] border-[var(--goa-ink)] shadow-[4px_4px_0px_var(--goa-pink)]">Goa, India</p>
          <p className="bg-[var(--goa-ink)] px-4 py-2 text-[var(--goa-pink)] border-[4px] border-[var(--goa-ink)] shadow-[4px_4px_0px_var(--goa-yellow)]">28 — 31 OCT 2026</p>
        </motion.div>

        <motion.div variants={itemVars} className="flex flex-col sm:flex-row gap-6 mt-8">
          <Link href="/generator">
            <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
               <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-xl md:text-2xl border-[4px]">Enter Generator</Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
