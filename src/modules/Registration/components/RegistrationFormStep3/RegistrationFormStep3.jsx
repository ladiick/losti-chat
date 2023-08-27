import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, Input, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import { setRegistrationSteps } from "../../store/registrationStepsSlice";

const RegistrationFormStep3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stepsInfo = useSelector((state) => state.registration.stepsInfo);
  const [visibilityPass, setVisibilityPass] = useState(false);

  useEffect(() => {
    // if (!localStorage.getItem("email")) {
    //   navigate("/registration");
    // }
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { password: stepsInfo.password },
  });

  const onSubmit = (data) => {
    delete data.password_repeat;

    dispatch(setRegistrationSteps(data));
    navigate("/registration/about-user");
  };

  return (
    <>
      <div>
        <Typography component="h1" fontSize="xl2" fontWeight="lg">
          Укажите пароль
        </Typography>
        <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
          Он будет использоваться для входа в аккаунт
        </Typography>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormWrapperLabel title="Пароль" errors={errors?.password}>
          <Input
            endDecorator={<IconButton onClick={() => setVisibilityPass((pre) => !pre)}>{visibilityPass ? <Visibility /> : <VisibilityOff />}</IconButton>}
            type={visibilityPass ? "text" : "password"}
            autoFocus={true}
            placeholder="••••••••"
            {...register("password", {
              required: "Необходимо заполнить",
              minLength: {
                value: 5,
                message: "Пароль менее 5 символов",
              },
            })}
          />
        </FormWrapperLabel>
        <FormWrapperLabel errors={errors?.password_repeat} title="Подтвердите пароль">
          <Input
            type={visibilityPass ? "text" : "password"}
            placeholder="••••••••"
            {...register("password_repeat", {
              required: "Пароли не совпадают",
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Пароли не совпадают";
                }
              },
            })}
          />
        </FormWrapperLabel>
        <Button fullWidth disabled={!isValid}>
          Продолжить
        </Button>
      </form>
    </>
  );
};

export default RegistrationFormStep3;
