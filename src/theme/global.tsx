'use client'

import theme from "."

const globalStylesTheme = {
    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
    body: { fontFamily: 'Roboto, sans-serif', backgroundColor: theme.palette.background.default},
}

export { globalStylesTheme }