import "./dashboard.css";
import { useState } from "react";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SearchBar } from "../searchBar/SearchBar";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Container, Grid, Pagination } from "@mui/material";
import { MockDataItem } from "src/types";
import BoxForm from "../form/AddItemForm";
import { useDebounce } from "src/helpers/useDebounce";

const Dashboard = () => {
  const { data, error, isLoading } = useBoxes();
  const [searchTerm, setSearchTerm] = useState<String>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const filteredData = data
    ? data.filter((box: MockDataItem) =>
        box.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      )
    : [];

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

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
        <Grid item xs={12} marginTop={3}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <BoxForm />
        </Grid>
        <Grid item xs={12}>
          <Card data={paginatedData} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
