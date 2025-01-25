import { useEffect, useState } from "react";
import type { Task, Column as ColumnType } from "./types";
import { Column } from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Box } from "@mui/material";
import { useBoxes } from "src/services/queries/getAllBoxes";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
];

const INITIAL_TASKS: Task[] = [
  {
    _id: "4",
    name: "20er",
    description: "722745287",
    amount: 10,
    picture:
      "https://www.ikea.com/hu/hu/images/products/samla-doboz-szurke__0901243_pe595728_s5.jpg?f=s",

    storage: "garázs",
    status: "IN_PROGRESS",
  },
  {
    _id: "675581c8535b462d951db6c8",
    name: "50 Er",
    amount: 360,
    description: "722790238",
    picture:
      "https://www.ikea.com/hu/hu/images/products/samla-doboz-szurke__0901243_pe595728_s5.jpg?f=s",
    status: "IN_PROGRESS",
    storage: "extern",
  },
];

export const Orders = () => {
  const { data: boxes, isFetching } = useBoxes();
  const [tasks, setTasks] = useState<Task[]>(boxes);
  console.log(tasks);

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
  useEffect(() => setTasks(boxes), [boxes]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Box sx={{ display: "flex", gap: 8 }}>
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
