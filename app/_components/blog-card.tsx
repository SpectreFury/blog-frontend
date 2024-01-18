import React from "react";
import { Card, CardBody, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PostType } from "../page";

const BlogCard = ({ post }: { post: PostType }) => {
  const router = useRouter();

  return (
    <Card
      cursor="pointer"
      onClick={() => {
        router.push(`/${post._id}`);
      }}
    >
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <div className="text-lg font-semibold">{post.title}</div>
          <div className="text-sm ">{post.author}</div>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
