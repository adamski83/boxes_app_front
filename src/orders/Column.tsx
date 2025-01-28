import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";
import { Box, Button, Stack, Typography } from "@mui/material";

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
        p: {
          xs: 1,
          sm: 1.5,
          md: 2,
        },
        flex: 1,
        flexDirection: "column",
        border: "1px solid",
        minWidth: {
          xs: "100%",
          sm: "45%",
          md: "30%",
        },
        maxWidth: {
          xs: "100%",
        },
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        m: {
          xs: 1,
          sm: 1.5,
          md: 2,
        },
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: {
            xs: "1.2rem",
            sm: "1.3rem",
            md: "1.5rem",
          },
          fontWeight: "bold",
          mb: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },
        }}
      >
        {column.title}
      </Typography>
      <Stack
        ref={setNodeRef}
        sx={{
          flex: 1,
          minHeight: {
            xs: "150px",
            sm: "200px",
            md: "250px",
          },
          backgroundColor: isOver ? "rgba(0, 0, 0, 0.05)" : "transparent",
          transition: "background-color 0.2s ease",
          border: tasks.length === 0 ? "2px dashed #ccc" : "none",
          borderRadius: "4px",
          p: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },
          gap: {
            xs: 1,
            sm: 1.5,
            md: 2,
          },
        }}
      >
        {tasks.map((task) => {
          return <TaskCard key={task._id} task={task} />;
        })}
      </Stack>
    </Box>
  );
};
