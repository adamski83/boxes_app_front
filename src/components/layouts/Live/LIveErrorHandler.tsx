import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LiveErrorHandler = ({ error }: { error: unknown }) => {
  const { t } = useTranslation();
  if (error) {
    let errorMessage = "Wystąpił nieznany błąd";

    if (typeof error === "string") {
      errorMessage = error;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "object" && error !== null) {
      if ("message" in error && typeof error.message === "string") {
        errorMessage = error.message;
      } else if (
        "response" in error &&
        error.response &&
        "data" in error.response
      ) {
        errorMessage =
          error.response.data.message || "Błąd komunikacji z serwerem";
      }
    }

    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error" variant="outlined">
          <AlertTitle>{t("live.connectionError")}</AlertTitle>
          {errorMessage}
          <Box mt={1}>
            <small>{t("live.connectionErrorDescription")}</small>
          </Box>
        </Alert>
      </Box>
    );
  }
};
