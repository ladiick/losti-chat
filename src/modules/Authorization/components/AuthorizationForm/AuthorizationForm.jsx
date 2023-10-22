import { Add, Login, Mail, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Checkbox, IconButton, Input, Link as LinkMui, Typography } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import { VALID__EMAIL } from "../../../../utils/validateForm";
import { useAuthorizationMutation } from "../../api/authorizationApiSlice";

const AuthorizationForm = () => {
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [visibilityPass, setVisibilityPass] = useState(false);

  const [authorization, { isLoading: loadAuthorization }] = useAuthorizationMutation();

  const onSubmit = async (data) => {
    try {
      const res = await authorization({
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("accessToken", res.access);
      localStorage.setItem("refreshToken", res.refresh);

      window.location.href = "/";
    } catch (err) {
      if (err?.status === 401) {
        reset();
        setError("email", {
          message: "Неверная почта или пароль",
        });
        setError("password", {});
      }
    }
  };

  return (
    <>
      <div>
        <Typography component="h1" fontSize="xl2" fontWeight="lg">
          Войдите в свой аккаунт
        </Typography>
        <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
          С возвращением!
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapperLabel errors={errors?.email} title="Электронная почта">
          <Input
            endDecorator={<Mail />}
            type="text"
            autoFocus={true}
            placeholder="example@gmail.com"
            {...register("email", {
              required: "Необходимо заполнить",
              pattern: {
                value: VALID__EMAIL,
                message: "Введите корректный email адрес",
              },
            })}
          />
        </FormWrapperLabel>

        <FormWrapperLabel title={"Пароль"} errors={errors?.password}>
          <Input
            endDecorator={
              <IconButton onClick={() => setVisibilityPass((pre) => !pre)}>
                {visibilityPass ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
            type={visibilityPass ? "text" : "password"}
            placeholder={visibilityPass ? "Password" : "••••••••"}
            {...register("password", {
              required: "Необходимо заполнить",
              minLength: {
                value: 5,
                message: "Пароль менее 5 символов",
              },
            })}
          />
        </FormWrapperLabel>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Checkbox size="sm" label="Запомнить вход" name="persistent" />
          <LinkMui component={Link} fontSize="sm" to="#forgot-pass" fontWeight="lg">
            Забыли пароль?
          </LinkMui>
        </Box>

        <div>
          <Button
            endDecorator={<Login />}
            type={"submit"}
            fullWidth
            disabled={!isValid}
            loading={loadAuthorization}
          >
            Войти
          </Button>

          <Typography
            component={"span"}
            level={"body-sm"}
            textAlign={"center"}
            sx={{ my: "0.75rem" }}
          >
            или
          </Typography>

          <Button
            endDecorator={<Add />}
            component={Link}
            to={"/registration"}
            fullWidth
            variant="outlined"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </>
  );
};

export default AuthorizationForm;
