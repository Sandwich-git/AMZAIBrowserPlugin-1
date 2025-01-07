import { useCallback, useEffect, useRef, useState } from "react"

export interface DraggableProps {
  initialTop?: number
  minTop?: number
  maxTop?: number
}

const DEFAULT_INITIAL_TOP = 500
const DEFAULT_MIN_TOP = 0
const DEFAULT_MAX_TOP =
  typeof window !== "undefined" ? window.innerHeight - 50 : 1000

export function useDraggable<T extends HTMLElement>({
  initialTop = DEFAULT_INITIAL_TOP,
  minTop = DEFAULT_MIN_TOP,
  maxTop = DEFAULT_MAX_TOP
}: DraggableProps = {}) {
  const [isDragging, setIsDragging] = useState(false)
  const topRef = useRef(initialTop)
  const dragRef = useRef(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    dragRef.current = true
    e.preventDefault() // 防止文本选择
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    dragRef.current = false
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current) return

      requestAnimationFrame(() => {
        const newTop = Math.max(minTop, Math.min(e.clientY, maxTop))
        topRef.current = newTop
        if (elementRef.current) {
          elementRef.current.style.transform = `translateY(${newTop}px)`
        }
      })
    },
    [minTop, maxTop]
  )

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const elementRef = useRef<T>(null)

  return {
    ref: elementRef,
    draggableProps: {
      onMouseDown: handleMouseDown,
      style: {
        position: "fixed" as const,
        top: "0",
        right: "0",
        transform: `translateY(${initialTop}px)`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none" as const,
        touchAction: "none" as const
      }
    }
  }
}
