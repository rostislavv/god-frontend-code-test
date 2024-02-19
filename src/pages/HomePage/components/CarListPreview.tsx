import React from "react";
import { Carousel } from "@/components/Carousel";
import { CarTile } from "./CarTile";
import { EmptyResult } from "./EmptyResult";
import { ICar } from "@/types/Car";

export const CarListPreview = ({ cars = [] }: { cars: Array<ICar> }) => {
  const carouselItems = cars.map((car: ICar) => <CarTile key={car.id} car={car} /> ) ;

  return (
    <Carousel
      items={carouselItems}
      nextButtonLabel={'Next cars'}
      previousButtonLabel={'Previous cars'}
      onceEmpty={<EmptyResult />}
    />
  )
}
