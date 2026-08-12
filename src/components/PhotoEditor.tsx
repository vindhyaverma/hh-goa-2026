import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'
import { getRotatedImage, getCroppedImg } from '@/lib/canvasUtils'

interface PhotoEditorProps {
  onCropComplete: (croppedUrl: string) => void
  aspect?: number
}

const readFile = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result as string), false)
    reader.readAsDataURL(file)
  })
}

export function PhotoEditor({ onCropComplete, aspect = 1 }: PhotoEditorProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // handle EXIF orientation if needed
      try {
        const orientation = await getOrientation(file)
        const rotated = await getRotatedImage(imageDataUrl, orientation)
        if (rotated) imageDataUrl = rotated
      } catch (e) {
        console.warn('Failed to read orientation', e)
      }

      setImageSrc(imageDataUrl)
    }
  }

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0)
      onCropComplete(croppedImage as string)
      setImageSrc(null)
    } catch (e) {
      console.error(e)
    }
  }

  if (!imageSrc) {
    return (
      <div className="w-full border-2 border-dashed border-[var(--goa-yellow)] p-8 text-center bg-[var(--goa-ink)] cursor-pointer hover:bg-[var(--goa-green-dark)] transition-colors relative">
        <input type="file" accept="image/*" onChange={onFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        <span className="text-[var(--goa-yellow)] font-bold uppercase">UPLOAD PHOTO</span>
        <p className="text-sm text-[var(--goa-cream)] mt-2 opacity-70">JPG, PNG, HEIC</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-64 bg-black border-2 border-[var(--goa-green)]">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={setZoom}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="range"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full accent-[var(--goa-pink)]"
        />
      </div>
      <div className="flex gap-4">
        <button onClick={() => setImageSrc(null)} className="flex-1 py-2 border-2 border-[var(--goa-pink)] text-[var(--goa-pink)] uppercase font-bold hover:bg-[var(--goa-pink)] hover:text-white">
          Cancel
        </button>
        <button onClick={handleApply} className="flex-1 py-2 bg-[var(--goa-yellow)] text-[var(--goa-ink)] border-2 border-[var(--goa-yellow)] uppercase font-bold shadow-[2px_2px_0px_var(--goa-ink)] hover:translate-x-[-1px] hover:translate-y-[-1px]">
          Apply Crop
        </button>
      </div>
    </div>
  )
}
