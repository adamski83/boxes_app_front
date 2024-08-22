import "./dashboard.css";
import { useState } from "react";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SearchBar } from "../searchBar/SearchBar";
import { assignTokenIntoAPI } from "src/services/assignTokenIntoAPI";
import { useBoxes } from "src/services/getAllBoxes";
import { Button, Container, TextField } from "@mui/material";
import { MockData, MockDataItem } from "src/types";
import { Controller, useForm } from "react-hook-form";
import { addNewBoxApi } from "src/services/addNewBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  assignTokenIntoAPI();
  const { data, error, isLoading } = useBoxes();
  const { control, handleSubmit, reset } = useForm<MockDataItem>();
  const [searchTerm, setSearchTerm] = useState<String>("");
  const queryClient = useQueryClient();
  const handleSearch = (term: string): void => {
    setSearchTerm(term);
  };

  const useAddNewBox = () => {
    const { mutate: addNewBox } = useMutation({
      mutationFn: (data: MockData) => addNewBoxApi(data),
      onSuccess: () => {
        queryClient.invalidateQueries("boxes");
        console.log("Dodano nowy box");
      },
      onError: (error) => {
        console.error("Błąd podczas dodawania boxa:", error);
      },
    });
    return addNewBox;
  };
  const addNewBox = useAddNewBox();

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
          defaultValue={[0, 0, 0]}
          render={({ field }) => <TextField {...field} label="New Dimension" />}
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
      <Card data={filteredData} />
    </Container>
  );
};

export default Dashboard;
