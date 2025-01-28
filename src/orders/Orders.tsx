import { useEffect, useState } from "react";
import type { Task, Column as ColumnType } from "./types";
import { Column } from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Box, Button } from "@mui/material";
import { useBoxes } from "src/services/queries/getAllBoxes";
import { clear } from "console";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "Lager" },
  { id: "IN_PROGRESS", title: "Bestellung" },
];

export const Orders = () => {
  const { data: boxes } = useBoxes();
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : boxes;
  });

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
    if (boxes && !localStorage.getItem("tasks")) {
      setTasks(boxes);
    }
  }, [boxes]);

  const celarTasks = () => {
    localStorage.removeItem("tasks");
  };

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Button variant="contained" color="primary" onClick={celarTasks}>
        Clear Tasks List
      </Button>
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
