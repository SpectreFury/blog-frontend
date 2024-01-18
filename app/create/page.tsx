"use client";

import React, { useState } from "react";
import { Container, Input, Flex, Button } from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";

const Create = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const router = useRouter();

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await fetch("http://localhost:4000/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        title,
        author,
        content: value,
      }),
    });

    const result = await response.json();

    if (result.status === "successful") {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <Container maxW="1440px">
        <form onSubmit={createPost}>
          <Flex direction="column" maxW={600} mt={10} gap={2}>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <Button alignSelf="start" colorScheme="green" type="submit">
              Create Post
            </Button>
          </Flex>
        </form>
      </Container>
    </div>
  );
};

export default Create;
