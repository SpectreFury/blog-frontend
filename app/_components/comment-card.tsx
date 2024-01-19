import React from "react";
import { Flex, Card, CardBody } from "@chakra-ui/react";
import { CommentType } from "../page";

const CommentCard = ({ comment }: { comment: CommentType }) => {
  return (
    <Card maxW={600} mt={2}>
      <CardBody>
        <Flex direction="column" gap={2}>
          <div className="font-light text-sm text-neutral-500">
            {comment.creator}
          </div>
          <div>{comment.text}</div>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CommentCard;
