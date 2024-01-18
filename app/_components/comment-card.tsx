import React from "react";
import { Flex } from "@chakra-ui/react";
import { CommentType } from "../page";

const CommentCard = ({ comment }: { comment: CommentType }) => {
  return <Flex>
    {comment.text}
  </Flex>;
};

export default CommentCard;
