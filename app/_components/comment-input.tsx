import React, { useState } from "react";
import { Textarea, Button, Flex } from "@chakra-ui/react";

const CommentInput = ({ postId }: { postId: String }) => {
  const [commentText, setCommentText] = useState("");

  const saveComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
        postId,
      }),
    });
  };

  return (
    <form onSubmit={saveComment}>
      <Flex direction="column" gap={2}>
        <Textarea
          placeholder="Tell us what you thought about it"
          maxW={600}
          value={commentText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setCommentText(e.target.value)
          }
        />
        <Button alignSelf="start" size="sm" type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default CommentInput;