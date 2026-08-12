import { create } from 'zustand'

export type TemplateType = 'boarding-pass' | 'poster' | 'builder-id' | 'pfp'
export type FrameColor = 'sunrise' | 'sunset' | 'midnight'
export type PhotoTreatment = 'color' | 'cool' | 'warm' | 'posterized' | 'night'

interface GeneratorState {
  firstName: string
  lastName: string
  role: string
  building: string
  xHandle: string
  website: string
  photo: string | null
  croppedPhoto: string | null
  generatedImage: string | null
  stack: string[]
  templateId: string
  frame: FrameColor
  photoTreatment: PhotoTreatment
  builderTitle: string
  builderNumber: string

  
  // Actions
  setField: (field: keyof Omit<GeneratorState, 'setField' | 'toggleStack'>, value: any) => void
  toggleStack: (tech: string) => void
}

const STACKS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Next.js', 
  'Node.js', 'Go', 'Rust', 'C++', 'Java', 'Swift', 'Flutter', 
  'Kotlin', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 
  'TensorFlow', 'PyTorch', 'Figma', 'Solidity', 'Web3', 'Ethereum',
  'UI/UX', 'Framer', 'Three.js', 'WebGL', 'GraphQL', 'Prisma', 'Tailwind'
]

export const generateBuilderNumber = () => {
  return Math.floor(100 + Math.random() * 899).toString()
}

const generateTitle = (role: string, stack: string[]): string => {
  const titles = [
    'CODE SHAMAN',
    'STACK SAILOR',
    'PIXEL PIRATE',
    'BYTE SURFER',
    'LOGIC NOMAD',
    'NODE NINJA',
    'SYNTAX MONK',
    'VIBE ENGINEER'
  ]
  if (role.toLowerCase().includes('design')) return 'PIXEL PIRATE'
  if (stack.includes('React') || stack.includes('Next.js')) return 'FRONTEND SHAMAN'
  if (stack.includes('Node.js') || stack.includes('PostgreSQL')) return 'BACKEND NOMAD'
  if (stack.includes('Python')) return 'AI SURFER'
  
  return titles[Math.floor(Math.random() * titles.length)]
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  firstName: '',
  lastName: '',
  role: '',
  building: '',
  xHandle: '',
  website: '',
  photo: null,
  croppedPhoto: null,
  generatedImage: null,
  stack: [],
  templateId: 'bp-01',
  frame: 'sunrise',
  photoTreatment: 'color',
  builderTitle: 'STACK SAILOR',
  builderNumber: '000',

  setField: (field, value) => set((state) => {
    const nextState = { ...state, [field]: value }
    if (field === 'role') {
       nextState.builderTitle = generateTitle(value as string, state.stack)
    }
    return nextState
  }),
  
  toggleStack: (tech) => set((state) => {
    let newStack = state.stack
    if (state.stack.includes(tech)) {
      newStack = state.stack.filter(t => t !== tech)
    } else if (state.stack.length < 3) {
      newStack = [...state.stack, tech]
    }
    return { 
      stack: newStack,
      builderTitle: generateTitle(state.role, newStack)
    }
  })
}))
