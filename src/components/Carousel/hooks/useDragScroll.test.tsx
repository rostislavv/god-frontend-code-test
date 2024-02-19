import React, { useRef} from 'react';
import { render, fireEvent  } from '@/test-utils'
import { useDragScroll } from './useDragScroll'; // Adjust the import path as necessary

export const DummyComponent = ({offset, updateOffset }: any) => {
  const containerRef = useRef(null);

  const { eventHandlers } = useDragScroll({
    offset,
    containerRef,
    updateOffset,
    roundUpToTile: num => num,
  });

  return (
    <div
      ref={containerRef}
      {...eventHandlers}
      style={{ width: '100px', height: '100px' }}
    >
      Drag Me
    </div>
  );
};

describe('useDragScroll hook via DummyComponent', () => {
  let updateOffsetMock: any;
  let roundUpToTileMock: any;

  beforeEach(() => {
    updateOffsetMock = jest.fn();
    roundUpToTileMock = jest.fn(offset => offset);
  });

  it('handles drag events correctly', () => {
    const { getByText } = render(
      <DummyComponent
        offset={0}
        updateOffset={updateOffsetMock}
        roundUpToTile={roundUpToTileMock}
      />
    );

    const draggableElement = getByText('Drag Me');

    fireEvent.mouseDown(draggableElement, { clientX: 100 });
    fireEvent.mouseMove(draggableElement, { clientX: 150 });
    fireEvent.mouseUp(draggableElement);

    expect(updateOffsetMock).toHaveBeenCalled();
  });

  it('handles touch drag events correctly', () => {
    const { getByText } = render(
      <DummyComponent
        offset={0}
        updateOffset={updateOffsetMock}
        roundUpToTile={roundUpToTileMock}
      />
    );

    const draggableElement = getByText('Drag Me');

    fireEvent.touchStart(draggableElement, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(draggableElement, { touches: [{ clientX: 150 }] });
    fireEvent.touchEnd(draggableElement);

    expect(updateOffsetMock).toHaveBeenCalled();
  });
});

