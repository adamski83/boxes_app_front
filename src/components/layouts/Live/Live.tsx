import React from "react";
import { useArduinoData } from "../../../services/queries/getArduinoData";
import { useQueryClient } from "@tanstack/react-query";

export const Live = () => {
  const queryClient = useQueryClient();
  const {
    data: arduinoData,
    error,
    isLoading,
  } = useArduinoData({
    queryOptions: {
      refetchInterval: 5000,
      staleTime: 2000,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arduinoData"] });
      console.log("Box updated successfully");
    },
  });
  if (error) return <p>{error.message || String(error)}</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!arduinoData) return <p>Brak danych</p>;

  return (
    <div className="live-data-container">
      <h3>Dane z Arduino - aktualizacja co 5 sekund</h3>
      <div className="data-card">
        <p>
          <strong>Ilość kartonów:</strong> {arduinoData?.data?.boxAmount || 0}
        </p>
        <p>
          <strong>Odległość:</strong> {arduinoData?.data?.distance || 0} cm
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {arduinoData?.connected ? "Połączono" : "Rozłączono"}
        </p>
        <p>
          <strong>Ostatnia aktualizacja:</strong>{" "}
          {new Date(arduinoData?.lastUpdate || Date.now()).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
