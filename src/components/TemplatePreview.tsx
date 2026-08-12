import { useEffect, useRef, useState } from 'react'
import { useGeneratorStore } from '@/lib/store'
import { TEMPLATES } from '@/lib/templates'
import { PfpFrame } from './templates/PfpFrame'
import { BoardingPassCard } from './templates/BoardingPassCard'
import { PosterCard } from './templates/PosterCard'
import { BuilderIDCard } from './templates/BuilderIDCard'
import { motion, AnimatePresence } from 'framer-motion'

export function TemplatePreview() {
  const store = useGeneratorStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const config = TEMPLATES.find(t => t.id === store.templateId) || TEMPLATES[0]

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        // Template base sizes
        let templateW = 1080
        let templateH = 1080
        
        switch (config.category) {
           case 'pfp': templateW = 1080; templateH = 1080; break;
           case 'boarding-pass': templateW = 1600; templateH = 1000; break;
           case 'poster': templateW = 1440; templateH = 1920; break;
           case 'builder-id': templateW = 1350; templateH = 1800; break;
        }

        const scaleX = width / templateW
        const scaleY = height / templateH
        setScale(Math.min(scaleX, scaleY) * 0.95) // 95% to leave some padding
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [config.category])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={config.id}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: scale, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ 
            transformOrigin: 'center center',
          }}
          className="shadow-2xl"
        >
          {config.category === 'pfp' && <PfpFrame config={config} />}
          {config.category === 'boarding-pass' && <BoardingPassCard config={config} />}
          {config.category === 'poster' && <PosterCard config={config} />}
          {config.category === 'builder-id' && <BuilderIDCard config={config} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

