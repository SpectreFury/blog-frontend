"use client";

import React, { useEffect } from "react";
import { Container, Flex, Button } from "@chakra-ui/react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthModal from "./auth-modal";
import { useModalStore } from "@/store/modalStore";
import { useUserStore, User } from "@/store/userStore";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
const Navbar = () => {
  const router = useRouter();
  const { toggleModal } = useModalStore();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const user: User = jwtDecode(token);
    setUser(user.id, user.email, user.isAdmin);
  }, []);

  return (
    <nav className="border-b">
      <AuthModal />
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
          {user ? (
            <Flex alignItems="center" gap={2}>
              {user?.isAdmin && (
                <Link href="/dashboard" className="text-neutral-600 text-sm">
                  <Button variant="outline" size="sm">
                    Writing Dashboard
                  </Button>
                </Link>
              )}
              <div className="text-sm">{user.email}</div>
            </Flex>
          ) : (
            <Button variant="outline" onClick={toggleModal}>
              Login
            </Button>
          )}
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
