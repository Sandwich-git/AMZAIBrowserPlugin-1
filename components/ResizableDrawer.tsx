import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import React, { forwardRef, useCallback, useEffect, useState } from "react"
import { Resizable, type ResizeCallbackData } from "react-resizable"

interface ResizableDrawerProps {
  children: React.ReactNode
  isOpen: boolean
  toggleDrawer: () => void
  minWidth?: number
  maxWidth?: number
  initialWidth?: number
}

// 定义 ResizeHandle 的 props 类型
interface ResizeHandleProps {
  handleAxis: "x" | "y"
  isDragging: boolean
}

// 使用 React.forwardRef 并添加泛型参数 <HTMLDivElement, ResizeHandleProps>
const ResizeHandle = forwardRef<HTMLDivElement, ResizeHandleProps>(
  (props, ref) => {
    const { handleAxis, isDragging, ...restProps } = props // 使用结构分离 handleAxis 和剩余 props

    return (
      <div
        ref={ref}
        {...restProps}
        className={`handle-${handleAxis} absolute top-0 left-0 w-1 h-full cursor-ew-resize box-border z-[99] select-none bg-border hover:bg-gray-400/50 transition-colors ${isDragging ? "bg-gray-400/50" : ""}`}></div>
    )
  }
)

export const ResizableDrawer: React.FC<ResizableDrawerProps> = ({
  children,
  isOpen,
  toggleDrawer,
  minWidth = 360,
  maxWidth: propMaxWidth = 0,
  initialWidth = 460
}) => {
  const [width, setWidth] = useState(initialWidth)
  const [maxWidth, setMaxWidth] = useState(propMaxWidth)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (propMaxWidth === 0) {
      const handleResize = () => {
        const maxWidth = document.documentElement.clientWidth
        setMaxWidth(maxWidth)
        if (width > maxWidth) {
          setWidth(maxWidth)
        }
      }

      handleResize()

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [propMaxWidth, width])

  const onResize = useCallback(
    (event: React.SyntheticEvent, size: ResizeCallbackData) => {
      const newWidth =
        window.innerWidth - (event as unknown as MouseEvent).clientX
      if (newWidth > minWidth && newWidth < maxWidth) {
        setWidth(newWidth)
      }
    },
    [minWidth, maxWidth]
  )

  return (
    <div
      className={`fixed top-0 right-0 h-full shadow-[0_0_15px_rgba(0,0,0,0.1),_0_0_6px_rgba(0,0,0,0.05)] border-r border-gray-200 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
      {isOpen ? (
        <button
          className="btn btn-square btn-xs z-[100] ml-1 absolute -left-3 top-1/2 -translate-y-1/2 transform-none"
          onClick={() => {
            toggleDrawer()
          }}>
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      ) : (
        <button
          className="btn btn-square btn-xs z-[100] absolute -left-3.5 top-1/2 -translate-y-1/2 transform-none"
          onClick={() => {
            toggleDrawer()
          }}>
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      )}

      <Resizable
        width={width}
        height={window.innerHeight}
        handle={<ResizeHandle handleAxis="x" isDragging={isDragging} />}
        minConstraints={[minWidth, window.innerHeight]}
        onResize={onResize}
        onResizeStart={() => {
          setIsDragging(true)
        }}
        onResizeStop={() => {
          setIsDragging(false)
        }}
        resizeHandles={["e"]}
        axis="x">
        <div
          style={{
            width: `${width}px`,
            height: "100%"
          }}
          className="relative shadow-lg bg-base-200 text-base-content overflow-hidden h-full p-0 flex flex-col rounded-l-xl">
          {children}
        </div>
      </Resizable>
    </div>
  )
}

ResizableDrawer.displayName = "ResizableDrawer"
