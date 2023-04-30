import dynamic from "next/dynamic";
import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Text } from "@mantine/core";

export default dynamic(() => import("@uiw/react-md-editor"), {
    // Disable during server side rendering
    ssr: false,

    // Render anything as fallback on server, e.g. loader or html content without editor
    loading: () => <Text>{"Loadin!"}</Text>,
});
