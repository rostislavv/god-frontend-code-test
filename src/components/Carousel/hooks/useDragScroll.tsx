import React, { useState, useCallback} from "react";

interface Args {
  offset: number,
  containerRef: React.RefObject<HTMLDivElement>,
  updateOffset: (offset: number) => void,
  roundUpToTile: (offset: number) => number
}

export const useDragScroll = ({
  offset,
  containerRef,
  updateOffset,
  roundUpToTile,
}: Args) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const startDragging = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartPosition(pageX - (containerRef.current?.offsetLeft ?? 0));
    setScrollStart(offset);
  }, [containerRef, offset]);

  const stopDragging = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      // to leave entire tile visible
      updateOffset(roundUpToTile(offset));
    }
  }, [isDragging, offset, updateOffset, roundUpToTile]);

  const onDrag = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();

    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - (containerRef.current?.offsetLeft ?? 0);
    const walk = (x - startPosition) * 2; // Scroll-fastness

    updateOffset(scrollStart - walk);
  }, [isDragging, startPosition, scrollStart, updateOffset, containerRef]);

  return {
    eventHandlers: {
      onMouseDown: startDragging,
      onMouseLeave: stopDragging,
      onMouseUp: stopDragging,
      onMouseMove: onDrag,

      onTouchStart: startDragging,
      onTouchMove: onDrag,
      onTouchEnd: stopDragging,
    },
  };
};
