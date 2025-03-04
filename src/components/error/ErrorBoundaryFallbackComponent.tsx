import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AirplaneIcon from "@mui/icons-material/AirplanemodeActiveRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import ReportIcon from "@mui/icons-material/Report";
import { darkPalette, lightPalette } from "src/Theme/palette";
import { FallbackProps } from "react-error-boundary";
import { breakpoints } from "src/breakpoints";
import { Flex, Theme } from "src/types";

export const ErrorFallbackComponent = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  const isDarkMode = theme.palette.mode === Theme.DARK;

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: Flex.CENTER,
        justifyContent: Flex.CENTER,
      }}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? Flex.COLUMN : Flex.ROW,
            alignItems: Flex.CENTER,
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: Flex.CENTER,
              justifyContent: Flex.CENTER,
              p: 2,
              borderRadius: "50%",
              backgroundColor: isDarkMode
                ? `${lightPalette.primary.main}1A`
                : `${darkPalette.primary.main}1A`,
              color: theme.palette.error.main,
            }}
          >
            <ReportIcon sx={{ fontSize: isMobile ? 40 : 60 }} />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" component="h1" gutterBottom color="error">
              Wystąpił błąd
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: isDarkMode
                  ? darkPalette.primary.light
                  : lightPalette.primary.light,
              }}
            >
              Przepraszamy, ale wystąpił nieoczekiwany problem podczas ładowania
              aplikacji. Nasz zespół został powiadomiony o tym błędzie.
            </Typography>

            {process.env.NODE_ENV === "development" && (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 3,
                  backgroundColor: isDarkMode
                    ? `${darkPalette.custom.borderColor}`
                    : `${lightPalette.custom.hoverBg}`,
                  overflowX: "auto",
                }}
              >
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    fontFamily: "monospace",
                    color: isDarkMode
                      ? theme.palette.error.light
                      : theme.palette.error.dark,
                  }}
                >
                  {error.message}
                  {"\n"}
                  {error.stack}
                </Typography>
              </Paper>
            )}

            <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={resetErrorBoundary}
                startIcon={<RefreshIcon />}
              >
                Spróbuj ponownie
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => (window.location.href = "/")}
                startIcon={<AirplaneIcon />}
              >
                Powrót do strony głównej
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: Flex.CENTER,
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${isDarkMode ? darkPalette.custom.error : darkPalette.custom.warning}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: isDarkMode
                ? `${darkPalette.custom.error}`
                : `${lightPalette.custom.error}`,
            }}
          >
            © {new Date().getFullYear()} | System łączeniowy dla lotnictwa |
            Wsparcie techniczne: support@firma-aero.pl
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
