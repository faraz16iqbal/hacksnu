import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";

import React from "react";

const AC = ({ props }) => {
  return (
    <>
      <Alert status={props.stat}>
        <AlertIcon />
        <AlertDescription>{props.message}</AlertDescription>
      </Alert>
    </>
  );
};

export default AC;
