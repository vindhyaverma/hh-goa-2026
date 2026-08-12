'use client'

import { useGeneratorStore, generateBuilderNumber } from '@/lib/store'
import { Button } from '@/components/ui/Button'
import { useState, useRef, useEffect } from 'react'

import { PhotoEditor } from '@/components/PhotoEditor'
import { TemplatePreview } from '@/components/TemplatePreview'
import { toJpeg } from 'html-to-image'
import { useRouter } from 'next/navigation'
import { TEMPLATES } from '@/lib/templates'
import { TemplateCategory } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

const STACKS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 
  'Node.js', 'Go', 'Rust', 'C++', 'Java', 'Swift', 'Flutter', 
  'Kotlin', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 
  'TensorFlow', 'PyTorch', 'Figma', 'Solidity', 'Web3', 'Ethereum',
  'UI/UX', 'Framer', 'Three.js', 'WebGL', 'GraphQL', 'Prisma', 'Tailwind'
]

export default function GeneratorPage() {
  const store = useGeneratorStore()
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Hydration fix for builderNumber
  useEffect(() => {
    if (store.builderNumber === '000') {
      store.setField('builderNumber', generateBuilderNumber())
    }
  }, [store.builderNumber, store])
  
  // Gallery state
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('boarding-pass')
  const filteredTemplates = activeCategory === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === activeCategory)

  // Current config for aspect ratio mapping
  const currentConfig = TEMPLATES.find(t => t.id === store.templateId) || TEMPLATES[0]

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Slight delay to ensure UI updates before capture
    setTimeout(async () => {
      try {
        const node = document.getElementById('export-node')
        if (!node) throw new Error('Export node not found')

        const parent = node.parentElement
        let originalTransform = ''
        if (parent) {
          originalTransform = parent.style.transform
          parent.style.transform = 'scale(1)'
        }

        await new Promise(res => requestAnimationFrame(res))
        await new Promise(res => requestAnimationFrame(res)) 

        const dataUrl = await toJpeg(node, { quality: 0.95, pixelRatio: 1 })

        if (parent) {
           parent.style.transform = originalTransform
        }

        store.setField('generatedImage', dataUrl)
        router.push('/result')

      } catch (err) {
        console.error('Failed to generate image', err)
      } finally {
        setIsGenerating(false)
      }
    }, 300) // Slightly longer to allow framer-motion interactions to finish
  }
  
  return (
    <div className="min-h-screen bg-[var(--goa-ink)] flex flex-col md:flex-row text-[var(--goa-cream)] overflow-hidden">
      
      {/* Left: Preview Area */}
      <div className="w-full md:w-1/2 lg:w-3/5 p-6 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[var(--goa-green)] texture-grain relative h-[50vh] md:h-screen">
        <div className="absolute inset-0 opacity-20 bg-[var(--goa-green)] pointer-events-none mix-blend-screen" />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
           <TemplatePreview />
        </div>
      </div>

      {/* Right: Controls Area */}
      <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-12 bg-[var(--goa-green-dark)] overflow-y-auto font-mono relative h-[50vh] md:h-screen">
        {isGenerating && (
           <div className="fixed inset-0 z-50 bg-[var(--goa-ink)]/90 flex flex-col items-center justify-center backdrop-blur-md">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[100px] mb-8"
              >
                🌴
              </motion.div>
              <h2 className="text-[var(--goa-yellow)] text-4xl font-serif animate-pulse text-center">
                GENERATING TICKET...
              </h2>
           </div>
        )}

        <h2 className="font-serif text-4xl text-[var(--goa-yellow)] uppercase tracking-tight mb-8 drop-shadow-[2px_2px_0px_var(--goa-ink)]">
          Customize Your ID
        </h2>

        <div className="space-y-8 pb-12">
          
          {/* V2: Template Gallery */}
          <div className="space-y-4 bg-[var(--goa-ink)] p-6 border-2 border-[var(--goa-green)]">
             <div className="flex justify-between items-end mb-2">
                <label className="block text-[var(--goa-yellow)] font-bold text-xl">TEMPLATE GALLERY</label>
                <div className="text-[var(--goa-green-light)] text-sm">{TEMPLATES.length} DESIGNS</div>
             </div>
             
             {/* Category Filter Tabs */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
               {(['all', 'boarding-pass', 'poster', 'builder-id', 'pfp'] as const).map(cat => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-4 py-2 uppercase font-bold text-xs whitespace-nowrap transition-colors border-2 ${
                     activeCategory === cat 
                      ? 'bg-[var(--goa-yellow)] border-[var(--goa-yellow)] text-[var(--goa-ink)]' 
                      : 'border-[var(--goa-green)] text-[var(--goa-cream)] hover:border-[var(--goa-pink)]'
                   }`}
                 >
                   {cat.replace('-', ' ')}
                 </button>
               ))}
             </div>

             {/* Carousel */}
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x pt-2">
               <AnimatePresence mode="popLayout">
                 {filteredTemplates.map(t => (
                   <motion.button
                     layout
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     whileHover={{ y: -4, scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     key={t.id}
                     onClick={() => store.setField('templateId', t.id)}
                     className={`snap-center flex-shrink-0 w-32 h-40 border-[4px] relative flex flex-col justify-between p-2 transition-colors ${
                       store.templateId === t.id 
                         ? 'border-[var(--goa-yellow)] shadow-[0px_0px_15px_rgba(255,235,59,0.4)]' 
                         : 'border-[var(--goa-green)] hover:border-[var(--goa-pink)]'
                     }`}
                   >
                     {/* Template Preview Visual (Abstracted) */}
                     <div className={`w-full flex-1 ${t.theme.backgroundClass} border-2 ${t.theme.borderClass} ${t.theme.textureClass || ''} overflow-hidden relative`}>
                        {/* Mini header representation */}
                        <div className={`absolute top-0 w-full h-2 ${t.theme.borderClass} border-b-2`} />
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                          {t.category === 'pfp' ? 'O' : t.category === 'boarding-pass' ? '✈' : '■'}
                        </div>
                     </div>
                     <div className="mt-2 text-left">
                       <div className="text-[9px] text-[var(--goa-green-light)] leading-none mb-1 uppercase">{t.category}</div>
                       <div className={`text-xs font-bold leading-tight ${store.templateId === t.id ? 'text-[var(--goa-yellow)]' : 'text-white'}`}>{t.name}</div>
                     </div>
                     
                     {/* Selected Badge */}
                     {store.templateId === t.id && (
                       <div className="absolute -top-3 -right-3 bg-[var(--goa-pink)] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
                     )}
                   </motion.button>
                 ))}
               </AnimatePresence>
             </div>
          </div>

          {/* Photo Uploader */}
          <div className="space-y-2">
            <label className="block text-[var(--goa-yellow)] font-bold">PHOTO</label>
            {!store.croppedPhoto ? (
              <PhotoEditor 
                aspect={currentConfig.category === 'pfp' ? 1 : (currentConfig.category === 'poster' ? 600/750 : 500/650)}
                onCropComplete={(url) => store.setField('croppedPhoto', url)} 
              />
            ) : (
              <div className="flex gap-4 items-center bg-[var(--goa-ink)] p-4 border-2 border-[var(--goa-green)]">
                <img src={store.croppedPhoto} className="w-16 h-16 object-cover border-2 border-[var(--goa-yellow)]" alt="" />
                <button 
                  onClick={() => store.setField('croppedPhoto', null)}
                  className="px-4 py-2 bg-[var(--goa-pink)] text-white font-bold uppercase text-sm shadow-[2px_2px_0px_var(--goa-ink)]"
                >
                  Change Photo
                </button>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <label className="block text-[var(--goa-yellow)] font-bold">BUILDER DETAILS</label>
            <div className="grid grid-cols-2 gap-4">
              <input 
                placeholder="FIRST NAME" 
                value={store.firstName}
                onChange={e => store.setField('firstName', e.target.value)}
                className="w-full bg-[var(--goa-ink)] border-2 border-[var(--goa-green)] text-[var(--goa-cream)] p-3 focus:outline-none focus:border-[var(--goa-yellow)] placeholder-[var(--goa-green-light)]"
              />
              <input 
                placeholder="LAST NAME" 
                value={store.lastName}
                onChange={e => store.setField('lastName', e.target.value)}
                className="w-full bg-[var(--goa-ink)] border-2 border-[var(--goa-green)] text-[var(--goa-cream)] p-3 focus:outline-none focus:border-[var(--goa-yellow)] placeholder-[var(--goa-green-light)]"
              />
            </div>
            <input 
              placeholder="ROLE (e.g. Frontend Engineer)" 
              value={store.role}
              onChange={e => store.setField('role', e.target.value)}
              className="w-full bg-[var(--goa-ink)] border-2 border-[var(--goa-green)] text-[var(--goa-cream)] p-3 focus:outline-none focus:border-[var(--goa-yellow)] placeholder-[var(--goa-green-light)]"
            />
            <input 
              placeholder="WHAT ARE YOU BUILDING?" 
              value={store.building}
              onChange={e => store.setField('building', e.target.value)}
              className="w-full bg-[var(--goa-ink)] border-2 border-[var(--goa-green)] text-[var(--goa-cream)] p-3 focus:outline-none focus:border-[var(--goa-yellow)] placeholder-[var(--goa-green-light)]"
            />
          </div>

          {/* Stack */}
          <div className="space-y-2">
            <div className="flex justify-between">
               <label className="block text-[var(--goa-yellow)] font-bold">STACK</label>
               <span className="text-xs text-[var(--goa-pink)] uppercase">Max 3</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {STACKS.map(tech => {
                const isSelected = store.stack.includes(tech)
                const isDisabled = store.stack.length >= 3 && !isSelected
                return (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={tech}
                    disabled={isDisabled}
                    onClick={() => store.toggleStack(tech)}
                    className={`px-3 py-1 border-2 text-sm uppercase font-bold transition-colors ${
                      isSelected 
                        ? 'bg-[var(--goa-yellow)] border-[var(--goa-yellow)] text-[var(--goa-ink)] shadow-[2px_2px_0px_var(--goa-pink)]' 
                        : 'border-[var(--goa-green)] text-[var(--goa-cream)] hover:border-[var(--goa-yellow)] disabled:opacity-50 disabled:hover:border-[var(--goa-green)]'
                    }`}
                  >
                    {tech}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Generate Button */}
          <div className="pt-8 border-t border-[var(--goa-green)]">
             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
               <Button 
                 variant="primary" 
                 className="w-full py-5 text-2xl disabled:opacity-50"
                 onClick={handleGenerate}
                 disabled={isGenerating}
               >
                 GENERATE ID
               </Button>
             </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}
