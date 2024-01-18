"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  IconButton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { PostType } from "../page";
import Link from "next/link";
import { EditIcon } from "@chakra-ui/icons";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4000/api/post");
      const result = await response.json();

      if (result.status === "successful") {
        setPosts(result.posts);
        console.log(result.posts);
      }
    };

    fetchPosts();
  }, []);

  if (!user) {
    router.push("/");
    return;
  }

  return (
    <div>
      <Container maxW="1440px">
        <Card maxW={200} mt={10}>
          <CardBody>
            <Flex direction="column" gap={2}>
              <div>Have something new that you want to share?</div>
              <Link href="/create">
                <IconButton
                  icon={<EditIcon />}
                  aria-label="Create Post"
                  size="sm"
                />
              </Link>
            </Flex>
          </CardBody>
        </Card>
        <TableContainer mt={10}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th>Published</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((post) => (
                <Tr>
                  <Td>{post.title}</Td>
                  <Td>{post.author}</Td>
                  <Td>{post.published ? "True" : "False"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Dashboard;
