import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSettings } from '../../redux/ducks/settings/selectors';

declare module '@mui/material/styles' {
  interface Theme {
    backgrounds: {
      offset: (factor: number) => string;
    };
    bookmarks: {
      fontColor: string;
      padding: string;
      adjustablePadding: (factor: number) => string;
    };
  }
  interface ThemeOptions {
    backgrounds?: {
      offset?: (factor: number) => string;
    };
    bookmarks?: {
      fontColor?: string;
      padding?: string;
      adjustablePadding?: (factor: number) => string;
    };
  }
}

interface AppThemeProviderProps {
  children?: JSX.Element;
}

export const getIndent = (factor: number): number => {
  return 0.8 * factor;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const settings = useSettings();
  const theme = createTheme({
    palette: {
      mode: settings.palette,
    },
    backgrounds: {
      offset: (factor) => {
        if (settings.palette === 'light') {
          return `rgba(0,0,0,${0.01 * factor})`;
        } else {
          return `rgba(18,18,18,${1 - 0.01 * (factor - 1)})`;
        }
      },
    },
    bookmarks: {
      padding: settings.padding,
      adjustablePadding: (factor: number) => `calc(${settings.padding} * ${factor})`,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
