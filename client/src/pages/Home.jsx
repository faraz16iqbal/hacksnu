import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "../axios";
import { baseUrl } from "../utils/misc";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("here");
    (async () => {
      const res = await Axios.get(`${baseUrl}/warehouses`);
      setData(res.data);
    })();
  }, []);
  return <div>{data && data.map((x) => <div>{x.location}</div>)}</div>;
};

export default Home;
