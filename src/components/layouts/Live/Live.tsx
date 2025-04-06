import {
  Inventory2Outlined,
  SignalCellularAltOutlined,
  SignalWifiStatusbarConnectedNoInternet4Outlined,
  StraightenOutlined,
  UpdateOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import React from "react";
import { useArduinoData } from "../../../services/queries/getArduinoData";
import { Loader } from "../../common/Loader/Loader";
import { LiveErrorHandler } from "./LIveErrorHandler";
import karton from "../../../../assets/karton.webp";
import { darkPalette } from "../../../styles";
import { Flex } from "../../../types/flexTypes";

export const Live = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const {
    data: arduinoData,
    error,
    isLoading,
  } = useArduinoData({
    queryOptions: {
      refetchInterval: 5000,
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["arduinoData"] });
    },
  });

  if (error) return <LiveErrorHandler error={error} />;
  if (isLoading) return <Loader />;
  if (!arduinoData) return <p>{t("live.noData")}</p>;

  const formattedDate = arduinoData?.connected
    ? new Date(arduinoData?.lastUpdate).toLocaleString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Brak danych";

  const statusColor = arduinoData?.connected
    ? darkPalette.custom.success
    : darkPalette.custom.error;
  const statusText = arduinoData?.connected
    ? t("live.connectionStatusOK")
    : t("live.connectionStatusNOK");
  const StatusIcon = arduinoData?.connected
    ? SignalCellularAltOutlined
    : SignalWifiStatusbarConnectedNoInternet4Outlined;

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          bgcolor: darkPalette.primary.light,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="medium"
          color={darkPalette.custom.cardBg}
        >
          {t("live.title")}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Stack
                direction={Flex.ROW}
                spacing={1}
                alignItems={Flex.CENTER}
                sx={{ mb: 4 }}
              >
                <StatusIcon sx={{ color: statusColor }} />
                <Typography variant="h6">{t("live.status")}</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: Flex.CENTER, alignItems: Flex.CENTER }}>
                <Chip
                  label={statusText}
                  sx={{
                    bgcolor: statusColor,
                    color: darkPalette.custom.cardBg,
                    fontWeight: "bold",
                    px: 1,
                  }}
                />
                <Box sx={{ ml: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={arduinoData?.connected ? 100 : 0}
                    size={24}
                    thickness={5}
                    sx={{ color: statusColor }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Stack
                direction={Flex.ROW}
                spacing={1}
                alignItems={Flex.CENTER}
                sx={{ mb: 2 }}
              >
                <Inventory2Outlined color="primary" />
                <Typography variant="h6">{t("live.amount")}</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: Flex.CENTER,
                  justifyContent: Flex.CENTER,
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="primary"
                  sx={{
                    textAlign: Flex.CENTER,
                    fontFeatureSettings: '"tnum"',
                    mx: 2,
                  }}
                >
                  {arduinoData?.data?.boxAmount || 0}
                </Typography>
                <Box
                  component="img"
                  src={karton}
                  alt="Kartony"
                  sx={{
                    width: 64,
                    height: 64,
                    opacity: 0.8,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ height: "100%" }}>
            <CardContent>
              <Stack
                direction={Flex.ROW}
                spacing={1}
                alignItems={Flex.CENTER}
                sx={{ mb: 2 }}
              >
                <StraightenOutlined color="secondary" />
                <Typography variant="h6">{t("live.distance")}</Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: Flex.CENTER,
                  justifyContent: Flex.CENTER,
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="secondary"
                  sx={{
                    textAlign: Flex.CENTER,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {arduinoData?.data?.distance || 0}
                </Typography>
                <Typography variant="h5" color="secondary" sx={{ ml: 1 }}>
                  cm
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                  bgcolor: darkPalette.custom.borderColor,
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${Math.min(100, ((arduinoData?.data?.distance || 0) * 100) / (arduinoData?.data?.maxDistance || 100))}%`,
                    height: 8,
                    bgcolor: "secondary.main",
                    transition: "width 0.5s ease-in-out",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card elevation={2} sx={{ mt: 3 }}>
        <CardContent>
          <Stack direction={Flex.ROW} spacing={1} alignItems={Flex.CENTER}>
            <UpdateOutlined color="action" />
            <Typography variant="body2" color="text.secondary">
              {t("live.update")}: {formattedDate}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};
