import { createContext, Dispatch, SetStateAction } from "react";
import { BlogEntry, PostCategory } from "../types";

declare global {
    interface PostsContextProps {
        posts: BlogEntry[];
        setPosts: Dispatch<SetStateAction<BlogEntry[]>>;
        addPost: (post: BlogEntry) => void;
        drafts: BlogEntry[];
        addDraft: (draft: BlogEntry) => void;
        removeDraft: (draft: BlogEntry) => void;
        setDrafts: Dispatch<SetStateAction<BlogEntry[]>>;
        activeDraft: BlogEntry;
        setActiveDraft: Dispatch<SetStateAction<BlogEntry>>;
        removePost: (draft: BlogEntry) => void;
        tableOfContents: any;
        setTableOfContents: (e: any) => any;
    }
}

const PostsContext = createContext<PostsContextProps>({
    posts: [],
    setPosts: () => {},
    addPost: () => {},
    drafts: [],
    addDraft: () => {},
    removeDraft: () => {},
    removePost: () => {},
    setDrafts: () => {},
    activeDraft: {
        id: "",
        title: "",
        url: "",
        date: "",
        content: "",
        description: "",
        images: [],
        comments: "",
        type: PostCategory.WEB_DEV,
    },
    setActiveDraft: () => {},
    tableOfContents: null,
    setTableOfContents: () => {},
});

export default PostsContext;
