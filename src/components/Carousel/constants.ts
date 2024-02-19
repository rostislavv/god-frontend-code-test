import { CarouselNavigationEnum, TCarouselResponsiveOptions  } from "./types";

export const DEFAULT_CAROUSEL_RESPONSIVE_OPTIONS: TCarouselResponsiveOptions = {
  untilM: {
    navigation: CarouselNavigationEnum.DOTS,
  },
  untilL: {
    navigation: CarouselNavigationEnum.DOTS,
  },
  untilXL: {
    navigation: CarouselNavigationEnum.ARROWS,
  },
  onlyXL: {
    navigation: CarouselNavigationEnum.ARROWS,
  }
}
