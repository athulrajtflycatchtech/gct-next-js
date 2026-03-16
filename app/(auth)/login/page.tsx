"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Flex,
  TextInput,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
// import "./LoginPage.css";
import type { FC } from "react";
// import { showCustomToast } from "../../components/common/customToast";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../../utils/functions/headerFunctions";
import { useLoginMutation } from "@/app/apiServices/authServices";

const LoginPage: FC = () => {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validate: {
      username: (value) => (value ? null : "invalid username"),
      password: (value) =>
        value.length >= 8 ? null : "Password must be at least 8 characters",
    },
  });
  const { mutate: loginMutation, isPending } = useLoginMutation();
  const router = useRouter();

  const handleLogin = (values: { username: string; password: string }) => {
    loginMutation(
      {
        username: values.username,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          console.log("test data", data);

          localStorage.setItem("accessToken", data.results.access);
          localStorage.setItem("full_name", data?.results.full_name);
          localStorage.setItem("role", data?.results.role);
          localStorage.setItem("user_id", String(data?.results.user_id));
          if (getAccessToken()) {
            router.push("/dashboard");
          }
        },
        onError: (error: any) => {
          console.log("test error", error?.data?.errorDetails?.username?.[0]);
          form.setErrors({
            username: error?.data?.errorDetails?.username?.[0] || "",
            password: error?.data?.message || "",
          });
        },
      },
    );
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Stack justify="center" align="center" w="100%" className="login">
        <Box mb={"1.5rem"} w="100%" maw={420}>
          <Text c={"var(--dark-400)"} className="login-title fs-28 fw-regular">
            Login
          </Text>
          <Text c={"var(--dark-300)"} className="fs-22 fw-regular" pt={14}>
            Enter your login credentials
          </Text>
        </Box>

        <form
          onSubmit={form.onSubmit(handleLogin)}
          style={{ width: "100%", maxWidth: 420 }}
        >
          <TextInput
            label="Username"
            placeholder="Enter username"
            key={form.key("username")}
            {...form.getInputProps("username")}
            classNames={{
              label: "username-input-label fs-18",
              input: "username-input-field",
              error: "fs-16 login-error",
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="xxxxxxxxxxxxxxxxxx"
            key={form.key("password")}
            {...form.getInputProps("password")}
            classNames={{
              label: "password-input-label fs-18",
              input: "password-input-field",
              error: "fs-16 login-error",
            }}
            pt={16}
          />

          <Button
            type="submit"
            fullWidth
            mt={28}
            radius="xs"
            c={"var(--white-300)"}
            bg={"var(--primary-400)"}
            className="fs-22 fw-medium"
            h={50}
            loading={isPending}
            disabled={form.values.username && form.values.password ? false : true}
          >
            Login
          </Button>
        </form>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
