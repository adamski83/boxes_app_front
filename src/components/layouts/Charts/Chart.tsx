import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useBoxes } from "../../../services/queries/getAllBoxes";
import "chart.js/auto";
import { useTranslation } from "react-i18next";
import { lightPalette } from "../../../styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import "./Chart.css";

export const Chart = () => {
  const { t } = useTranslation();
  const { data: apiCall, error, isLoading } = useBoxes();
  const ref = useRef();

  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartType, setChartType] = useState<string>("bar");

  const chartDataSet = useMemo(
    () => ({
      labels: chartLabels,
      datasets: [
        {
          label: t("charts.title"),
          data: chartData,
          backgroundColor: lightPalette.primary.main,
          borderColor: lightPalette.primary.dark,
          borderWidth: 1,
        },
      ],
    }),
    [chartLabels, chartData, t],
  );

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  useEffect(() => {
    if (apiCall?.data) {
      const labels = apiCall?.data.map((box) => box.name || "Bez nazwy");
      const values = apiCall?.data.map((box) => box.amount || 0);

      setChartLabels(labels);
      setChartData(values);
    }
  }, [apiCall]);

  const handleChartTypeChange = (event: any) => {
    setChartType(event.target.value);
  };

  if (isLoading) return <div>{t("charts.loading")}</div>;
  if (error) return <div>{t("charts.error")}</div>;
  if (!chartData.length) return <div>Brak danych do wyświetlenia</div>;

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {t("charts.title")}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="chart-type-label">Typ wykresu</InputLabel>
            <Select
              labelId="chart-type-label"
              value={chartType}
              label="Typ wykresu"
              onChange={handleChartTypeChange}
            >
              <MenuItem value="line">Linia</MenuItem>
              <MenuItem value="bar">Słupki</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <div className="height__chart">
            {chartType === "line" ? (
              <Line ref={ref} data={chartDataSet} options={chartOptions} />
            ) : (
              <Bar ref={ref} data={chartDataSet} options={chartOptions} />
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};
