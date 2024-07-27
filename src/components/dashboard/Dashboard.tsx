import "./dashboard.css";
import Card from "../card/Card";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      axios.get(`http://localhost:5000/api/box/search`).then((res) => res),
  });

  if (error) {
    return <div>There was an ERROR</div>;
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return <Card data={data?.data} />;
};

export default Dashboard;
