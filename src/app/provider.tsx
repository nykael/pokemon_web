import theme from "@/theme";
import { globalStylesTheme } from "@/theme/global";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function Provider({ children }: Props) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalStylesTheme} />
            {children}
        </ThemeProvider>
    );
}