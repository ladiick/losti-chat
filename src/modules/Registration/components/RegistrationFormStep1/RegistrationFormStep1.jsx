import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import {ActionButton} from "../../../../components/ui/ActionButton/ActionButton";
import ActionInput from "../../../../components/ui/ActionInput/ActionInput";
import NameCompany from "../../../../components/ui/NameCompany/NameCompany";
import Text from "../../../../components/ui/Text/Text";
import { VALID__EMAIL } from "../../../../utils/validateForm";
import { setRegistrationSteps } from "../../store/registrationStepsSlice";
import s from "./RegistrationFormStep1.module.scss";
import { useExistEmailMutation } from "./api/checkEmailApiSlice";
import { useSendCodeMutation } from "./api/sendCodeApiSlice";
const RegistrationFormStep1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stepsInfo = useSelector((state) => state.registration.stepsInfo);

  const [existEmail] = useExistEmailMutation();
  const [sendCode] = useSendCodeMutation();

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
      <NameCompany size={36} title="Регистрация в LOSTI-CHAT" direction="column" />

      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Ваша почта будет использована <br /> для входа в аккаунт
      </Text>
      <div className={s.form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={s.wrapper__form}>
            <FormWrapperLabel title="Электронная почта" errors={errors?.email}>
              <ActionInput
                type="email"
                autoFocus={true}
                placeholder="example@gmail.com"
                style={errors?.email ? { borderColor: "red", marginTop: 8 } : { marginTop: 8 }}
                {...register("email", {
                  required: "Необходимо заполнить",
                  pattern: {
                    value: VALID__EMAIL,
                    message: "Введите корректный email адрес",
                  },
                })}
              />
            </FormWrapperLabel>
          </div>
          <div>
            <ActionButton style={{ display: "block", width: "100%" }} disabled={!isValid}>
              Продолжить
            </ActionButton>

            <Text className={s.orLogin}>или</Text>

            <ActionButton onClick={() => navigate("/authorization")} className={s.btn__registr}>
              Войти
            </ActionButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationFormStep1;
