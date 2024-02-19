import { ThemeBreakpointName } from "vcc-ui/dist/types/shared";

export enum CarouselNavigationEnum {
    ARROWS = 'ARROWS',
    DOTS = 'DOTS',
}

export interface ICarouselResponsiveOptions {
    navigation: CarouselNavigationEnum;
}

export type TCarouselResponsiveOptions = {
    [key in ThemeBreakpointName]?: ICarouselResponsiveOptions;
}
