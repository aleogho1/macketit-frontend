import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export const platforms = [
  {
    label: 'FACEBOOK',
    value: 'facebook',
  },
  // {
  //   label: 'WhatsApp',
  //   value: 'whatsapp',
  // },
  {
    label: 'TIKTOK',
    value: 'tiktok',
  },
  { label: 'INSTAGRAM', value: 'instagram' },
  { label: 'X', value: 'x' },
  // { label: 'Youtube', value: 'youtube' },
  { label: 'THREAD', value: 'thread' },
]
export const genders = [
  {
    label: 'All Gender',
    value: 'all gender',
  },
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
]

export const days = Array.from({ length: 31 }, (_, i) => i + 1)

export const months = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
]

export const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
)

export const generateVideoThumbnail = async (videoFile) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    video.src = URL.createObjectURL(videoFile)
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      const thumbnailUrl = canvas.toDataURL('image/jpeg')
      resolve(thumbnailUrl)
    })

    video.addEventListener('error', (error) => {
      reject(error)
    })

    video.load()
  })
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const fbplatforms = [
  {
    label: 'Facebook',
    value: 'facebook',
  },
]
export const waplatforms = [
  {
    label: 'WhatsApp',
    value: 'whatsapp',
  },
]
export const tkplatforms = [
  {
    label: 'TikTok',
    value: 'TikTok',
  },
]
export const threadPlatform = [
  {
    label: 'Thread',
    value: 'Thread',
  },
]
export const igplatforms = [{ label: 'Instagram', value: 'instagram' }]
export const twplatforms = [{ label: 'X', value: 'x' }]
export const ytplatforms = [{ label: 'Youtube', value: 'youtube' }]
