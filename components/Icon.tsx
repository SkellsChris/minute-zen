import { SVGProps } from 'react'

export type IconName =
  | 'lotus'
  | 'mind'
  | 'sleep'
  | 'focus'
  | 'mobility'
  | 'breath'
  | 'spark'
  | 'arrow-up-right'

export default function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  switch (name) {
    case 'lotus':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 3c-2 3-5 4-5 8a5 5 0 0 0 10 0c0-4-3-5-5-8z" />
          <path d="M7 13c-2 1-3 2-3 4 0 2 2 4 8 4s8-2 8-4c0-2-1-3-3-4" />
        </svg>
      )
    case 'mind':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2 2" />
        </svg>
      )
    case 'sleep':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M6 14s1-4 6-4 6 4 6 4" />
          <path d="M9 14v1" />
          <path d="M15 14v1" />
          <path d="M4 6h5L4 11h5" />
        </svg>
      )
    case 'focus':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
        </svg>
      )
    case 'mobility':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 18l8-12 8 12" />
          <path d="M12 15l-3 4h6l-3-4z" />
        </svg>
      )
    case 'breath':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M3 12h6a4 4 0 0 1 4 4v5" />
          <path d="M21 12h-6a4 4 0 0 0-4 4v5" />
        </svg>
      )
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
        </svg>
      )
    case 'arrow-up-right':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )
  }
}
