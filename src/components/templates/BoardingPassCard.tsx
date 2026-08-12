import { useGeneratorStore } from '@/lib/store'
import { TemplateConfig } from '@/lib/types'

export function BoardingPassCard({ config }: { config: TemplateConfig }) {
  const store = useGeneratorStore()
  
  // Theme destructuring
  const { 
    backgroundClass, 
    textPrimaryClass, 
    textSecondaryClass, 
    accentClass, 
    borderClass,
    textureClass 
  } = config.theme

  const bgAsset = config.assets.backgrounds[0]
  const decorAsset = config.assets.decorations[0]

  // Layout variations based on config ID
  const isDark = config.id === 'bp-04' || config.id === 'bp-06' || config.id === 'bp-07'

  return (
    <div 
      id="export-node"
      className={`relative w-[1600px] h-[1000px] ${backgroundClass} border-[32px] ${borderClass} flex flex-row font-mono ${textureClass || ''} overflow-hidden`}
    >
      {/* Background Image / Decor */}
      {bgAsset && (
        <img 
          src={bgAsset} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply pointer-events-none" 
          alt="" 
        />
      )}
      
      {decorAsset && (
         <img 
           src={decorAsset} 
           className="absolute top-1/2 left-1/2 w-[600px] opacity-15 transform -translate-x-1/2 -translate-y-1/2 rotate-12 pointer-events-none" 
           alt="" 
         />
      )}

      {/* Main Ticket Section */}
      <div className={`flex-1 flex flex-col p-16 relative`}>
        
        {/* Extra decorative density: Airlines Logo & Stamps */}
        <div className="absolute top-16 right-16 flex gap-4 opacity-70">
           <div className={`w-24 h-24 rounded-full border-[6px] ${borderClass} flex items-center justify-center text-4xl transform -rotate-12`}>✈</div>
           <div className={`w-24 h-24 rounded-full border-[4px] ${accentClass} flex items-center justify-center text-xl font-bold transform rotate-6 border-dashed`}>GOA</div>
        </div>

        {/* Header */}
        <div className={`flex justify-between items-start border-b-[8px] ${borderClass} pb-8 mb-12`}>
          <div>
            <h1 className={`font-serif text-8xl uppercase tracking-tighter ${textPrimaryClass} leading-none`}>
              Hacker <span className={`${accentClass} font-sans font-black tracking-normal`}>गोवा</span> House
            </h1>
            <p className={`text-4xl ${textSecondaryClass} font-bold tracking-widest mt-4`}>{config.name}</p>
          </div>
          <div className="text-right mt-4 mr-32">
             <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase`}>Departure</div>
             <div className={`text-4xl font-bold ${textPrimaryClass}`}>28 OCT 2026</div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-16 flex-1">
          <div className="space-y-12">
            <div>
              <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Passenger</div>
              <div className={`text-[56px] font-bold ${textPrimaryClass} leading-none uppercase break-words`}>
                {store.firstName || 'FIRST'} {store.lastName || 'LAST'}
              </div>
            </div>
            <div>
              <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Role</div>
              <div className={`text-4xl font-bold ${textPrimaryClass} uppercase break-words`}>
                {store.role || 'BUILDER'}
              </div>
            </div>
            <div>
              <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Building</div>
              <div className={`text-4xl font-bold ${textPrimaryClass} uppercase break-words max-w-[500px]`}>
                {store.building || 'THE FUTURE'}
              </div>
            </div>
          </div>
          
          <div className="space-y-12 relative">
            <div className="flex gap-16">
              <div>
                <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Flight</div>
                <div className={`text-6xl font-bold ${accentClass}`}>HH-26</div>
              </div>
              <div>
                <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Gate</div>
                <div className={`text-6xl font-bold ${textPrimaryClass}`}>G04</div>
              </div>
            </div>
            
            <div>
              <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Destination</div>
              <div className={`text-5xl font-bold ${textPrimaryClass} uppercase`}>
                GOA, INDIA
              </div>
            </div>

            {/* FIXED NO-STACK RULE: Only render stack section if there are stack items */}
            {store.stack.length > 0 && (
              <div>
                <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2`}>Tech Stack</div>
                <div className="flex flex-wrap gap-4 mt-4">
                   {store.stack.map(tech => (
                     <span key={tech} className={`bg-[var(--goa-ink)] text-white border-[4px] border-white px-4 py-2 text-2xl font-bold uppercase`}>
                       {tech}
                     </span>
                   ))}
                </div>
              </div>
            )}
            
            {/* Visual Density: map lines/decorative routing */}
            <div className={`absolute bottom-0 right-0 w-64 h-32 border-b-[4px] border-r-[4px] ${borderClass} opacity-30 rounded-br-[40px]`} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 flex justify-end items-end">
           <div className={`bg-[var(--goa-ink)] text-[var(--goa-yellow)] px-8 py-4 text-2xl font-bold tracking-widest uppercase rounded-tl-3xl`}>
             CLASS: {store.builderTitle}
           </div>
        </div>
      </div>

      {/* Stub Section */}
      <div className={`w-[450px] border-l-[8px] border-dashed ${borderClass} flex flex-col relative bg-[var(--goa-cream)]`}>
        
        {/* Profile Image */}
        <div className={`absolute top-16 right-16 z-20`}>
           <div className={`w-[260px] h-[320px] bg-white border-[8px] ${borderClass} p-4 shadow-[8px_8px_0px_var(--goa-ink)] transform rotate-6`}>
             {store.croppedPhoto ? (
                <img src={store.croppedPhoto} className="w-full h-full object-cover" alt="" />
             ) : (
                <div className={`w-full h-full bg-gray-200 border-4 border-dashed ${borderClass} flex items-center justify-center text-gray-400 font-sans font-bold`}>PHOTO</div>
             )}
           </div>
        </div>
        
        <div className={`mt-[420px] p-12 flex-1 flex flex-col`}>
          <div className="text-[var(--goa-green-light)] text-xl tracking-widest uppercase mb-1">Builder ID</div>
          <div className="text-6xl font-bold text-[var(--goa-ink)] mb-8">
            #{store.builderNumber}
          </div>
          
          <div className="text-[var(--goa-green-light)] text-xl tracking-widest uppercase mb-1">Passenger</div>
          <div className="text-3xl font-bold text-[var(--goa-ink)] uppercase break-words mb-8">
            {store.firstName || 'FIRST'} {store.lastName}
          </div>

          <div className="mt-auto">
             <div className="w-full h-[100px] bg-[var(--goa-ink)] flex items-center justify-center text-[var(--goa-yellow)]">
                <span className="font-sans font-black text-5xl tracking-widest">गोवा</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

