import React, { useEffect, useRef, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useBoxes } from "../../services/queries/getAllBoxes";
import "chart.js/auto";
import { useTranslation } from "react-i18next";
export const Chart = () => {
  const { t } = useTranslation();
  const { data: apiCall, error, isLoading } = useBoxes();
  const ref = useRef();

  const [chartData, setChartData] = useState<number[]>([]);
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  useEffect(() => {
    if (apiCall?.data) {
      const labels = apiCall?.data.map((box) => box.name || "Bez nazwy");
      const values = apiCall?.data.map((box) => box.amount || 0);

      setChartLabels(labels);
      setChartData(values);
    }
  }, [apiCall]);

  const chartDataSet = {
    labels: chartLabels,
    datasets: [
      {
        label: t("charts.title"),
        data: chartData,
      },
    ],
  };

  if (isLoading) return <div>Ładowanie danych...</div>;

  if (error) return <div>Wystąpił błąd podczas pobierania danych</div>;

  if (!chartData.length) return <div>Brak danych do wyświetlenia</div>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Line ref={ref} data={chartDataSet} />
    </div>
  );
};
