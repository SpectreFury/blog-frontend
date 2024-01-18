import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Stack,
  FormLabel,
} from "@chakra-ui/react";
import { useModalStore } from "@/store/modalStore";
import { jwtDecode } from "jwt-decode";
import { useUserStore, User } from "@/store/userStore";

const AuthModal = () => {
  const { isOpen, onClose, modalState, setModalState, toggleModal } =
    useModalStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUserStore();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();

    if (result.status === "successful") {
      localStorage.setItem("token", result.token);
      const user: User = jwtDecode(result.token);

      setUser(user.id, user.email, user.isAdmin);

      toggleModal();
    }
  };

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();

    console.log(result);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalState === "login" && "Login"}
          {modalState === "register" && "Register"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalState === "login" && (
            <form onSubmit={login}>
              <Stack>
                <Input
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="Email"
                  required
                />
                <Input
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type="password"
                  placeholder="Password"
                  required
                />
              </Stack>
              <Button type="submit" mt={2}>
                Submit
              </Button>
              <div>
                Don't have an account?{" "}
                <span onClick={() => setModalState("register")}>Register</span>
              </div>
            </form>
          )}
          {modalState === "register" && (
            <form onSubmit={register}>
              <Stack>
                <Input
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="Email"
                  required
                />
                <Input
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  type="password"
                  placeholder="Password"
                  required
                />
              </Stack>
              <Button type="submit" mt={2}>
                Submit
              </Button>
              <div>
                Already have an account?{" "}
                <span onClick={() => setModalState("login")}>Login</span>
              </div>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
