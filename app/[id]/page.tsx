"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Container, Flex, Divider } from "@chakra-ui/react";
import CommentInput from "../_components/comment-input";
import CommentCard from "../_components/comment-card";
import { usePostStore } from "@/store/postStore";

const PostPage = () => {
  const params = useParams();
  const { post, setPost } = usePostStore();

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

    return () => setPost(null);
  }, []);

  if (!post) return;

  return (
    <div>
      <Container maxW="1440px">
        <Flex mt={10} direction="column">
          <h1 className="text-[48px] font-bold">{post?.title}</h1>
          <span className="text-sm text-neutral-500">{post?.author}</span>
          <div className="mt-10 text-lg">{post?.content}</div>
          <Flex mt={200} direction="column">
            <CommentInput postId={post._id} />
            <Divider mt={2} />
            <div>
              {post.comments?.map((comment) => (
                <CommentCard comment={comment} />
              ))}
            </div>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default PostPage;
