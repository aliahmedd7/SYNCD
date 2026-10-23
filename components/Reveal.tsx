'use client'

import { useEffect, useRef } from 'react'

/**
 * Wraps children and reveals each direct child with a staggered fade/scale
 * as it scrolls into view. Honors prefers-reduced-motion (via the .reveal CSS).
 */
export default function Reveal({
  children,
  className,
  stagger = 70,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  as?: 'div' | 'section' | 'ul'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = Array.from(root.children) as HTMLElement[]
    items.forEach((el, i) => {
      el.classList.add('reveal')
      el.style.transitionDelay = `${i * stagger}ms`
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [stagger])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
