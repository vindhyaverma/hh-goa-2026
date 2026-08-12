import { useGeneratorStore } from '@/lib/store'
import { TemplateConfig } from '@/lib/types'

export function PosterCard({ config }: { config: TemplateConfig }) {
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
  const isTypographyHeavy = config.id === 'pos-01' || config.id === 'pos-04'
  const isSplit = config.id === 'pos-03' || config.id === 'pos-05'

  return (
    <div 
      id="export-node"
      className={`relative w-[1440px] h-[1920px] ${backgroundClass} flex flex-col items-center justify-between p-16 ${textureClass || 'texture-grain'} overflow-hidden`}
    >
      {/* Background Graphic */}
      <div className={`absolute inset-0 border-[40px] ${borderClass} z-10 pointer-events-none`}></div>
      
      {bgAsset && (
        <div className="absolute inset-0 z-0">
          <img 
            src={bgAsset} 
            className={`w-full h-full object-cover filter ${isTypographyHeavy ? 'brightness-50 grayscale' : 'opacity-80 mix-blend-luminosity'}`}
            alt="" 
          />
          <div className={`absolute inset-0 ${backgroundClass} opacity-40 mix-blend-color`}></div>
        </div>
      )}

      {/* Decorative Border Details */}
      <div className={`absolute top-16 left-16 w-16 h-16 border-t-[8px] border-l-[8px] ${borderClass} z-20`}></div>
      <div className={`absolute top-16 right-16 w-16 h-16 border-t-[8px] border-r-[8px] ${borderClass} z-20`}></div>
      <div className={`absolute bottom-16 left-16 w-16 h-16 border-b-[8px] border-l-[8px] ${borderClass} z-20`}></div>
      <div className={`absolute bottom-16 right-16 w-16 h-16 border-b-[8px] border-r-[8px] ${borderClass} z-20`}></div>

      {/* Header */}
      <div className="w-full text-center z-20 mt-4">
        <h2 className={`${textSecondaryClass} text-4xl font-mono tracking-[0.5em] mb-4 font-bold`}>{config.name}</h2>
        <h1 className={`font-serif text-[160px] leading-[0.8] uppercase tracking-tighter ${textPrimaryClass} mix-blend-difference`}>
          HACKER<br/><span className={`${accentClass} font-sans font-black tracking-normal mix-blend-normal`}>गोवा</span><br/>HOUSE
        </h1>
      </div>

      {/* Central Portrait Area */}
      <div className="z-20 w-full flex justify-center mt-6 mb-6">
        <div className={`relative w-[600px] h-[750px] rounded-t-[300px] overflow-hidden border-[16px] ${borderClass} shadow-2xl`}>
          {store.croppedPhoto ? (
             <img src={store.croppedPhoto} className="w-full h-full object-cover" alt="" />
          ) : (
             <div className={`w-full h-full bg-gray-200 border-8 border-dashed ${borderClass} flex items-center justify-center text-4xl text-gray-400 font-bold font-sans`}>PHOTO</div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full flex justify-between items-end z-20 mb-4 font-mono">
        <div className="max-w-[600px] bg-white/10 p-8 backdrop-blur-md rounded-2xl border-[4px] border-white/20">
          <div className={`${textSecondaryClass} text-2xl tracking-widest uppercase mb-2 font-black`}>{store.role || 'BUILDER'}</div>
          <div className={`${textPrimaryClass} text-6xl font-bold uppercase leading-tight break-words mix-blend-difference`}>
            {store.firstName || 'FIRST'} {store.lastName || 'LAST'}
          </div>
          <div className={`${textSecondaryClass} text-2xl tracking-widest mt-6 font-black`}>#{store.builderNumber} / {store.builderTitle}</div>
        </div>

        <div className="text-right">
          {store.stack.length > 0 && (
            <div className="flex flex-col gap-3 items-end">
              {store.stack.slice(0,4).map(tech => (
                <div key={tech} className={`bg-[var(--goa-ink)] text-white border-[4px] border-white px-6 py-2 text-2xl font-bold uppercase`}>
                  {tech}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
