import "./dashboard.css";
import Card from "../card/Card";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/api/box/search`;
      const data = await fetch(url);
      const res = await data.json();
      console.log(res);
      setData(res);
    };
    fetchData();
  }, []);
  return <Card data={data} />;
};

export default Dashboard;
