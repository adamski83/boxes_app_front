import "./login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type FormFields = {
  name: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="login__popup">
          <Paper />
          <Typography variant="h3" color="#e7900c" mb={20}>
            Login
          </Typography>
          <TextField
            {...register("name", {
              required: "name is required",
              minLength: {
                value: 6,
                message: "name musst be at least 6 chars",
              },
            })}
            autoComplete=""
            placeholder="🙋  Type your username"
            className="login__input"
          />
          {errors.name && (
            <span className="login__error">{errors.name.message}</span>
          )}
          <TextField
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: "name musst be at least 6 chars",
              },
            })}
            autoComplete=""
            placeholder="🔐  Type your password"
            type="password"
            className="login__input"
          />
          {errors.password && (
            <span className="login__error">{errors.password.message}</span>
          )}
          <Button variant="contained" className="login__button" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};
