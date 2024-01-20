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
  Switch,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { PostType } from "../page";
import Link from "next/link";
import { EditIcon } from "@chakra-ui/icons";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@chakra-ui/icons";
import moment from "moment";

const Dashboard = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const deletePost = async (post: PostType) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await fetch(
      `https://odin-blog-api-nvot.onrender.com/api/${post._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    const result = await response.json();
    if (result.status === "successful") {
      setPosts((prev) =>
        prev.filter((currentPost) => currentPost._id !== post._id)
      );
    }
  };

  const setPublished = async (
    e: React.ChangeEvent<HTMLInputElement>,
    post: PostType
  ) => {
    const response = await fetch(
      `https://odin-blog-api-nvot.onrender.com/api/${post._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          published: e.target.checked,
          postId: post._id,
        }),
      }
    );
    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        "https://odin-blog-api-nvot.onrender.com/api/post",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      const result = await response.json();

      if (result.status === "successful") {
        setPosts(result.posts);
        console.log(result.posts);
      }
    };

    fetchPosts();
  }, []);

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
                <Th>Created At</Th>
                <Th>Published</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((post) => (
                <Tr>
                  <Td>{post.title}</Td>
                  <Td>{post.author}</Td>
                  <Td>{moment(post.createdAt).fromNow()}</Td>
                  <Td>
                    <Switch
                      isChecked={post.published}
                      onChange={(e) => {
                        setPosts((prev) =>
                          prev.map((currentPost) => {
                            if (currentPost._id === post._id) {
                              setPublished(e, post);
                              return {
                                ...currentPost,
                                published: e.target.checked,
                              };
                            }
                            return currentPost;
                          })
                        );
                      }}
                    />
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        size="sm"
                        as={IconButton}
                        icon={<ChevronDownIcon />}
                      ></MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => deletePost(post)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
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
