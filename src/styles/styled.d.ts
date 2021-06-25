import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      black: string;
      shadow: string;
      purple: string;
      danger: string;

      grayDark: string;
      grayMedium: string;
      grayLight: string;

      whiteBackground: string;
      whiteDetails: string;

      pinkDark: string;
      pinkLight: string;

      hoverPurple: string;
      hoverDanger: string;
      hoverGrayMedium: string;
      hoverGrayLight: string;
    };
  }
}
