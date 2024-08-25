import "./register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Error } from "../error/Error";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { registerUserApi } from "src/services/registerUserApi";

export type FormFields = {
  username: string;
  password: string;
};

const useRegisterUser = () => {
  const { mutate: registerUser } = useMutation({
    mutationFn: (data: FormFields) => registerUserApi(data),
    onSuccess: () => {
      console.log("Rejestracja zakończona sukcesem");
      toast("Dodano nowego użytkownika");
    },
    onError: (error) => {
      console.error("Błąd podczas rejestracji:", error);
    },
  });

  return registerUser;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const registerUser = useRegisterUser();

  const onSubmit: SubmitHandler<FormFields> = (
    data,
    e?: React.BaseSyntheticEvent,
  ) => {
    registerUser(data);
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
            placeholder="🙋  Type your username"
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
            placeholder="🔐  Type your password"
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
            Register
          </Button>
        </Box>
      </form>
    </Box>
  );
};
