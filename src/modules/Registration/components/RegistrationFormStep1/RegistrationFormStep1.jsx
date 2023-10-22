import { Mail } from "@mui/icons-material";
import { Button, Input, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import { VALID__EMAIL } from "../../../../utils/validateForm";
import { setRegistrationSteps } from "../../store/registrationStepsSlice";
import { useExistEmailMutation } from "./api/checkEmailApiSlice";
import { useSendCodeMutation } from "./api/sendCodeApiSlice";
const RegistrationFormStep1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [existEmail, { isLoading: isLoadingExistEmail }] = useExistEmailMutation();
  const [sendCode, { isLoading: isLoadingSendCOde }] = useSendCodeMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { email: localStorage.getItem("email") },
  });

  const onSubmit = async (data) => {
    const checkEmail = await existEmail(data.email).unwrap();

    if (checkEmail === false) {
      await sendCode(data.email).unwrap();

      localStorage.setItem("email", data.email);

      dispatch(setRegistrationSteps(data));
      navigate("/registration/confirmation-code");
    }

    if (checkEmail === true) {
      setError("email", {
        message: "Такая почта зарегистрирована",
      });
    }
  };

  return (
    <>
      <div>
        <Typography component="h1" fontSize="xl2" fontWeight="lg">
          Зарегистрируйте свой аккаунт
        </Typography>
        <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
          Добро пожаловать!
        </Typography>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormWrapperLabel title="Электронная почта" errors={errors?.email}>
          <Input
            endDecorator={<Mail />}
            type="email"
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
        <div>
          <Button
            fullWidth
            type="submit"
            disabled={!isValid}
            loading={isLoadingExistEmail || isLoadingSendCOde}
          >
            Продолжить
          </Button>

          <Typography
            component={"span"}
            level={"body-sm"}
            textAlign={"center"}
            sx={{ my: "0.75rem" }}
          >
            или
          </Typography>

          <Button fullWidth component={Link} to={"/authorization"} variant="outlined">
            Войти
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegistrationFormStep1;
