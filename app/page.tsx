"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BlogCard from "./_components/blog-card";
import { Container, Stack, Skeleton } from "@chakra-ui/react";

export type PostType = {
  _id: string;
  title: string;
  author: string;
  content: string;
  published: boolean;
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/api/post");
      const result = await response.json();

      setPosts(result.posts);
      console.log(result.posts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <main>
      <Container maxW="1440px">
        <Stack mt={10}>
          {loading ? (
            <React.Fragment>
              <Skeleton height="100px" />
              <Skeleton height="100px" />
              <Skeleton height="100px" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {posts?.map((post: PostType) => (
                <BlogCard post={post} />
              ))}
            </React.Fragment>
          )}
        </Stack>
      </Container>
    </main>
  );
};

export default Home;
