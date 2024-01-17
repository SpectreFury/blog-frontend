"use client";

import React from "react";
import { Container, Flex, Button, IconButton } from "@chakra-ui/react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="border-b">
      <Container maxW="1440px">
        <Flex padding={6} justify="space-between" alignItems="center">
          <Flex alignItems="center" gap={2}>
            <Home
              size="20px"
              onClick={() => {
                router.push("/");
              }}
              className="text-gray-500 hover:text-gray-600 cursor-pointer"
            />
            <p className="text-lg font-semibold">SpectreFury's Blog</p>
          </Flex>
          <Button variant="outline">Login</Button>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
