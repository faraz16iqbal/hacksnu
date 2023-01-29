import { Button, Center, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AddWarehouse from "./AddWarehouse";
import Home from "./Home";
import Inventory from "./Inventory";
const Page = () => {
  const [click, setClicked] = useState(0);
  return (
    <Flex justifyContent="space-evenly" alignItems="center" flexDir="column">
      <Center size="2xl" mx="auto" mt="8">
        <Stack direction="row" spacing={4}>
          <Button
            colorScheme="teal"
            variant="solid"
            value="1"
            onClick={() => setClicked(1)}
          >
            Ship An Item Abroad
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            value="2"
            onClick={() => setClicked(2)}
          >
            Add A New Warehouse
          </Button>
          <Button
            colorScheme="purple"
            variant="solid"
            value="3"
            onClick={() => setClicked(3)}
          >
            Update Inventory
          </Button>
        </Stack>
      </Center>
      {click === 1 ? (
        <Home />
      ) : click === 2 ? (
        <AddWarehouse />
      ) : click === 3 ? (
        <Inventory />
      ) : null}
    </Flex>
  );
};

export default Page;
