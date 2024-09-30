import "./dashboard.css";
import { useState } from "react";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SearchBar } from "../searchBar/SearchBar";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Container, Grid } from "@mui/material";
import { MockDataItem } from "src/types";
import { useForm } from "react-hook-form";
import { useAddNewBox } from "src/services/mutations/addNewBox";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOXES } from "src/services/queries/tags";
import BoxForm from "../form/AddItemForm";

interface FormData {
  name: string;
  amount: number;
  dimension: string;
  usage: string;
  picture: string;
}

const Dashboard = () => {
  const { data, error, isLoading } = useBoxes();
  const { reset } = useForm<FormData>();
  const [searchTerm, setSearchTerm] = useState<String>("");
  const queryClient = useQueryClient();
  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  const { mutate: addNewBox } = useAddNewBox({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [GET_BOXES] });
      console.log("Box added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding box:", error);
    },
  });

  const onSubmit = (box: any): void => {
    addNewBox(box);
    reset();
  };

  const filteredData = data
    ? data.filter((box: MockDataItem) =>
        box.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  if (error) {
    return <h2>There was an ERROR</h2>;
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <BoxForm onSubmit={onSubmit} />
        </Grid>
        <Grid item xs={12}>
          <Card data={filteredData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
