import { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useBoxesByID } from "src/services/queries/getElementByID";
import { Controller, useForm } from "react-hook-form";
import { useUpdateAmount } from "src/services/mutations/updateAmount";

type Box = {
  id: string;
  box: object;
};
export const EditBox = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useBoxesByID(id as string);
  const [quantity, setQuantity] = useState<number>(0);

  const { control, handleSubmit } = useForm();

  useEffect(() => {
    if (data) setQuantity(data.amount);
  }, [data]);

  const mutation = useUpdateAmount(id as string);

  const onSubmit = (box: Box): void => {
    if (!data || !data._id) {
      console.error("Data or data._id is undefined");
      return;
    }
    console.log(box);

    mutation.mutate({ id: data._id, ...box });
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxWidth: 600, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {data?.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ID: {id}
          </Typography>
          <Typography variant="body2">
            Current Amount: {data?.amount}
          </Typography>
          <Typography variant="body2">Current Usage: {data?.usage}</Typography>
        </CardContent>
        <CardActions>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Controller
              name="amount"
              rules={{ min: 0 }}
              control={control}
              defaultValue={quantity}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Edit Quantity"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0 }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 20 }}
            >
              Update Quantity
            </Button>
          </form>
        </CardActions>
      </Card>
    </Container>
  );
};
