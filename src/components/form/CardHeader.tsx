import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, CardHeader as MuiCardHeader } from "@mui/material";

interface CardHeaderProps {
  id: string | undefined;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  id,
  name,
  onDelete,
  onEdit,
}) => (
  <MuiCardHeader
    action={
      <>
        <IconButton onClick={() => onDelete(id)}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      </>
    }
    title={name}
  />
);
