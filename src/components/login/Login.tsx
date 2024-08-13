import "./login.css";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { Error } from "../error/Error";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "../register/Register";
import { useMutation } from "@tanstack/react-query";
import { loginUserApi } from "src/services/loginUserApi";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface ErrorResponse {
  response?: {
    data: {
      type: string;
    };
  };
}

export const Login = () => {
  const [_, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      console.log("Logowanie zakończone sukcesem");
      setCookie("access_token", data.token, {
        path: "/",
        maxAge: 3600,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      localStorage.setItem("userID", data.userID);
      toast("Zalogowano użytkownika");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<ErrorResponse>): void => {
      let errorMessage: string = "";
      switch (error) {
        case error.response?.data?.type:
          errorMessage = error.response?.data?.type;
          break;
        default:
          errorMessage = "Błąd logowania. Spróbuj ponownie.";
          break;
      }
      console.error("Błąd podczas logowania:", error);
      toast.error(error.response?.data.type);
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
      <Toaster />
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
