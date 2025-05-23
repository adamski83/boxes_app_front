import { Container, Grid, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { useBoxStore } from "../../../Store/store";
import Card from "../../common/Card/Card";
import BoxForm from "../../forms/AddItemForm";
import { SearchBar } from "../SearchBar/SearchBar";
import { Loader } from "../../common/Loader/Loader";
import { ProductCategory } from "src/types";
import { CategoryFilter } from "../../forms/CategoryFilter";

const Dashboard = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useBoxes();

  const {
    setBoxes,
    setSearchTerm,
    setSelectedCategories,
    getCurrentPageBoxes,
    getTotalPages,
    page,
    setPage,
  } = useBoxStore();

  const currentPageBoxes = getCurrentPageBoxes();
  const totalPages = getTotalPages();
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryFilter = (categories: ProductCategory[]) => {
    setSelectedCategories(categories);
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
          <CategoryFilter onFilterChange={handleCategoryFilter} />
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
