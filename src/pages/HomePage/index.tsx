import React, {useState} from "react";
import { View } from "vcc-ui";
import { useCars } from "@/hooks/useCars";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { CarListPreview } from "./components/CarListPreview";
import { CarSearch } from './components/CarSearch';

export const HomePage = () => {
  const { isLoading, cars: originalCars } = useCars();

  const [cars, setCars] = useState(originalCars)

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      <Header/>
      <View
        extend={{
          padding: 0,
          overflowX: 'hidden',
          untilL: {
            width: '100vw',
            paddingLeft: 5,
            paddingRight: 5
          },
          fromL: {
            width: '64vw',
            margin: '0 auto'
          }
        }}>
        <CarSearch originalCars={originalCars} setCars={setCars}/>
        <CarListPreview cars={cars.length === 0 ? originalCars: cars} />
      </View>
    </View>
  );
}
