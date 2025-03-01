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
import { useRegisterUser } from "src/services/mutations/registerUserApi";
import { Error } from "../Error/Error";
import "./register.css";
import { useTranslation } from "react-i18next";

export type FormFields = {
  username: string;
  password: string;
  userID: string;
  token: string;
};

export const Register = () => {
  const { t } = useTranslation();
  const { mutate: registerUser } = useRegisterUser({
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
      toast.success("User registered successfully");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
      toast.error("Error registering user. Try again.");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (
    data,
    e?: React.BaseSyntheticEvent,
  ) => {
    registerUser(data);
    e?.target.reset();
  };

  return (
    <Container>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Box className="register__popup">
          <Paper />
          <Typography variant="h4" color="#e7900c" mb={20}>
            Register
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
            className="register__input"
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
            className="register__input"
          />
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button
            variant="contained"
            className="register__button"
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
