import { useGeneratorStore } from '@/lib/store'
import { TemplateConfig } from '@/lib/types'

export function BuilderIDCard({ config }: { config: TemplateConfig }) {
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
  const isLandscape = config.id === 'id-02' || config.id === 'id-05'

  return (
    <div 
      id="export-node"
      className={`relative w-[1350px] h-[1800px] ${backgroundClass} flex ${isLandscape ? 'flex-col-reverse' : 'flex-col'} items-center overflow-hidden border-[40px] ${borderClass} shadow-2xl ${textureClass || 'texture-grain'}`}
    >
      {/* Dynamic Backgrounds */}
      {bgAsset && (
        <div className="absolute inset-0 z-0 opacity-40">
           <img src={bgAsset} className="w-full h-full object-cover mix-blend-luminosity" alt="" />
        </div>
      )}

      {/* Decorative ID elements */}
      <div className={`absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[var(--goa-ink)]/20 to-transparent z-10 pointer-events-none`}></div>
      <div className={`absolute top-[40px] left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-[var(--goa-ink)] rounded-full z-20`}></div> {/* Lanyard Hole */}

      {/* Header */}
      <div className="z-20 w-full text-center mt-32 mb-16 px-16">
        <h2 className={`${textSecondaryClass} text-4xl font-mono tracking-widest font-bold uppercase mb-4`}>{config.name}</h2>
        <h1 className={`font-serif text-[100px] leading-none uppercase tracking-tighter ${textPrimaryClass}`}>
          HACKER <span className={`${accentClass} font-sans font-black tracking-normal`}>गोवा</span> HOUSE
        </h1>
      </div>

      {/* Portrait */}
      <div className="z-20 w-full flex justify-center mb-16">
        <div className={`relative w-[750px] h-[750px] border-[24px] ${borderClass} bg-white rounded-3xl overflow-hidden shadow-2xl transform rotate-1`}>
          {store.croppedPhoto ? (
             <img src={store.croppedPhoto} className="w-full h-full object-cover" alt="" />
          ) : (
             <div className={`w-full h-full bg-gray-200 border-8 border-dashed ${borderClass} flex items-center justify-center text-4xl text-gray-400 font-bold font-sans`}>PHOTO</div>
          )}
          {/* subtle scanline overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-50 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Details */}
      <div className="z-20 w-full flex-1 bg-white/90 backdrop-blur-md p-16 font-mono flex flex-col justify-between border-t-[16px] border-[var(--goa-ink)]">
        
        <div className="flex justify-between items-start mb-8">
           <div>
              <div className="text-[var(--goa-green)] text-3xl font-bold uppercase tracking-widest mb-2">Builder Name</div>
              <div className="text-[var(--goa-ink)] text-[70px] font-bold uppercase leading-none">
                {store.firstName || 'FIRST'} {store.lastName || 'LAST'}
              </div>
           </div>
           <div className="text-right">
              <div className="text-[var(--goa-pink)] text-3xl font-bold uppercase tracking-widest mb-2">ID Number</div>
              <div className="text-[var(--goa-ink)] text-[60px] font-bold font-serif leading-none">
                {store.builderNumber}
              </div>
           </div>
        </div>

        <div className="flex justify-between items-start mb-8">
           <div className="flex-1 pr-8">
              <div className="text-[var(--goa-green)] text-2xl font-bold uppercase tracking-widest mb-2">Role</div>
              <div className="text-[var(--goa-ink)] text-5xl font-bold uppercase leading-tight">
                {store.role || 'ROLE'}
              </div>
           </div>
           <div className="flex-1 border-l-[4px] border-dashed border-gray-300 pl-8">
              <div className="text-[var(--goa-green)] text-2xl font-bold uppercase tracking-widest mb-2">Class</div>
              <div className="text-[var(--goa-ink)] text-5xl font-bold uppercase leading-tight">
                {store.builderTitle}
              </div>
           </div>
        </div>

        {/* Stack */}
        {store.stack.length > 0 && (
          <div className="pt-8 border-t-[8px] border-[var(--goa-ink)]">
            <div className="text-[var(--goa-ink)] text-2xl font-bold uppercase tracking-widest mb-4">Core Stack</div>
            <div className="flex flex-wrap gap-4">
              {store.stack.map(tech => (
                <span key={tech} className="bg-[var(--goa-ink)] text-[var(--goa-yellow)] px-6 py-2 text-3xl font-bold uppercase">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div className="mt-8 flex justify-center opacity-50">
           <div className={`w-1/2 h-[8px] bg-[var(--goa-ink)] rounded-full`}></div>
        </div>

      </div>
    </div>
  )
}
