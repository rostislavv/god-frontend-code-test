import React, { useRef, useState, Children } from "react";
import { View, IconButton } from "vcc-ui";
import { useWindowResize } from "@/hooks/useWindowResize";
import { DEFAULT_CAROUSEL_RESPONSIVE_OPTIONS as breakpoints } from "./constants";
import { CarouselNavigationEnum } from "./types";
import { Dot } from './components/Dot';
import { useDragScroll } from './hooks/useDragScroll';
import { useFocusScroll } from './hooks/useFocusScroll'

export type Move = 'L' | 'R';

export const Carousel = ({
  items = [],
  previousButtonLabel,
  nextButtonLabel,
  onceEmpty = <></>
}: {
  items: Array<React.ReactElement>;
  previousButtonLabel: string;
  nextButtonLabel: string;
  onceEmpty?: React.ReactElement
}) => {

  const [offset, setOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const getTileWidth = () => containerRef?.current?.children[0]?.getBoundingClientRect().width ?? 0
  const numberOfTiles = items.length;
  const getMaxOffset = () => (getTileWidth() * numberOfTiles) - (containerRef.current?.clientWidth ?? 0);

  const updateOffset = (newOffset: number) => {
    // Constrain newOffset within the allowed range
    const constrainedOffset = Math.min(Math.max(newOffset, 0), getMaxOffset());
    setOffset(constrainedOffset);
  };

  const roundUpToTile = (num: number) =>  {
    const tileWidth = getTileWidth();
    const round = num / tileWidth;
    return ((round - Math.floor(round)) > 0.5 ? Math.ceil(round) : Math.floor(round)) * tileWidth;
  }

  const move = (direction: Move) => (_e?: any) => {
    const tileWidth = getTileWidth();
    const newOffset = direction === "L" ? offset - tileWidth : offset + tileWidth;
    updateOffset(newOffset)
  }


  const toTransform = (offset: number) => {
    return {
      transform: `translate3d(-${offset}px, 0, 0)`
    }
  }

  const { eventHandlers } = useDragScroll({offset, containerRef, updateOffset, roundUpToTile});
  const { handleFocus } = useFocusScroll({offset, containerRef, updateOffset, getMaxOffset, move, itemsCount: items.length});

  // on window resize we need to update offset to match new screen, otherwise
  // carousel will be jumping to start on resizes
  const windowSize = useWindowResize(() => {
    updateOffset(roundUpToTile(offset))
  });
  const showDots = breakpoints[windowSize.themeBreakpoint]!.navigation === CarouselNavigationEnum.DOTS;


  if (!items.length) {
    return onceEmpty;
  }

  return (
    <>
      <View
        ref={containerRef}
        marginBottom={5}
        direction={"row"}
        width={'100%'}
        extend={{ transition: '0.5s transform ease-out', ...toTransform(offset) }}

        {...eventHandlers}
      >
        { Children.map(items, (item) => (
          <div onFocus={handleFocus}>
            {item}
          </div>
        ))}
      </View>
      {showDots ? (
        <View direction={'row'} justifyContent={'center'}>
          {items.map((_, i) => (
            <Dot
              key={i}
              isActive={Math.floor( offset / getTileWidth()) === i}
            />))}
        </View>
      ) : (
        <>
          <View direction={'row'} spacing={1} justifyContent={'end'} marginRight={5} padding={0.5} >
            <IconButton
              aria-label={previousButtonLabel}
              iconName="navigation-chevronback"
              variant="outline"
              onClick={move("L")}
              disabled={offset <= 0}
            />
            <IconButton
              aria-label={nextButtonLabel}
              iconName="navigation-chevronforward"
              variant="outline"
              onClick={move("R")}
              disabled={offset !== 0 && Math.floor(offset) >= Math.floor(containerRef?.current?.getBoundingClientRect().width ?? 0)}
            />
          </View>
        </>
      )}
    </>
  );
}
