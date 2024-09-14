import "./login.css";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Error } from "../error/Error";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "../register/Register";
import { useNavigate } from "react-router-dom";
import { assignTokenIntoAPI } from "src/services/assignTokenIntoAPI";
import { useUserLogin } from "src/services/mutations/loginUserApi";

export const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const { mutate: loginUser } = useUserLogin({
    onSuccess: (data) => {
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("access_token", data.token);
      assignTokenIntoAPI();
      navigate("/dashboard");
    },
    onError: (error: Error): void => {
      console.error("Błąd podczas logowania:", error);
      toast.error(
        // @ts-ignore
        error.response?.data?.type || "Błąd logowania. Spróbuj ponownie.",
      );
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data, e) => {
    loginUser(data);
    e?.target.reset();
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
            {...register("username", {
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
          {errors.username && <Error>{errors.username.message}</Error>}
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
