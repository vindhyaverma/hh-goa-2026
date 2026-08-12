import { TemplateConfig } from './types'

export const TEMPLATES: TemplateConfig[] = [
  // --- BOARDING PASSES (7) ---
  {
    id: 'bp-01',
    category: 'boarding-pass',
    name: 'CLASSIC GOA AIR',
    theme: {
      backgroundClass: 'bg-[var(--goa-paper)]',
      textPrimaryClass: 'text-[var(--goa-ink)]',
      textSecondaryClass: 'text-[var(--goa-green-light)]',
      accentClass: 'text-[var(--goa-pink)]',
      borderClass: 'border-[var(--goa-green)]',
      textureClass: 'texture-grain'
    },
    assets: {
      backgrounds: ['/assets/goa/palms/palm1.jpg'],
      decorations: ['/assets/goa/sun/sun1.jpg']
    }
  },
  {
    id: 'bp-02',
    category: 'boarding-pass',
    name: 'RETRO INDIAN RAIL',
    theme: {
      backgroundClass: 'bg-[var(--goa-yellow)]',
      textPrimaryClass: 'text-[var(--goa-ink)]',
      textSecondaryClass: 'text-[var(--goa-green-dark)]',
      accentClass: 'text-[var(--goa-pink)]',
      borderClass: 'border-[var(--goa-ink)]',
      textureClass: 'texture-grain'
    },
    assets: { backgrounds: [], decorations: ['/assets/goa/scooters/scooter1.jpg'] }
  },
  {
    id: 'bp-03',
    category: 'boarding-pass',
    name: 'COASTAL EXPRESS',
    theme: {
      backgroundClass: 'bg-[var(--goa-cream)]',
      textPrimaryClass: 'text-[var(--goa-ink)]',
      textSecondaryClass: 'text-[var(--goa-green-light)]',
      accentClass: 'text-[var(--goa-green)]',
      borderClass: 'border-[var(--goa-pink)]',
    },
    assets: { backgrounds: ['/assets/goa/v2/beach_azure.jpg'], decorations: [] }
  },
  {
    id: 'bp-04',
    category: 'boarding-pass',
    name: 'MONSOON AIR',
    theme: {
      backgroundClass: 'bg-[var(--goa-green-dark)]',
      textPrimaryClass: 'text-[var(--goa-cream)]',
      textSecondaryClass: 'text-[var(--goa-yellow)]',
      accentClass: 'text-[var(--goa-pink)]',
      borderClass: 'border-[var(--goa-yellow)]',
    },
    assets: { backgrounds: ['/assets/goa/v2/night_fireflies.jpg'], decorations: [] }
  },
  {
    id: 'bp-05',
    category: 'boarding-pass',
    name: 'SUNSET BOARDING',
    theme: {
      backgroundClass: 'bg-[#FF6B6B]',
      textPrimaryClass: 'text-[var(--goa-cream)]',
      textSecondaryClass: 'text-[var(--goa-yellow)]',
      accentClass: 'text-[var(--goa-ink)]',
      borderClass: 'border-[var(--goa-cream)]',
    },
    assets: { backgrounds: ['/assets/goa/v2/beach_sunset.jpg'], decorations: [] }
  },
  {
    id: 'bp-06',
    category: 'boarding-pass',
    name: 'VINTAGE PASSPORT',
    theme: {
      backgroundClass: 'bg-[var(--goa-ink)]',
      textPrimaryClass: 'text-[var(--goa-cream)]',
      textSecondaryClass: 'text-[var(--goa-green-light)]',
      accentClass: 'text-[var(--goa-yellow)]',
      borderClass: 'border-[var(--goa-green)]',
    },
    assets: { backgrounds: ['/assets/goa/v2/palm_neon.jpg'], decorations: [] }
  },
  {
    id: 'bp-07',
    category: 'boarding-pass',
    name: 'BUILDER AIRWAYS',
    theme: {
      backgroundClass: 'bg-[var(--goa-green)]',
      textPrimaryClass: 'text-[var(--goa-cream)]',
      textSecondaryClass: 'text-[var(--goa-pink)]',
      accentClass: 'text-[var(--goa-yellow)]',
      borderClass: 'border-[var(--goa-ink)]',
    },
    assets: { backgrounds: ['/assets/goa/houses/house1.jpg'], decorations: [] }
  },

  // --- POSTERS (7) ---
  { id: 'pos-01', category: 'poster', name: 'GOA SUNSET', theme: { backgroundClass: 'bg-[#FF6B6B]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-yellow)]', accentClass: 'text-[var(--goa-ink)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/v2/beach_sunset.jpg'], decorations: [] } },
  { id: 'pos-02', category: 'poster', name: 'PALM CITY', theme: { backgroundClass: 'bg-[var(--goa-green)]', textPrimaryClass: 'text-[var(--goa-yellow)]', textSecondaryClass: 'text-[var(--goa-cream)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-yellow)]' }, assets: { backgrounds: ['/assets/goa/v2/palm_neon.jpg'], decorations: [] } },
  { id: 'pos-03', category: 'poster', name: 'BUILD BY THE SEA', theme: { backgroundClass: 'bg-[var(--goa-cream)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-green)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-green)]' }, assets: { backgrounds: ['/assets/goa/v2/beach_azure.jpg'], decorations: [] } },
  { id: 'pos-04', category: 'poster', name: 'GOA NIGHT', theme: { backgroundClass: 'bg-[var(--goa-ink)]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-green-light)]', accentClass: 'text-[var(--goa-yellow)]', borderClass: 'border-[var(--goa-pink)]' }, assets: { backgrounds: ['/assets/goa/v2/night_fireflies.jpg'], decorations: [] } },
  { id: 'pos-05', category: 'poster', name: 'PORTUGUESE QUARTER', theme: { backgroundClass: 'bg-[var(--goa-yellow)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-pink)]', accentClass: 'text-[var(--goa-green)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/houses/house1.jpg'], decorations: [] } },
  { id: 'pos-06', category: 'poster', name: 'COASTAL HACKER', theme: { backgroundClass: 'bg-[var(--goa-green-dark)]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-pink)]', accentClass: 'text-[var(--goa-yellow)]', borderClass: 'border-[var(--goa-green-light)]' }, assets: { backgrounds: ['/assets/goa/scooters/scooter1.jpg'], decorations: [] } },
  { id: 'pos-07', category: 'poster', name: 'TROPICAL BUILDER', theme: { backgroundClass: 'bg-[var(--goa-paper)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-green)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/palms/palm1.jpg'], decorations: [] } },

  // --- BUILDER IDs (7) ---
  { id: 'id-01', category: 'builder-id', name: 'CLASSIC BUILDER', theme: { backgroundClass: 'bg-[var(--goa-cream)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-green-light)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/sun/sun1.jpg'], decorations: [] } },
  { id: 'id-02', category: 'builder-id', name: 'GOA PASSPORT', theme: { backgroundClass: 'bg-[var(--goa-ink)]', textPrimaryClass: 'text-[var(--goa-yellow)]', textSecondaryClass: 'text-[var(--goa-pink)]', accentClass: 'text-[var(--goa-cream)]', borderClass: 'border-[var(--goa-yellow)]' }, assets: { backgrounds: ['/assets/goa/v2/palm_neon.jpg'], decorations: [] } },
  { id: 'id-03', category: 'builder-id', name: 'TROPICAL BADGE', theme: { backgroundClass: 'bg-[var(--goa-green)]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-yellow)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-cream)]' }, assets: { backgrounds: ['/assets/goa/v2/beach_azure.jpg'], decorations: [] } },
  { id: 'id-04', category: 'builder-id', name: 'CREATIVE VISA', theme: { backgroundClass: 'bg-[var(--goa-yellow)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-green)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/scooters/scooter1.jpg'], decorations: [] } },
  { id: 'id-05', category: 'builder-id', name: 'BUILDER LICENSE', theme: { backgroundClass: 'bg-[var(--goa-paper)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-pink)]', accentClass: 'text-[var(--goa-green-dark)]', borderClass: 'border-[var(--goa-green-dark)]' }, assets: { backgrounds: ['/assets/goa/palms/palm1.jpg'], decorations: [] } },
  { id: 'id-06', category: 'builder-id', name: 'GOA MEMBER CARD', theme: { backgroundClass: 'bg-[var(--goa-green-dark)]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-green-light)]', accentClass: 'text-[var(--goa-yellow)]', borderClass: 'border-[var(--goa-pink)]' }, assets: { backgrounds: ['/assets/goa/houses/house1.jpg'], decorations: [] } },
  { id: 'id-07', category: 'builder-id', name: 'HACKER CLUB CARD', theme: { backgroundClass: 'bg-black', textPrimaryClass: 'text-white', textSecondaryClass: 'text-[var(--goa-pink)]', accentClass: 'text-[var(--goa-yellow)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/v2/night_fireflies.jpg'], decorations: [] } },

  // --- PFPs (7) ---
  { id: 'pfp-01', category: 'pfp', name: 'VINTAGE HOUSE', theme: { backgroundClass: 'bg-[var(--goa-green)]', textPrimaryClass: 'text-[var(--goa-yellow)]', textSecondaryClass: 'text-[var(--goa-cream)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-yellow)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_hacker_house.jpg'], decorations: [] } },
  { id: 'pfp-02', category: 'pfp', name: 'RETRO BEACH', theme: { backgroundClass: 'bg-[#FF6B6B]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-yellow)]', accentClass: 'text-[var(--goa-ink)]', borderClass: 'border-[var(--goa-cream)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_sunset_beach.jpg'], decorations: [] } },
  { id: 'pfp-03', category: 'pfp', name: 'NIGHT CODING', theme: { backgroundClass: 'bg-[var(--goa-ink)]', textPrimaryClass: 'text-[var(--goa-pink)]', textSecondaryClass: 'text-[var(--goa-cream)]', accentClass: 'text-[var(--goa-yellow)]', borderClass: 'border-[var(--goa-pink)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_hacker_house.jpg'], decorations: [] } },
  { id: 'pfp-04', category: 'pfp', name: 'PALM SUNSET', theme: { backgroundClass: 'bg-[var(--goa-green-dark)]', textPrimaryClass: 'text-[var(--goa-cream)]', textSecondaryClass: 'text-[var(--goa-yellow)]', accentClass: 'text-[var(--goa-green-light)]', borderClass: 'border-[var(--goa-green)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_sunset_beach.jpg'], decorations: [] } },
  { id: 'pfp-05', category: 'pfp', name: 'GOA POSTAGE', theme: { backgroundClass: 'bg-[var(--goa-yellow)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-pink)]', accentClass: 'text-[var(--goa-green)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_hacker_house.jpg'], decorations: [] } },
  { id: 'pfp-06', category: 'pfp', name: 'TROPICAL CLUB', theme: { backgroundClass: 'bg-[var(--goa-cream)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-[var(--goa-green)]', accentClass: 'text-[var(--goa-pink)]', borderClass: 'border-[var(--goa-green)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_sunset_beach.jpg'], decorations: [] } },
  { id: 'pfp-07', category: 'pfp', name: 'HACKER CREST', theme: { backgroundClass: 'bg-gradient-to-br from-[var(--goa-pink)] to-[var(--goa-yellow)]', textPrimaryClass: 'text-[var(--goa-ink)]', textSecondaryClass: 'text-white', accentClass: 'text-[var(--goa-ink)]', borderClass: 'border-[var(--goa-ink)]' }, assets: { backgrounds: ['/assets/goa/v2/vector_hacker_house.jpg'], decorations: [] } }
]
