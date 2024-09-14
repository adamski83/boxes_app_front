import "./dashboard.css";
import { useState } from "react";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SearchBar } from "../searchBar/SearchBar";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Button, Container, Stack, TextField } from "@mui/material";
import { MockData, MockDataItem } from "src/types";
import { Controller, useForm } from "react-hook-form";
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
  const {
    reset,
    formState: { errors },
  } = useForm<FormData>();
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

  const onSubmit = (box: MockData): void => {
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
      <SearchBar onSearch={handleSearch} />
      <BoxForm onSubmit={onSubmit} />
      <Card data={filteredData} />
    </Container>
  );
};

export default Dashboard;
