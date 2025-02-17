import "./login.css";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { Error } from "../error/Error";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "../register/Register";
import { useUserLogin } from "src/services/mutations/loginUserApi";
import { useAuth } from "../AuthContext/AuthContext";
import { useTranslation } from "react-i18next";
import { loginTranslations } from "./loginTranslation";

export const Login = () => {
  const { t } = useTranslation();
  const login = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const { mutate: loginUser } = useUserLogin({
    onSuccess: (data) => {
      localStorage.setItem("userID", data.userID);
      localStorage.setItem("access_token", data.token);
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
    login.login();
    e?.target.reset();
  };

  return (
    <Container>
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
            placeholder={`🙋${t("login.name")}`}
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
            placeholder={`🔐${t("login.password")}`}
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
    </Container>
  );
};
