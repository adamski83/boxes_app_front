import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { Column } from "./Column";
import type { Column as ColumnType, Task } from "./types";

export const Orders = () => {
  const { t } = useTranslation();
  const { data: boxes } = useBoxes();

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

  const celarTasks = () => {
    localStorage.removeItem("tasks");
    setTasks(boxes?.data);
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, margin: 2 }}>
        <Button variant="contained" color="primary" onClick={celarTasks}>
          {t("orders.status.clearTasksList")}
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS?.length && tasks?.length
            ? COLUMNS.map((column) => {
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks.filter((task) => task.status === column.id)}
                  />
                );
              })
            : "Loading... "}
        </DndContext>
      </Box>
    </Box>
  );
};
