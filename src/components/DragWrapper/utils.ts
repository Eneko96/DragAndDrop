import React from "react";
interface IProps {
  child: React.RefObject<HTMLElement>,
  mouse: React.MouseEvent<HTMLDivElement>
}

export const _inBoundaries = ({child, mouse}:IProps) => {
  const { clientX: x, clientY: y } = mouse
  const childBoudaries = child.current?.getBoundingClientRect()
  const { left, right, top, bottom } = childBoudaries as DOMRect

  const inAxisX = x > left && x < right
  const inAxisY = y > top && y < bottom

  if (inAxisX && inAxisY) return true
  return false
}