import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AppShell, Aside, Header, MantineProvider } from "@mantine/core";
import PostsContextProvider from "../src/providers/PostsContextProvider";
import {
    NavHeader,
    RouterTransition,
    TableOfContents,
} from "../src/components";
import { SessionProvider } from "next-auth/react";
import { Poppins, Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Notifications } from "@mantine/notifications";

const poppins = Poppins({
    variable: "--poppins",
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const montserrat = Montserrat({
    variable: "--montserrat",
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
    const paths = usePathname().split("/");
    const [tocShown, setTocShown] = useState(false);

    useEffect(() => {
        setTocShown(paths.includes("posts") && paths.length === 3);
    }, [paths]);

    return (
        <SessionProvider>
            <PostsContextProvider>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{ colorScheme: "dark" }}
                >
                    <AppShell
                        padding="md"
                        className={`${poppins.variable} ${montserrat.variable}`}
                        header={
                            <Header
                                style={{
                                    display: "flex",
                                }}
                                height={60}
                            >
                                <NavHeader />
                            </Header>
                        }
                        aside={
                            tocShown ? (
                                <Aside
                                    p="md"
                                    hiddenBreakpoint="sm"
                                    width={{ sm: 200, lg: 300 }}
                                >
                                    <TableOfContents />
                                </Aside>
                            ) : undefined
                        }
                    >
                        <RouterTransition />
                        <Component {...pageProps} />
                        <Notifications />
                    </AppShell>
                </MantineProvider>
            </PostsContextProvider>
        </SessionProvider>
    );
}
