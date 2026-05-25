import { RefObject, useEffect, useRef } from "react"

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T>,
  RefObject<T>
] {
  const containerRef = useRef<T>(null)
  const endRef = useRef<T>(null)

  useEffect(() => {
    const container = containerRef.current
    const end = endRef.current

    if (container && end) {
      const observer = new MutationObserver(() => {
        // Only scroll to bottom if we are already near the bottom of the container
        const threshold = 100
        const isNearBottom =
          container.scrollHeight - container.scrollTop - container.clientHeight <
          threshold

        if (isNearBottom) {
          end.scrollIntoView({ behavior: "auto", block: "end" })
        }
      })

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })

      return () => observer.disconnect()
    }

    return undefined
  }, [])

  return [containerRef, endRef]
}
