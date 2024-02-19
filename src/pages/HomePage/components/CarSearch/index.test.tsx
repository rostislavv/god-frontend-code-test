import React from 'react';
import { render, fireEvent } from '@/test-utils';
import { CarSearch } from '.'; // Adjust the import path as necessary

jest.mock('vcc-ui', () => ({
  ...jest.requireActual('vcc-ui'),
  useTheme: () => ({
    color: {
      foreground: {
        primary: 'black',
        secondary: 'grey'
      }
    }
  }),
}));

describe('CarSearch', () => {
  const originalCars: any = [
    { id: '1', name: 'Car 1', bodyType: 'SUV', modelName: 'Model S', modelType: 'Electric' },
    { id: '2', name: 'Car 2', bodyType: 'Sedan', modelName: 'Model X', modelType: 'Electric' }
  ];
  const setCarsMock = jest.fn();

  it('renders correctly and allows filter selection', () => {
    const { getByText } = render(<CarSearch originalCars={originalCars} setCars={setCarsMock} />);

    expect(getByText(`All: (${originalCars.length})`)).toBeInTheDocument();

    fireEvent.click(getByText(`All: (${originalCars.length})`));
    expect(setCarsMock).toHaveBeenCalledWith(originalCars);

    setCarsMock.mockClear();

    fireEvent.click(getByText('SUV: (1)'));
    expect(setCarsMock).toHaveBeenCalled();
  });

  it('changes text color based on active filter', async () => {
    const { getByText } = render(<CarSearch originalCars={originalCars} setCars={setCarsMock} />);

    expect(getByText(`All: (${originalCars.length})`)).toHaveStyle(`color: black`);

    fireEvent.click(getByText('SUV: (1)'));
    expect(getByText('SUV: (1)')).toHaveStyle(`color: black`);
    expect(getByText(`All: (${originalCars.length})`)).toHaveStyle(`color: grey`);
  });
});

