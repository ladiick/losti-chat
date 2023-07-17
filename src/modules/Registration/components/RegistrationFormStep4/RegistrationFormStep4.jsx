import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import useImageView from "../../../../components/hooks/useImageView";
import ActionButton from "../../../../components/ui/ActionButton/ActionButton";
import ActionInput from "../../../../components/ui/ActionInput/ActionInput";
import CloseButton from "../../../../components/ui/CloseButton/CloseButton";
import Text from "../../../../components/ui/Text/Text";
import { VALID__NAME } from "../../../../utils/validateForm";
import { useAuthorizationMutation } from "../../../Authorization/api/authorizationApiSlice";
import Loader from "./../../../../components/ui/Loader/Loader";
import LoaderWrapper from "./../../../../components/ui/LoaderWrapper/LoaderWrapper";
import s from "./RegistrationFormStep4.module.scss";
import { useRegistrationMutation } from "./api/registrationApiSlice";
import AboutUser from "./components/AboutUser/AboutUser";

const styleCloseButton = {
  position: "absolute",
  top: -8,
  left: 0,
};

const RegistrationFormStep4 = () => {
  const navigate = useNavigate();
  const stepsInfo = useSelector((state) => state.registration.stepsInfo);

  const [image, onImageChange, setImage] = useImageView();

  const [registration, { isLoading: loadRegistration }] = useRegistrationMutation();
  const [authorization, { isLoading: loadAuthorization }] = useAuthorizationMutation();

  useEffect(() => {
    if (!stepsInfo.password) {
      navigate("/registration/password");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const newDate = new Date(data.birth_date);
    let generalData = {};
    const formData = new FormData();

    data.birth_date = newDate.toLocaleDateString("ru").split(".").reverse().join("-");

    if (image.file) {
      generalData = {
        ...data,
        email: localStorage.getItem("email"),
        password: stepsInfo.password,
        img: image.file,
      };
    } else {
      generalData = {
        ...data,
        email: localStorage.getItem("email"),
        password: stepsInfo.password,
      };
    }

    for (const key in generalData) {
      formData.append(key, generalData[key]);
    }

    try {
      await registration(formData).unwrap();
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await authorization({
        email: localStorage.getItem("email"),
        password: stepsInfo.password,
      }).unwrap();

      localStorage.removeItem("email");
      localStorage.removeItem("code");

      localStorage.setItem("accessToken", res.access);
      localStorage.setItem("refreshToken", res.refresh);
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={s.form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={s.wrapper__form}>
            <Text style={{ textAlign: "center" }}>Информация о вас</Text>
            <div className={s.wrapper__info}>
              <label className={s.label__img}>
                <div className={s.wrapper__uploadImg} style={image ? { borderColor: "#1a73e8" } : {}}>
                  {image ? <img className={s.image__upload} src={image.imagePreview} alt="check" /> : <BsCamera color="#1a73e8" size={24} />}
                </div>

                <input type="file" accept="image/*,.png,.jpg," onChange={(e) => onImageChange(e)} />
              </label>

              {image ? <CloseButton style={styleCloseButton} onClick={() => setImage("")} /> : ""}

              <div className={s.field_names}>
                <FormWrapperLabel style={{ marginBottom: 5 }}>
                  <ActionInput
                    type="text"
                    autoFocus={true}
                    placeholder={errors?.first_name?.message ? errors?.first_name?.message : "Имя"}
                    style={errors?.first_name && { borderColor: "red" }}
                    {...register("first_name", {
                      required: "Необходимо заполнить",
                      pattern: {
                        value: VALID__NAME,
                        message: "Имя содержит цифры",
                      },
                    })}
                  />
                </FormWrapperLabel>

                <FormWrapperLabel>
                  <ActionInput
                    type="text"
                    placeholder={errors?.last_name?.message ? errors?.last_name?.message : "Фамилия"}
                    style={errors?.last_name && { borderColor: "red" }}
                    {...register("last_name", {
                      required: "Необходимо заполнить",
                      pattern: {
                        value: VALID__NAME,
                        message: "Фамилия содержит цифры",
                      },
                    })}
                  />
                </FormWrapperLabel>
              </div>
            </div>

            <AboutUser setValue={setValue} errors={errors} register={register} />
          </div>
          {loadRegistration || loadAuthorization ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            <ActionButton disabled={!isValid}>Зарегистрироваться</ActionButton>
          )}
        </form>
      </div>
    </>
  );
};

export default RegistrationFormStep4;
