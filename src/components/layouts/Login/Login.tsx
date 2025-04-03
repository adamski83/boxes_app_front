import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useUserLogin } from "src/services/mutations/loginUserApi";
import { useAuth } from "../../Auth/AuthContext/AuthContext";
import { Error } from "src/components/common/Error/Error";
import { FormFields } from "../Register/Register";
import "./login.css";

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
      localStorage.setItem("userID", data.user.id);
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_role", data.user.role);
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
    login.login(data.token); //Czy to zadziała? sprawdzić w przyszłości!!!!!
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
            {t("login.submit")}
          </Button>
        </Box>
      </form>
    </Container>
  );
};
