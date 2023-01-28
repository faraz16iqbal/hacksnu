import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Axios from "../axios";

const Admin = () => {
  const [data, setData] = useState([]);
  const [newCost, setNewCost] = useState(Array(100).fill(0));
  const [approved, setApproved] = useState(Array(100).fill(0));
  useEffect(() => {
    (async () => {
      const res = await Axios.get("/shipments");
      console.log(res.data);
      setData(res.data);
    })();
  }, []);
  console.log(approved);
  const handleChange = (e, i) => {
    const newState = [...data];
    newState[i] = e.target.value;
    setNewCost(newState);
  };

  const fetch = async () => {
    const res = await Axios.get("/shipments");
    console.log("res");
    setData(res.data);
  };
  const handleUpdate = async (id, objId) => {
    const modified = await Axios.patch("/shipments/edit", {
      objId,
      newCost: newCost[id],
    });
    if (modified.status === 200) {
      await fetch();
    }
  };
  return (
    <Box maxW="60%" mx="auto">
      <Heading my="5" color="blue.600">
        Track Shipments
      </Heading>
      <TableContainer>
        <Table>
          <TableCaption>Shipment Orders</TableCaption>
          <Thead>
            <Tr>
              <Th>Shipment ID</Th>
              <Th>Source</Th>
              <Th>Destination</Th>
              <Th isNumeric>Cost $</Th>
              <Th>New Cost $</Th>
              <Th>Approve</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d, id) => (
              <Tr>
                <Td>{d._id}</Td>
                <Td>{d.from}</Td>
                <Td>{d.to}</Td>
                <Td isNumeric>{d.cost}</Td>
                <Td>
                  <Input
                    variant="filled"
                    bg="whiteAlpha.100"
                    type="number"
                    value={newCost[id]}
                    key={id}
                    onChange={(e) => handleChange(e, id)}
                    disabled={approved[id]}
                  />
                </Td>
                <Td>
                  {!approved[id] ? (
                    <Button
                      colorScheme="twitter"
                      onClick={() => {
                        const newState = [...approved];
                        newState[id] = true;
                        setApproved(newState);
                        handleUpdate(id, d._id);
                      }}
                    >
                      Approve
                    </Button>
                  ) : (
                    <Button colorScheme="green" onClick={() => {}}>
                      Approved!
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Admin;
