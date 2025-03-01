import { Container, Grid, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { useBoxStore } from "src/State/store";
import Card from "../Card/Card";
import BoxForm from "../Form/AddItemForm";
import { SearchBar } from "../SearchBar/SearchBar";
import "./dashboard.css";
import { Loader } from "../Loader/Loader";

const Dashboard = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useBoxes();

  const {
    setBoxes,
    setSearchTerm,
    getCurrentPageBoxes,
    getTotalPages,
    page,
    setPage,
  } = useBoxStore();

  // Pobierz tylko boxy dla aktualnej strony
  const currentPageBoxes = getCurrentPageBoxes();
  // Pobierz całkowitą liczbę stron
  const totalPages = getTotalPages();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (data?.data) {
      setBoxes(data.data);
    }
  }, [data?.data, setBoxes]);

  if (error) return <h2>There was an ERROR</h2>;
  if (isLoading) return <Loader />;

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
          <Card data={currentPageBoxes} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            {totalPages > 0 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
