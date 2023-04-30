import {
    Box,
    Button,
    Center,
    Divider,
    FileInput,
    FileInputProps,
    Group,
    Select,
    Textarea,
    TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPhoto } from "@tabler/icons-react";
// import fetch from "isomorphic-fetch";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import rehypeSanitize from "rehype-sanitize";
import { DraftView, TextEditor } from "../../components";
import ImageCard from "../../components/ImageCard/ImageCard";
import PostsContext from "../../context/PostsContext";
// import UIThemeContext from "../../context/UIThemeContext";
import { initBlog } from "../../providers/PostsContextProvider";
import { BlogEntry, ImageProps, PostCategory } from "../../types";
import styles from "./CreateBlog.module.scss";

const dropdownValues = [
    {
        label: "Web Development",
        value: PostCategory.WEB_DEV,
    },
    {
        label: "IoT Development",
        value: PostCategory.IOT_DEV,
    },
    {
        label: "Cloud Development",
        value: PostCategory.CLOUD_DEV,
    },
];

export default function CreateBlog() {
    const { posts, addPost, activeDraft, addDraft, setActiveDraft } =
        useContext(PostsContext);
    const [images, setImages] = useState<File[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [uploaded, setUploaded] = useState<ImageProps[]>([]);
    // const { theme } = useContext(UIThemeContext);

    function Value({ file }: { file: File }) {
        return (
            <Center
                inline
                sx={{
                    // backgroundColor: theme === "dark" ? "#e5e5e3" : "#454545",
                    padding: "3px 7px",
                    borderRadius: "5px",
                }}
            >
                <IconPhoto
                    size={14}
                    style={{
                        marginRight: 5,
                        // color: theme === "light" ? "#e5e5e3" : "#454545",
                    }}
                />
                <span
                    style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: 200,
                        display: "inline-block",
                        // color: theme === "light" ? "#e5e5e3" : "#454545",
                    }}
                >
                    {file.name}
                </span>
            </Center>
        );
    }

    const ValueComponent: FileInputProps["valueComponent"] = ({
        value,
    }: {
        value: File | File[] | null;
    }) => {
        if (Array.isArray(value)) {
            return (
                <Group spacing="sm" py="xs">
                    {value.map((file, index) => (
                        <Value file={file} key={index} />
                    ))}
                </Group>
            );
        }

        return <Value file={value as File} />;
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<BlogEntry>({
        defaultValues: {
            title: activeDraft.title,
            description: activeDraft.description,
            type: activeDraft.type,
            images: activeDraft.images,
            content: activeDraft.content,
        },
        mode: "onChange",
    });

    useEffect(() => {
        reset(activeDraft);
        setUploaded([...activeDraft.images]);
    }, [activeDraft]);

    const uploadPhoto = async (file: File) => {
        const filename = encodeURIComponent(file.name);
        const fileType = encodeURIComponent(file.type);

        const res = await fetch(
            `/api/images?file=${filename}&fileType=${fileType}&postId=${activeDraft.id}`
        );
        const { url, fields } = await res.json();

        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        const upload = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (upload.ok) {
            setUploaded((uploaded) => [
                ...uploaded,
                { host: url, id: fields.key },
            ]);
            setImages((images) =>
                images.filter((image) => image.name !== file.name)
            );
        } else {
            console.error(`Upload failed: ${upload}`);
        }
    };

    const handleUpload = async () => {
        const imageCount = images.length;

        var uploads: Array<Promise<void>> = [];

        try {
            for (const image of images) {
                uploads.push(uploadPhoto(image));
            }

            await Promise.all(uploads);

            notifications.show({
                title: "Image Upload Success",
                message: `${
                    imageCount >= 1
                        ? "Your images were successfully uploaded"
                        : "Your image was successfully uploaded"
                }`,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleFormReset = () => {
        setActiveDraft(initBlog);
    };

    const submitPost = async (
        data: BlogEntry,
        isDraft: boolean,
        update: boolean
    ) => {
        const post = {
            ...data,
            isDraft: isDraft,
            ...(uploaded.length >= 0 && {
                images: uploaded.map((upload) => {
                    return { host: upload.host, id: upload.id };
                }),
            }),
            id: activeDraft.id,
            url: data.title
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                .replace(/\s+/g, "-")
                .toLowerCase(),
        };

        try {
            await fetch(
                process.env.NODE_ENV == "production"
                    ? "https://crgdo5agb5.execute-api.us-east-1.amazonaws.com/Prod/posts"
                    : "http://localhost:3001/posts",
                {
                    method: `${update ? "PUT" : "POST"}`,
                    body: JSON.stringify(post),
                }
            );
            isDraft ? addDraft(post) : !update && addPost(post);

            notifications.show({
                title: `${isDraft ? "Draft Success" : "Post Success"}`,
                message: `Your ${
                    isDraft ? "draft" : "post"
                } was successfully saved`,
            });
            handleFormReset();
        } catch (err) {
            notifications.show({
                title: `${isDraft ? "draft" : "post"} Error`,
                message: `The following error occurred: ${err}`,
            });
            throw err;
        }
    };

    const onPost: SubmitHandler<BlogEntry> = async (data) => {
        submitPost(data, false, false);
    };

    const onUpdatePost: SubmitHandler<BlogEntry> = async (data) => {
        submitPost(data, false, true);
    };

    const onUpdateDraft: SubmitHandler<BlogEntry> = async (data) => {
        submitPost(data, true, true);
    };

    const onPostDraft: SubmitHandler<BlogEntry> = async (data) => {
        submitPost(data, true, false);
    };

    return (
        <Box className={styles.container}>
            {open && (
                <DraftView blog={activeDraft} open={open} setOpen={setOpen} />
            )}
            <form onSubmit={handleSubmit(onPost)} className={styles.form}>
                <Box>
                    <Divider my="xs" size="md" label="Title" />
                    <Controller
                        name="title"
                        control={control}
                        rules={{
                            validate: {
                                exists: (value) =>
                                    !activeDraft.editing
                                        ? !posts
                                              .map((post: any) => post.title)
                                              .includes(value)
                                        : true,
                                noEditTitle: (value) =>
                                    activeDraft.editing
                                        ? activeDraft.title === value
                                        : true,
                            },
                        }}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <TextInput
                                    size="lg"
                                    value={value}
                                    onChange={onChange}
                                    placeholder={value}
                                    error={
                                        (errors.title?.type === "exists" &&
                                            "Post with title already exists") ||
                                        (errors.title?.type === "noEditTitle" &&
                                            "The title may not change when editing an already posted blog")
                                    }
                                />
                            );
                        }}
                    />
                </Box>
                <Box>
                    <Divider my="xs" size="md" label="Description" />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Textarea
                                    size="lg"
                                    value={value}
                                    onChange={onChange}
                                    placeholder={value}
                                    autosize
                                    minRows={2}
                                    maxRows={4}
                                />
                            );
                        }}
                    />
                </Box>
                <Box>
                    <Divider my="xs" size="md" label="Category" />
                    <Controller
                        name="type"
                        control={control}
                        render={({ field: { onChange, value } }) => {
                            return (
                                <Select
                                    // label="Your favorite framework/library"
                                    placeholder="Pick one"
                                    value={value}
                                    onChange={onChange}
                                    data={dropdownValues}
                                />
                            );
                        }}
                    />
                </Box>
                <Box>
                    <Divider my="xs" size="md" label="Images" />
                    <Box className={styles.upload}>
                        <FileInput
                            size="md"
                            multiple
                            placeholder="Select images"
                            accept="image/png,image/jpeg"
                            value={images}
                            onChange={setImages}
                            valueComponent={ValueComponent}
                            className={styles.fileinput}
                        />
                        <Button
                            disabled={images.length < 1}
                            onClick={handleUpload}
                        >
                            Upload
                        </Button>
                    </Box>
                    {uploaded.length >= 0 && (
                        <Box className={styles.images}>
                            {uploaded.map((image) => {
                                return (
                                    <ImageCard
                                        host={image.host}
                                        id={image.id}
                                        key={image.id}
                                    />
                                );
                            })}
                        </Box>
                    )}
                </Box>
                <Box>
                    <Divider my="xs" size="md" label="Content" />
                    <Controller
                        name="content"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextEditor
                                className={styles.editor}
                                value={value}
                                onChange={onChange}
                                previewOptions={{
                                    rehypePlugins: [rehypeSanitize],
                                }}
                            />
                        )}
                    />
                </Box>
                <Box className={styles.actions}>
                    <Button
                        onClick={handleSubmit(
                            activeDraft.isDraft ? onPostDraft : onPost
                        )}
                    >
                        Post
                    </Button>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <Button onClick={() => setOpen(true)}>View</Button>
                        {activeDraft.editing && (
                            <Button
                                onClick={handleSubmit(
                                    activeDraft.isDraft
                                        ? onUpdateDraft
                                        : onUpdatePost
                                )}
                            >
                                Save
                            </Button>
                        )}
                        {activeDraft.editing && (
                            <Button onClick={handleFormReset} color={"red"}>
                                Cancel
                            </Button>
                        )}
                        {!activeDraft.editing && (
                            <Button onClick={handleSubmit(onPostDraft)}>
                                Save as Draft
                            </Button>
                        )}
                    </Box>
                </Box>
            </form>
        </Box>
    );
}
