import { useQuery } from 'react-query';
import { ICar } from '@/types/Car';
import { CarsApi } from '@/api/cars';

export const useCars = () => {
  const { data, isLoading } = useQuery<ICar[]>('dataItems', CarsApi.getData);

  return { cars: data || [], isLoading };
};

