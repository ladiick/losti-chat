import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import NameCompany from "../../../../components/NameCompany/NameCompany";
import ActionButton from "../../../../components/ui/ActionButton/ActionButton";
import ActionInput from "../../../../components/ui/ActionInput/ActionInput";
import Loader from "../../../../components/ui/Loader/Loader";
import LoaderWrapper from "../../../../components/ui/LoaderWrapper/LoaderWrapper";
import Text from "../../../../components/ui/Text/Text";
import { VALID__EMAIL } from "../../../../utils/validateForm";
import { useAuthorizationMutation } from "../../api/authorizationApiSlice";
import s from "./AuthorizationForm.module.scss";

const AuthorizationForm = () => {
  const navigation = useNavigate();
  const {
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

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
      <NameCompany size={36} title="Вход в LOSTI-CHAT" direction="column" />

      <div className={s.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.wrapper__form}>
            <FormWrapperLabel errors={errors?.email} title="Электронная почта">
              <ActionInput
                type="text"
                autoFocus={true}
                placeholder="Email"
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

            <FormWrapperLabel title={"Пароль"} errors={errors?.password} descriptionTitle={<Text type="button">Забыли пароль?</Text>}>
              <ActionInput
                type="password"
                placeholder="Введите больше 5 символов"
                style={errors?.password ? { borderColor: "red", marginTop: 8 } : { marginTop: 8 }}
                {...register("password", {
                  required: "Необходимо заполнить",
                  minLength: {
                    value: 5,
                    message: "Пароль менее 5 символов",
                  },
                })}
              />
            </FormWrapperLabel>
          </div>

          <div>
            {loadAuthorization ? (
              <LoaderWrapper center>
                <Loader />
              </LoaderWrapper>
            ) : (
              <ActionButton style={{ display: "block", width: "100%" }} disabled={!isValid}>
                Войти
              </ActionButton>
            )}

            <Text className={s.orLogin}>или</Text>

            <ActionButton onClick={() => navigation("/registration")} className={s.btn__registr}>
              Зарегистрироваться
            </ActionButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthorizationForm;
