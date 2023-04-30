import { ActionIcon, Box, CopyButton, Text } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { ImageProps } from "../../types";
import styles from "./ImageCard.module.scss";

export default function ImageCard({ host, id }: ImageProps) {
    return (
        <Box className={styles.card}>
            <Image
                loader={({ src, width }) => {
                    return `${src}?w=${width}`;
                }}
                src={`${host}/${id}`}
                alt={id}
                width={50}
                height={50}
                className={styles.image}
            />
            <Text className={styles.text}>{`${host}/${id}`}</Text>
            <CopyButton value={`${host}/${id}`}>
                {({ copied, copy }) => (
                    <ActionIcon onClick={copy} variant="default">
                        {copied ? (
                            <IconCheck size={16} />
                        ) : (
                            <IconCopy size={16} />
                        )}
                    </ActionIcon>
                )}
            </CopyButton>
        </Box>
    );
}
