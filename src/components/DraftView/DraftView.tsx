import { ActionIcon, Box, CopyButton, Modal, Tooltip } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
    duotoneLight as light,
    nightOwl as dark,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
// import UIThemeContext from "../../context/UIThemeContext";
import { BlogEntry } from "../../types";
import styles from "./DraftView.module.scss";

interface DraftViewProps {
    blog: BlogEntry;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DraftView(props: DraftViewProps): React.ReactElement {
    const { blog, open, setOpen } = props;
    // const { theme } = useContext(UIThemeContext);

    return (
        <Modal
            className={styles.modal}
            opened={open}
            onClose={() => setOpen(false)}
            title="View Draft"
            size="70%"
        >
            <Box>
                <article>
                    <ReactMarkdown
                        // children={content}
                        className={styles.markdown}
                        components={{
                            code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                            }) {
                                const match = /language-(\w+)/.exec(
                                    className || ""
                                );
                                return !inline && match ? (
                                    <Box className={styles.codeDiv}>
                                        <CopyButton
                                            value={String(children).replace(
                                                /\n$/,
                                                ""
                                            )}
                                        >
                                            {({ copied, copy }) => (
                                                <Tooltip
                                                    label={
                                                        copied
                                                            ? "Copied"
                                                            : "Copy"
                                                    }
                                                    withArrow
                                                    position="right"
                                                    color={"bg.7"}
                                                >
                                                    <ActionIcon
                                                        color={
                                                            copied
                                                                ? "teal"
                                                                : "gray"
                                                        }
                                                        onClick={copy}
                                                        className={
                                                            styles.button
                                                        }
                                                    >
                                                        {copied ? (
                                                            <IconCheck
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <IconCopy
                                                                size={16}
                                                            />
                                                        )}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                        <SyntaxHighlighter
                                            // @ts-ignore
                                            style={dark}
                                            language={match[1]}
                                            PreTag="div"
                                            className={styles.codeBlock}
                                            {...props}
                                        >
                                            {String(children).replace(
                                                /\n$/,
                                                ""
                                            )}
                                        </SyntaxHighlighter>
                                    </Box>
                                ) : (
                                    <code
                                        className={styles.codeLine}
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                            h2({ node, className, children, ...props }) {
                                return (
                                    <h2
                                        id={String(children)
                                            .replace(
                                                /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
                                                ""
                                            )
                                            .trim()
                                            .replace(/\s+/g, "-")
                                            .toLowerCase()}
                                    >
                                        {children}
                                    </h2>
                                );
                            },
                            img({ node, className, children, ...props }) {
                                return (
                                    <Box
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <img
                                            src={
                                                (node?.properties
                                                    ?.src as string) || ""
                                            }
                                            alt={
                                                (node?.properties
                                                    ?.alt as string) || ""
                                            }
                                            style={{
                                                maxHeight: "500px",
                                                maxWidth: "70%",
                                            }}
                                            className={styles.image}
                                            {...props}
                                        />
                                    </Box>
                                );
                            },
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </article>
            </Box>
        </Modal>
    );
}
