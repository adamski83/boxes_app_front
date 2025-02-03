import "./dashboard.css";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { SearchBar } from "../searchBar/SearchBar";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Container, Grid, Pagination } from "@mui/material";
import BoxForm from "../form/AddItemForm";
import { useDebounce } from "src/helpers/useDebounce";
import { useBoxStore } from "src/state/store";

const Dashboard = () => {
  const { data, error, isLoading } = useBoxes();

  const {
    filteredBoxes,
    page,
    itemsPerPage,
    setBoxes,
    setSearchTerm,
    setPage,
  } = useBoxStore();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (data) {
      setBoxes(data);
    }
  }, [data, setBoxes]);

  useEffect(() => {
    setSearchTerm(debouncedSearch);
  }, [debouncedSearch, setSearchTerm]);

  const handleSearch = (term: string) => {
    setSearchValue(term);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const paginatedData = filteredBoxes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );
  console.log(paginatedData);

  if (error) return <h2>There was an ERROR</h2>;
  if (isLoading) return <CircularProgress />;

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
          <Card />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={Math.ceil(filteredBoxes.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
