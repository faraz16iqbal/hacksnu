import React, { useState, useEffect } from "react";
import Axios from "../axios";
import { baseUrl } from "../utils/misc";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Select,
  Stack,
  StackDivider,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
} from "@chakra-ui/react";
import { options } from "../utils/data";

let mapping = {};
const Home = () => {
  const [data, setData] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [opt, setOpt] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [qant, setQant] = useState(0);
  const [loc, setLoc] = useState("");
  const [clicked, setClicked] = useState(null);
  const [cost, setCost] = useState(0);
  const [users, setUsers] = useState([]);
  const [company, setCompany] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    (async () => {
      const res = await Axios.get(`/warehouses`);
      console.log(res.data);
      setData(res.data);
      let res2 = await Axios.get(`/warehouses/all`);
      setFullData(res2.data);
      console.log(res2.data);
      const Users = await Axios.get("/users");
      setUsers(Users.data);
      for (let x of Users.data) {
        mapping[x["name"]] = x["_id"];
      }
      console.log(mapping);
    })();
  }, []);
  const display = () => {
    console.log(opt);
    if (opt === "") {
      setDisplayData([]);
      return;
    }
    let newData = [];
    console.log(data);
    data &&
      data.filter((d) => {
        if (!d.inventory) return false;
        for (let x of d.inventory) {
          if (x["item"] === opt) {
            newData.push({
              location: d.location,
              quantity: x["quantity"],
            });
            return true;
          }
        }
        return false;
      });
    console.log(newData);
    setDisplayData(newData);
  };
  useEffect(() => {
    display();
  }, [opt]);

  const filterData = (location) => {
    let endData = [];
    console.log(fullData);
    for (let x of fullData) {
      if (x.location === location || x.ownerId === user._id) continue;
      for (let y of x.inventory) {
        if (y["item"] === opt) {
          endData.push({
            location: x.location,
            quantity: y["quantity"],
            warehouseId: x._id,
            ownerId: x.ownerId,
          });
          break;
        }
      }
    }

    setFilteredData(endData);
    setLoc(location);
    onOpen();
  };

  useEffect(() => {
    setCompany("");
    setClicked(null);
  }, [isOpen]);

  const getPrice = async (c2) => {
    const url = "http://127.0.0.1:5000/predict";
    const { data } = await Axios.post(`${baseUrl}/warehouses/distance`, {
      c1: loc,
      c2,
    });
    const res = await Axios.post(url, {
      volume: 80,
      quantity: qant,
      distance: data,
    });
    console.log(res);
    const fixedCost = (res.data[0] / 100).toFixed(2);
    setCost(fixedCost);
    // alert("Predicted Price: " + fixedCost);
  };
  const createShipment = async (to) => {
    await Axios.post(`${baseUrl}/shipments`, {
      to: to,
      from: loc,
      product: opt,
      cost,
    });
    alert("Package sent for approval!");
    setClicked(null);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="1000px" maxH="1000px" overflow="scroll">
              <ModalHeader>Select Destination</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Container w="2xl" mt="10">
                  <Stack spacing={3}>
                    <Select
                      variant="filled"
                      placeholder="Filter By Company"
                      onChange={(e) => {
                        setCompany(e.target.value);
                        setClicked(null);
                      }}
                      width="inherit"
                    >
                      {users.map((x, id) => (
                        <option value={x.name} key={id}>
                          {x.name}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                </Container>
                <Flex
                  mt="5"
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  {filteredData

                    .filter((cur) => cur.ownerId === mapping[company])
                    .map((d, id) => {
                      return (
                        <Card
                          m={5}
                          cursor="pointer"
                          key={id}
                          textAlign="center"
                        >
                          <CardHeader>
                            <Heading size="md">{`${d.location}`}</Heading>
                          </CardHeader>
                          <CardBody>
                            <Text textAlign="center">{`ID: ${d.warehouseId}`}</Text>
                          </CardBody>

                          <CardBody>
                            <Flex
                              divider={<StackDivider />}
                              flexDir="column"
                              alignItems="center"
                            >
                              <Box my={2}>
                                <Button
                                  variant="outline"
                                  colorScheme="messenger"
                                  onClick={async () => {
                                    setClicked(id);
                                    await getPrice(d.location);
                                  }}
                                >
                                  Predict Price
                                </Button>
                              </Box>
                              <Box>
                                {id === clicked ? (
                                  <VStack>
                                    {cost && (
                                      <Button
                                        variant="outline"
                                        colorScheme="green"
                                        onClick={() =>
                                          createShipment(d.location)
                                        }
                                      >
                                        {`Price: ${cost}`}
                                      </Button>
                                    )}
                                    <Button
                                      variant="outline"
                                      colorScheme="green"
                                      onClick={() => createShipment(d.location)}
                                    >
                                      Ship Item
                                    </Button>
                                  </VStack>
                                ) : null}
                              </Box>
                            </Flex>
                          </CardBody>
                        </Card>
                      );
                    })}
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
      <Container w="2xl" mt="10">
        <Stack spacing={3}>
          <Select
            variant="filled"
            placeholder="Select Item To Export"
            onChange={(e) => setOpt(e.target.value)}
            width="inherit"
          >
            {options.map((x) => (
              <option value={x}>{x}</option>
            ))}
          </Select>
        </Stack>
      </Container>
      {displayData.length ? (
        <Heading mt="10">Select Location To Export From</Heading>
      ) : null}
      <Box w="60%" mx="auto">
        <Flex
          mt="5"
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
        >
          {displayData.map((d) => (
            <Card
              px="10"
              m={5}
              width="250px"
              cursor="pointer"
              onClick={() => {
                setQant(d.quantity);
                filterData(d.location);
              }}
            >
              <CardHeader>
                <Heading size="md">{d.location}</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
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
    </>
  );
};

export default Home;
