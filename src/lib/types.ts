export type TemplateCategory = 'boarding-pass' | 'poster' | 'builder-id' | 'pfp'

export interface TemplateConfig {
  id: string
  category: TemplateCategory
  name: string
  theme: {
    backgroundClass: string
    textPrimaryClass: string
    textSecondaryClass: string
    accentClass: string
    borderClass: string
    textureClass?: string
  }
  assets: {
    backgrounds: string[]
    decorations: string[]
  }
}
