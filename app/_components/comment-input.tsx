import React, { useState } from "react";
import { Textarea, Button, Flex, useToast } from "@chakra-ui/react";
import { useUserStore } from "@/store/userStore";
import { usePostStore } from "@/store/postStore";

const CommentInput = ({ postId }: { postId: String }) => {
  const [commentText, setCommentText] = useState("");
  const { user } = useUserStore();
  const toast = useToast();

  const { addComment } = usePostStore();

  const saveComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    const response = await fetch("http://localhost:4000/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
        creator: user?.email,
        postId,
      }),
    });

    const result = await response.json();
    if (result.status === "successful") {
      addComment({
        text: commentText,
        creator: user.email,
      });
      toast({
        title: "Comment Created",
        description: "The comment has been added",
        status: "success",
      });
    }
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
          disabled={user === null ? true : false}
        />
        <Button alignSelf="start" size="sm" type="submit">
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default CommentInput;
