import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertDescription,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { setAuthToken } from "../utils/misc";
import { useHistory } from "react-router-dom";
import img from "../assets/shipit.jpeg";
import Axios from "../axios";

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  let userInfo = localStorage.getItem("user");

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const res = await Axios.post(`/users/login`, data);
      setEmail("");
      setPassword("");
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));
      userInfo = localStorage.getItem("user");
      setAuthToken(token);
      history.push("/");
      history.go(0);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <Flex justifyContent="space-evenly" alignItems="center">
      <Image src={img} width="40%" height="80%" />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        width="100%"
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>Invalid Credentials</AlertDescription>
                  </Alert>
                )}
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleClick}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
}
