import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";
import { Box, Stack, Typography } from "@mui/material";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <Box
      sx={{
        p: 2,
        flex: 1,
        flexDirection: "column",
        border: "1px solid",
        minWidth: "100px",
      }}
    >
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {column.title}
      </Typography>
      <Stack
        ref={setNodeRef}
        sx={{
          flex: 1,
          minHeight: "100px",
          backgroundColor: isOver ? "rgba(0, 0, 0, 0.05)" : "transparent",
          transition: "background-color 0.2s ease",
          border: tasks.length === 0 ? "2px dashed #ccc" : "none",
          borderRadius: "4px",
        }}
      >
        {tasks.map((task) => {
          return <TaskCard key={task._id} task={task} />;
        })}
      </Stack>
    </Box>
  );
};
