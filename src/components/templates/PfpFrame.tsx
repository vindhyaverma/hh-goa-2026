import { useGeneratorStore } from '@/lib/store'
import { TemplateConfig } from '@/lib/types'

export function PfpFrame({ config }: { config: TemplateConfig }) {
  const store = useGeneratorStore()
  
  const { 
    backgroundClass, 
    textPrimaryClass, 
    textSecondaryClass, 
    accentClass, 
    borderClass,
    textureClass 
  } = config.theme

  const bgAsset = config.assets.backgrounds[0]
  const isMagazine = config.id === 'pfp-01' || config.id === 'pfp-02'
  const isCircle = config.id === 'pfp-03' || config.id === 'pfp-04'
  const isPolaroid = config.id === 'pfp-05' || config.id === 'pfp-06' || config.id === 'pfp-07'

  return (
    <div 
      id="export-node"
      className={`relative w-[1080px] h-[1080px] ${backgroundClass} flex items-center justify-center ${textureClass || 'texture-grain'} overflow-hidden`}
    >
      {/* Background Graphic */}
      {bgAsset && (
        <div className="absolute inset-0 z-0">
          <img src={bgAsset} className="w-full h-full object-cover" alt="" />
          {/* Subtle overlay to ensure text contrast if needed, but vector backgrounds are already flat */}
          {isCircle && <div className={`absolute inset-0 ${backgroundClass} opacity-20 mix-blend-color`}></div>}
        </div>
      )}

      {/* --- LAYOUT 1: EDITORIAL MAGAZINE --- */}
      {isMagazine && (
        <>
          <div className={`absolute inset-0 border-[40px] ${borderClass} z-10 pointer-events-none`}></div>
          <div className="absolute top-16 left-0 w-full text-center z-20">
            <h1 className={`font-serif text-[100px] leading-none uppercase tracking-tighter ${textPrimaryClass} drop-shadow-lg`}>
              HACKER <span className={`${accentClass} font-sans font-black tracking-normal`}>गोवा</span> HOUSE
            </h1>
          </div>

          <div className={`relative z-20 w-[700px] h-[700px] mt-16 bg-white border-[24px] ${borderClass} shadow-[32px_32px_0px_var(--goa-ink)] transform rotate-2`}>
            {store.croppedPhoto ? (
              <img src={store.croppedPhoto} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className={`w-full h-full bg-gray-200 border-8 border-dashed ${borderClass} flex items-center justify-center text-4xl text-gray-400 font-bold font-sans`}>PHOTO</div>
            )}
          </div>

          <div className="absolute bottom-16 right-16 z-30">
            <div className={`bg-[var(--goa-ink)] ${accentClass} px-8 py-4 border-[8px] border-white shadow-[16px_16px_0px_var(--goa-ink)] transform -rotate-3`}>
              <div className="text-2xl font-bold tracking-widest uppercase mb-1">{store.builderTitle}</div>
              <div className="text-6xl font-black font-sans uppercase">#{store.builderNumber}</div>
            </div>
          </div>
        </>
      )}

      {/* --- LAYOUT 2: VINTAGE STAMP / CIRCLE --- */}
      {isCircle && (
        <>
          <div className={`absolute inset-0 border-[24px] ${borderClass} z-10 pointer-events-none opacity-90`}></div>
          
          <div className="absolute inset-16 z-10 pointer-events-none flex items-center justify-center">
            <div className={`w-[860px] h-[860px] rounded-full border-[12px] border-dashed ${borderClass} animate-spin-slow opacity-80`}></div>
          </div>

          <div className={`relative z-20 w-[800px] h-[800px] rounded-full border-[32px] ${borderClass} overflow-hidden shadow-2xl bg-white`}>
            {store.croppedPhoto ? (
              <img src={store.croppedPhoto} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className={`w-full h-full bg-gray-200 border-8 border-dashed ${borderClass} flex items-center justify-center text-4xl text-gray-400 font-bold font-sans`}>PHOTO</div>
            )}
          </div>

          <div className="absolute bottom-20 z-30">
             <div className={`bg-white ${textPrimaryClass} px-12 py-6 border-[8px] ${borderClass} rounded-full shadow-2xl flex items-center gap-6`}>
               <span className="text-5xl font-black uppercase tracking-tighter">#{store.builderNumber}</span>
               <span className="w-4 h-4 rounded-full bg-[var(--goa-pink)]"></span>
               <span className={`text-3xl font-bold tracking-widest uppercase ${textSecondaryClass}`}>{store.builderTitle}</span>
             </div>
          </div>

          <div className="absolute top-20 right-20 z-30">
             <div className={`bg-[var(--goa-yellow)] text-[var(--goa-ink)] w-40 h-40 rounded-full border-[8px] ${borderClass} flex items-center justify-center shadow-xl transform rotate-12`}>
                <span className="font-sans font-black text-6xl">गोवा</span>
             </div>
          </div>
        </>
      )}

      {/* --- LAYOUT 3: POLAROID --- */}
      {isPolaroid && (
        <>
          <div className={`absolute inset-0 border-[32px] ${borderClass} z-10 pointer-events-none mix-blend-overlay`}></div>
          
          <div className={`relative z-20 bg-white p-8 pb-32 shadow-2xl transform -rotate-3 border-[4px] border-gray-100`}>
            <div className="w-[650px] h-[650px] bg-gray-200 overflow-hidden">
              {store.croppedPhoto ? (
                <img src={store.croppedPhoto} className="w-full h-full object-cover grayscale-[20%] contrast-125" alt="" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center text-4xl text-gray-400 font-bold font-sans`}>PHOTO</div>
              )}
            </div>
            <div className="absolute bottom-8 left-12 right-12 flex justify-between items-center font-mono">
               <div>
                 <div className="text-gray-400 text-xl tracking-widest uppercase mb-1">HACKER HOUSE GOA</div>
                 <div className="text-[var(--goa-ink)] text-5xl font-bold uppercase">{store.firstName || 'BUILDER'}</div>
               </div>
               <div className="text-right">
                 <div className="text-gray-400 text-xl tracking-widest uppercase mb-1">{store.builderTitle}</div>
                 <div className="text-[var(--goa-pink)] text-5xl font-black">#{store.builderNumber}</div>
               </div>
            </div>
          </div>

          <div className="absolute top-16 left-16 z-30 opacity-90">
             <div className={`bg-[var(--goa-ink)] text-[var(--goa-yellow)] px-6 py-3 font-bold text-3xl transform -rotate-12`}>
               EST. 2026
             </div>
          </div>
          
          <div className="absolute bottom-16 right-16 z-30 opacity-90">
             <div className={`w-32 h-32 border-[8px] ${borderClass} rounded-full flex items-center justify-center text-[var(--goa-green)] text-6xl transform rotate-12 border-dashed backdrop-blur-sm bg-white/50`}>
               🌴
             </div>
          </div>
        </>
      )}

    </div>
  )
}
