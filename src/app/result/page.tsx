'use client'

import { useGeneratorStore } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'

export default function ResultPage() {
  const store = useGeneratorStore()
  const router = useRouter()
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle')

  useEffect(() => {
    if (!store.generatedImage) {
      router.push('/')
    }
  }, [store.generatedImage, router])

  if (!store.generatedImage) return null

  const handleDownload = async () => {
    setDownloadState('downloading')
    
    // Fake slight delay for UX feel
    await new Promise(res => setTimeout(res, 600))
    
    const link = document.createElement('a')
    link.download = `HackerHouse_Goa2026_${store.builderNumber}.jpg`
    link.href = store.generatedImage!
    link.click()
    
    setDownloadState('done')
    setTimeout(() => setDownloadState('idle'), 3000)
  }

  const [shareState, setShareState] = useState<'idle' | 'uploading' | 'done'>('idle')

  const handleShare = async () => {
    try {
      setShareState('uploading')
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: store.generatedImage }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image')
      }
      
      const { url } = await response.json();
      
      const shareUrl = `${window.location.origin}/share?url=${encodeURIComponent(url)}`;
      
      const tweetText = `Just secured my spot for Hacker House Goa 2026! 🌴🌊\n\nBuilder #${store.builderNumber} - ${store.builderTitle}\n\nGet your official boarding pass and join the movement ✈️👇\n${shareUrl}\n\n@247pmstudio #HHGoa2026 #FrameInGoa`;
      const text = encodeURIComponent(tweetText);
      
      const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${text}`;
      
      setShareState('done')
      window.open(twitterIntentUrl, '_blank')
      
      setTimeout(() => setShareState('idle'), 3000)
    } catch (e) {
      console.error(e)
      setShareState('idle')
      alert("Failed to prepare share link. Please try again.")
    }
  }

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
  }

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, damping: 20, stiffness: 100 } }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[var(--goa-ink)] flex flex-col md:flex-row text-[var(--goa-cream)] overflow-hidden"
    >
      {/* Left: Final Image Reveal */}
      <div className="w-full md:w-3/5 p-6 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[var(--goa-green)] texture-grain relative h-[50vh] md:h-screen">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[var(--goa-green)] pointer-events-none mix-blend-screen" 
        />
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-8 font-mono text-[var(--goa-yellow)] uppercase tracking-widest font-bold z-20"
        >
          GENERATED ✓
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 25, delay: 0.7 }}
          className="relative z-10 w-full max-w-2xl max-h-[80vh] flex justify-center"
        >
          <img 
            src={store.generatedImage} 
            alt="Generated ID" 
            className="w-auto h-auto max-w-full max-h-[80vh] object-contain border-4 border-[var(--goa-green-dark)] shadow-[16px_16px_0px_var(--goa-green-dark)] bg-[var(--goa-paper)]"
          />
        </motion.div>
      </div>

      {/* Right: Actions Reveal Sequence */}
      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full md:w-2/5 p-6 md:p-12 bg-[var(--goa-green-dark)] flex flex-col justify-center font-mono relative z-20 h-[50vh] md:h-screen"
      >
        <motion.h1 variants={itemVars} className="font-serif text-5xl md:text-7xl text-[var(--goa-yellow)] uppercase tracking-tight mb-4 drop-shadow-[4px_4px_0px_var(--goa-ink)]">
          Welcome to Goa.
        </motion.h1>
        
        <motion.div variants={itemVars} className="mb-12 border-l-[4px] border-[var(--goa-pink)] pl-6 py-2 bg-[var(--goa-ink)]/30">
           <div className="text-[var(--goa-green-light)] text-sm uppercase tracking-widest mb-1">Builder Title</div>
           <div className="text-[var(--goa-cream)] text-2xl font-bold uppercase">{store.builderTitle}</div>
           <div className="text-[var(--goa-pink)] text-xl mt-2 font-black">#{store.builderNumber}</div>
        </motion.div>

        <motion.div variants={itemVars} className="space-y-6">
          <Button 
            variant="primary" 
            className="w-full py-5 text-xl tracking-widest font-bold" 
            onClick={handleDownload}
            disabled={downloadState === 'downloading'}
          >
            {downloadState === 'idle' && '⬇ DOWNLOAD PNG'}
            {downloadState === 'downloading' && 'GENERATING PNG...'}
            {downloadState === 'done' && 'DOWNLOADED ✓'}
          </Button>

          <Button 
            variant="accent" 
            className="w-full py-5 text-xl tracking-widest font-bold" 
            onClick={handleShare}
            disabled={shareState === 'uploading'}
          >
            {shareState === 'idle' && '✖ POST ON X'}
            {shareState === 'uploading' && 'PREPARING...'}
            {shareState === 'done' && 'OPENING X...'}
          </Button>
          
          <div className="pt-8 text-center">
            <Link href="/generator" onClick={() => store.setField('generatedImage', null)} className="text-[var(--goa-green-light)] hover:text-[var(--goa-yellow)] underline uppercase tracking-widest transition-colors">
              CREATE ANOTHER
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
