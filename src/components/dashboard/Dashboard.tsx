import "./dashboard.css";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useBoxes } from "src/services/getAllBoxes";

const Dashboard = () => {
  const { data, error, isLoading } = useBoxes();
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

  return <Card data={data} />;
};

export default Dashboard;
