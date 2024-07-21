import "./login.css";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Error } from "../error/Error";

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    await axios.post("http://localhost:5000/user/register", {
      username: data.name,
      password: data.password,
    });
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
          <Typography variant="h4" color="#e7900c" mb={20}>
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
          {errors.name && <Error>{errors.name.message}</Error>}
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
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button
            variant="contained"
            className="login__button"
            type="submit"
            sx={{ fontSize: 14 }}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};
