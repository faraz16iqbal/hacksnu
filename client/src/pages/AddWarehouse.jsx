import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import Axios from "../axios";
import countries from "../utils/countries";

const Inventory = () => {
  const [location, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/warehouses", {
        location,
      });
      alert("Warehouse Added!");
      setName("");
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong! Please try again");
    }
  };
  return (
    <Flex align={"center"} justify={"center"} width="100%">
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} width="500px">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Add Warehouse
          </Heading>
        </Stack>
        <Box rounded={"lg"} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Location</FormLabel>
              <Select
                variant="filled"
                placeholder="Select Country"
                onChange={(e) => setName(e.target.value)}
                width="inherit"
              >
                {countries.map((x) => (
                  <option value={x}>{x}</option>
                ))}
              </Select>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Inventory;
