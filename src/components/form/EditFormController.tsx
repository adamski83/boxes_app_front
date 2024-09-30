import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { Controller, useForm } from "react-hook-form";
import { MockDataItem } from "src/types";

const EditFormController = ({
  onSubmit,
  deleteItemHandler,
  item,
  toggleEdit,
}: any) => {
  const { control, handleSubmit } = useForm<MockDataItem>({
    defaultValues: item,
  });
  const { _id, amount, name, usage } = item;
  return (
    <>
      <Card key={_id}>
        <CardHeader
          action={
            <>
              <IconButton onClick={deleteItemHandler(_id)}>
                <DeleteOutlineIcon />
              </IconButton>
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            </>
          }
          title={name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {/* {modifedDimension} */}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {usage}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {amount}
          </Typography>
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Item Name" />}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField {...field} label="Item Amount" type="number" />
            )}
          />
          <Controller
            name="dimension"
            control={control}
            defaultValue={[0, 0, 0]}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dimensions (comma separated)"
                placeholder="e.g. 10,20,30"
              />
            )}
          />
          <Controller
            name="usage"
            control={control}
            defaultValue={["", "", ""]}
            render={({ field }) => <TextField {...field} label="Item Usage" />}
          />
          <Controller
            name="picture"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Item Picture" />
            )}
          />
          <Button type="submit" variant="contained" size="medium">
            Edit
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default EditFormController;
