import { Container, Grid, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDebounce } from "src/Helpers/useDebounce";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { useBoxStore } from "src/State/store";
import { MockDataItem } from "src/types";
import Card from "../Card/Card";
import BoxForm from "../Form/AddItemForm";
import { SearchBar } from "../SearchBar/SearchBar";
import "./dashboard.css";
import { Loader } from "../Loader/Loader";

const Dashboard = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useBoxes();
  const { boxes, page, itemsPerPage, setPage, setBoxes } = useBoxStore();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 1000);

  const handleSearch = (term: string) => {
    setSearchValue(term);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const filteredData = boxes?.length
    ? boxes?.filter((box: MockDataItem) =>
        box.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      )
    : [];

  useEffect(() => {
    setBoxes(data);
  }, [data]);

  if (error) return <h2>There was an ERROR</h2>;
  if (isLoading) return <Loader />;
  const pagination = Math.ceil(boxes?.length / itemsPerPage);

  return (
    <Container
      sx={{
        backgroundColor: theme.palette.custom.cardBg,
        borderColor: theme.palette.custom.borderColor,
        "&:hover": {
          backgroundColor: theme.palette.custom.hoverBg,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} marginTop={3}>
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12}>
          <BoxForm />
        </Grid>
        <Grid item xs={12}>
          <Card data={filteredData} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Pagination
              count={pagination}
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
