import "./dashboard.css";
import { useState } from "react";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SearchBar } from "../searchBar/SearchBar";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Button, Container, TextField } from "@mui/material";
import { MockData, MockDataItem } from "src/types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAddNewBox } from "src/services/mutations/addNewBox";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteBox } from "src/services/mutations/deleteOneBox";

const Dashboard = () => {
  const { data, error, isLoading } = useBoxes();
  const { control, handleSubmit, reset } = useForm<MockDataItem>();
  const [searchTerm, setSearchTerm] = useState<String>("");
  const queryClient = useQueryClient();
  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  const { mutate: addNewBox } = useAddNewBox({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      console.log("Box added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding box:", error);
    },
  });

  const { mutate: deleteBox } = useDeleteBox({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      console.log("Box deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting box:", error);
    },
  });

  const onSubmit = (box: MockData): void => {
    addNewBox(box);
    reset();
  };
  const handleDeleteItem = (id: string): void => {
    deleteBox(id);
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: 20 }}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Item Name" />}
        />
        <Controller
          name="amount"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <TextField {...field} label="Item Amount" type="number" />
          )}
        />
        <Controller
          name="dimension"
          control={control}
          defaultValue="0,0,0"
          render={({ field }) => (
            <TextField
              {...field}
              label="Dimensions (comma separated)"
              placeholder="e.g. 10,20,30"
            />
          )}
        />
        <Controller
          name="usage"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Item Usage" />}
        />
        <Controller
          name="picture"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Item Picture" />}
        />
        <Button type="submit" variant="contained">
          Add Item
        </Button>
      </form>
      <Card data={filteredData} useDelete={handleDeleteItem} />
    </Container>
  );
};

export default Dashboard;
