"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Flex, Divider } from "@chakra-ui/react";
import { PostType } from "../page";
import CommentInput from "../_components/comment-input";
import CommentCard from "../_components/comment-card";

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost:4000/api/post/${params.id}`
      );
      const result = await response.json();
      console.log(result.post);

      setPost(result.post);
    };

    fetchPost();
  }, []);

  if (!post) return;

  return (
    <div>
      <Container maxW="1440px">
        <Flex mt={10} direction="column">
          <h1 className="text-[48px] font-bold">{post?.title}</h1>
          <span className="text-sm text-neutral-500 ml-2">{post?.author}</span>
          <div className="mt-10 text-lg">{post?.content}</div>
          <Flex mt={200} direction="column">
            <CommentInput postId={post._id} />
            <CommentCard />
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default PostPage;
