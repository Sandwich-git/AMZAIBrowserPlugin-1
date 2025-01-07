import React from "react"

import { useDraggable, type DraggableProps } from "~/lib/hooks/use-draggable"

interface DraggableLabelProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    DraggableProps {
  htmlFor?: string
  children?: React.ReactNode
}

export const DraggableLabel: React.FC<DraggableLabelProps> = React.memo(
  ({ children, ...props }) => {
    const { ref, draggableProps } = useDraggable<HTMLLabelElement>(props)
    // console.log("DraggableLabel update")
    return (
      <label
        className="drawer-button btn shadow-md"
        ref={ref}
        {...draggableProps}
        {...props}>
        {children}
      </label>
    )
  }
)

DraggableLabel.displayName = "DraggableLabel"
