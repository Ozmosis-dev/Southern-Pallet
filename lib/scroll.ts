import type { MouseEvent } from 'react'

export const scrollToSection = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  const targetId = e.currentTarget.getAttribute('href')?.slice(1)
  if (targetId) {
    const element = document.getElementById(targetId)
    if (element) {
      const headerOffset = 80 // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerOffset
      const startPosition = window.scrollY
      const distance = elementPosition - startPosition
      const duration = 1000 // Fast duration (1 second) for quick scroll
      let start: number

      const animation = (currentTime: number) => {
        if (!start) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)

        // Easing function for smoother animation
        const easeInOutCubic = (p: number): number => {
          return p < 0.5
            ? 4 * p * p * p
            : 1 - Math.pow(-2 * p + 2, 3) / 2
        }

        window.scrollTo({
          top: startPosition + distance * easeInOutCubic(progress)
        })

        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }
}
