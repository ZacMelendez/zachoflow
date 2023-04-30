// import { Box, Button, Text } from "@mantine/core";
// import { signIn, useSession } from "next-auth/react";
// import { useContext } from "react";
// import { Comment, CommentEditor } from "../../components";
// import CommentsContext from "../../context/CommentsContext";
// import { BlogEntry } from "../../types";
// import styles from "./CommentContainer.module.scss";

// export default function CommentContainer({ blog }: { blog: BlogEntry }) {
//     const { comments } = useContext(CommentsContext);
//     const { data: session } = useSession();

//     return (
//         <Box className={styles.container}>
//             {session?.user ? (
//                 <CommentEditor blog={blog} />
//             ) : (
//                 <Box className={styles.signIn}>
//                     <Text className={styles.message}>
//                         Please sign in to comment
//                     </Text>
//                     <Button onClick={() => signIn("google")}>Sign In</Button>
//                 </Box>
//             )}
//             <Box className={styles.comments}>
//                 {comments
//                     .filter((comment) => comment.postUrl === blog.url)
//                     .map((comment) => (
//                         <Comment comment={comment} key={comment.id} />
//                     ))}
//             </Box>
//         </Box>
//     );
// }
