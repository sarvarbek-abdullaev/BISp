import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        white: "#FFFFFF",
        mainBackground: "#202020",
        twilightMeadow: {
            primary: "#50A6A2",
            alt: "#50A6A240",
        },
        bondi: {
            primary: "#166887",
            alt: "#16688759",
        },
        calvary: {
            primary: "#404C5C",
            alt: "#404C5C14",
        },
        exception: {
            primary: "#F2542D",
            alt: "#FE938C",
        },
        notification: {
            primary: "#FEB95F",
            alt: "#FEB95F59",
        },
    },
});

export { theme };
