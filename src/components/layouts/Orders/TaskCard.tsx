import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import { Box, Typography } from "@mui/material";

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Box
      sx={{
        p: 2,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        cursor: "grab",
        border: "1px solid",
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <Typography sx={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        {task.name}
      </Typography>
      <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
        {task.description}
      </Typography>
      <Typography sx={{ fontSize: "1rem", color: "text.secondary" }}>
        stuck: {task.amount}
      </Typography>
    </Box>
  );
};
