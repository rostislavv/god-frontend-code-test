import { useCallback } from 'react';

interface Args {
  offset: number,
  containerRef: React.RefObject<HTMLDivElement>,
  updateOffset: (offset: number) => void,
  getMaxOffset: () => number,
  move: (direction: "L" | "R") => () => void,
  itemsCount: number
}

export const useFocusScroll = ({
  offset,
  containerRef,
  updateOffset,
  getMaxOffset,
  move,
  itemsCount
}: Args) => {
  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const container = containerRef.current!;
    const tile = event.target;

    // take into account current offset
    const visibleLeft = offset + container.scrollLeft;
    const visibleRight = offset + visibleLeft + container.offsetWidth;

    const tileLeft = tile.offsetLeft; // round up to general tile use as pointer for L
    const tileRight = tileLeft + tile.offsetWidth; // use as pointer for R

    // Determine if the tile is fully visible
    if (tileLeft < visibleLeft) {
      if(Math.floor(offset) === Math.floor(getMaxOffset())) {
        // special case - if we've scrolled to end, and hit first tab on page - move to beginnig
        updateOffset(0)
      } else {
      // Tile is off to the left, scroll it into view
        move('L')()
      }
    } else if (tileRight > (visibleRight / 2)) {
      // Tile is off to the right, scroll it into view
      if(tileRight < visibleRight) {
        move('R')()
      } else {
        // special case - if we've clicked on buttons, and then Shift+Tab
        const tileWidth = containerRef?.current?.children[0]?.getBoundingClientRect().width ?? 0;
        const numberOfTiles = itemsCount;
        // the last one should be visible
        updateOffset(tileWidth * (numberOfTiles - 1))
      }
    }
  }, [containerRef, offset, updateOffset, move, itemsCount, getMaxOffset]);;

  return { handleFocus };
};

