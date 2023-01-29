import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spinner,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Axios from "../axios";
import countries from "../utils/countries";

const Inventory = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState(null);
  const [warehouse, setWarehouse] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Axios.get("/warehouses");
        setData(res.data);
      } catch (error) {
        console.log(error);
        alert("Something went wrong. Try again");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!data || name === "") return;
    setWarehouse(data[name].inventory);
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.post("/warehouses", {});
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
      {data ? (
        <Flex flexDir="column">
          <Stack
            spacing={8}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
            width="600px"
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Update Inventory
              </Heading>
            </Stack>
            <Box rounded={"lg"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Warehouse</FormLabel>
                  <Select
                    variant="filled"
                    placeholder="Select Warehouse"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    width="inherit"
                  >
                    {data &&
                      data.map((x, id) => <option value={id}>{x._id}</option>)}
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
          <Stack spacing={3}>
            <Box w="60%" mx="auto">
              {warehouse && <Heading>Inventory</Heading>}

              <Flex
                mt="5"
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
              >
                {warehouse &&
                  warehouse.map((d) => (
                    <Card px="10" m={5} width="250px" cursor="pointer">
                      <CardHeader>
                        <Heading size="md">{d.location}</Heading>
                      </CardHeader>

                      <CardBody>
                        <Stack divider={<StackDivider />} spacing="4">
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              {d.item}
                            </Heading>
                          </Box>
                          <Box>
                            <Heading size="xs" textTransform="uppercase">
                              Quantity
                            </Heading>
                            <Text pt="2" fontSize="sm">
                              {d.quantity}
                            </Text>
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
              </Flex>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="10"
        />
      )}
    </Flex>
  );
};

export default Inventory;
