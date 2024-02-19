import { ThemeBreakpointName } from "vcc-ui/dist/types/shared";

export class ThemeService {

  public static extractThemeBreakpoint(width: number): ThemeBreakpointName | never {
    switch (true) {
      case width < 480:
        return 'untilM';
      case width < 1024:
        return 'untilL';
      case width < 1600:
        return 'untilXL';
      case width >= 1600:
        return 'onlyXL';
    }

    throw new Error('No such dimension');
  }
}
