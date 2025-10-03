import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Tooltip,
  CircularProgress,
  useTheme,
  alpha,
  Container,
  Card,
  CardHeader,
  IconButton,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  ClearAll as ClearAllIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Column } from "./Column";
import type { Column as ColumnType, Task } from "./types";
import React from "react";

export const Orders = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: boxes, isLoading } = useBoxes();

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : boxes;
  });

  const COLUMNS: ColumnType[] = [
    { id: "TODO" as Task["status"], title: t("orders.status.warehous") },
    { id: "IN_PROGRESS" as Task["status"], title: t("orders.status.orders") },
  ];

  useEffect(() => {
    if (tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  }

  useEffect(() => {
    if (boxes?.data && !localStorage.getItem("tasks")) {
      setTasks(boxes);
    }
  }, [boxes?.data]);

  const clearTasks = () => {
    localStorage.removeItem("tasks");
    setTasks(boxes?.data);
  };

  return (
    <Container maxWidth="xl">
      <Card
        elevation={3}
        sx={{
          my: 3,
          overflow: "visible",
          borderRadius: 2,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" color="primary.main" fontWeight="medium">
              {t("orders.title")}
            </Typography>
          }
          action={
            <Tooltip title={t("orders.status.clearTasksList")}>
              <IconButton
                color="primary"
                onClick={clearTasks}
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <Divider />

        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 400,
            }}
          >
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <Box
            sx={{
              p: 3,
              width: "100%",
              overflowX: "auto",
              minHeight: 400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: { xs: "wrap", md: "nowrap" },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <DndContext onDragEnd={handleDragEnd}>
                {COLUMNS?.length && tasks?.length ? (
                  COLUMNS.map((column) => {
                    const columnTasks = tasks.filter(
                      (task) => task.status === column.id,
                    );
                    return (
                      <Paper
                        key={column.id}
                        elevation={2}
                        sx={{
                          flex: 1,
                          minWidth: 280,
                          maxWidth: { xs: "100%", sm: 350, lg: 450 },
                          bgcolor:
                            column.id === "TODO"
                              ? alpha(theme.palette.info.light, 0.1)
                              : alpha(theme.palette.success.light, 0.1),
                          borderRadius: 2,
                          overflow: "hidden",
                          border: `1px solid ${alpha(
                            column.id === "TODO"
                              ? theme.palette.info.main
                              : theme.palette.success.main,
                            0.2,
                          )}`,
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor:
                              column.id === "TODO"
                                ? theme.palette.info.main
                                : theme.palette.success.main,
                            p: 1.5,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="white"
                          >
                            {column.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              bgcolor: "white",
                              color:
                                column.id === "TODO"
                                  ? theme.palette.info.main
                                  : theme.palette.success.main,
                              borderRadius: "50%",
                              width: 24,
                              height: 24,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {columnTasks.length}
                          </Typography>
                        </Box>
                        <Column column={column} tasks={columnTasks} />
                      </Paper>
                    );
                  })
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: 300,
                      gap: 2,
                    }}
                  >
                    <InfoIcon color="disabled" sx={{ fontSize: 60 }} />
                    <Typography variant="h6" color="text.secondary">
                      Brak elementów do wyświetlenia
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon />}
                      onClick={clearTasks}
                    >
                      Odśwież dane
                    </Button>
                  </Box>
                )}
              </DndContext>
            </Box>
          </Box>
        )}
      </Card>
    </Container>
  );
};
