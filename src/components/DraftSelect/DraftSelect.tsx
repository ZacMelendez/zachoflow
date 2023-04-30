import { ActionIcon, Box, Button, Divider, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { useContext, useState } from "react";
import PostsContext from "../../context/PostsContext";
import { BlogEntry, PostCategory } from "../../types";
import styles from "./DraftSelect.module.scss";

export default function DraftSelect() {
    const [open, setOpen] = useState<boolean>(false);
    const { activeDraft, setActiveDraft, drafts, removeDraft } =
        useContext(PostsContext);

    const deleteDraft = async (draft: BlogEntry) => {
        try {
            await fetch(
                process.env.NODE_ENV == "production"
                    ? `https://crgdo5agb5.execute-api.us-east-1.amazonaws.com/Prod/posts`
                    : "http://localhost:3001/posts",
                {
                    method: "DELETE",
                    body: JSON.stringify({
                        url: draft.url,
                    }),
                }
            );

            removeDraft(draft);

            notifications.show({
                title: "Draft Deletion Success",
                message: "Your draft was successfully deleted",
            });
        } catch (err) {
            notifications.show({
                title: "Draft Deletion Error",
                message:
                    "There was an error deleting your draft. Please check the console.",
            });
        }
    };

    return (
        <>
            <Box>
                <Divider my="xs" size="md" label="Drafts" />
                <Button onClick={() => setOpen(true)}>{"Select Draft"}</Button>
            </Box>
            <Modal
                className={styles.modal}
                opened={open}
                onClose={() => setOpen(false)}
                title="Select Draft"
            >
                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}
                >
                    {drafts.map((draft) => {
                        return (
                            <Box className={styles.draft} key={draft.id}>
                                <Box>
                                    <Text className={styles.title}>
                                        {draft.title}
                                    </Text>
                                    <Text className={styles.date}>
                                        {moment(draft.date).format(
                                            "MMMM DD, YYYY"
                                        )}
                                    </Text>
                                </Box>
                                <Box className={styles.actions}>
                                    <ActionIcon
                                        onClick={() => {
                                            deleteDraft(draft);
                                        }}
                                        disabled={draft.id === activeDraft.id}
                                        color={"primary"}
                                    >
                                        <IconTrash size={24} />
                                    </ActionIcon>
                                    <Button
                                        onClick={() => {
                                            setActiveDraft({
                                                ...draft,
                                                editing: true,
                                            });
                                            setOpen(false);
                                        }}
                                        disabled={draft.id === activeDraft.id}
                                    >
                                        {draft.id === activeDraft.id
                                            ? "Selected"
                                            : "Select"}
                                    </Button>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </Modal>
        </>
    );
}
