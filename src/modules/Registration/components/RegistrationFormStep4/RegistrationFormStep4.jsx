import { AddAPhoto, Close, Create, Draw } from "@mui/icons-material";
import { Avatar, Button, FormControl, FormLabel, IconButton, Input, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormWrapperLabel from "../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import useImageView from "../../../../components/hooks/useImageView";
import { VALID__NAME } from "../../../../utils/validateForm";
import { useAuthorizationMutation } from "../../../Authorization/api/authorizationApiSlice";
import { useRegistrationMutation } from "./api/registrationApiSlice";
import AboutUser from "./components/AboutUser/AboutUser";

const RegistrationFormStep4 = () => {
  const stepsInfo = useSelector((state) => state.registration.stepsInfo);

  const [image, onImageChange, setImage] = useImageView();

  const [registration, { isLoading: loadRegistration }] = useRegistrationMutation();
  const [authorization, { isLoading: loadAuthorization }] = useAuthorizationMutation();

  useEffect(() => {
    // if (!stepsInfo.password) {
    //   navigate("/registration/password");
    // }
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
      <div>
        <Typography component="h1" fontSize="xl2" fontWeight="lg">
          Заполните информацию о Вас
        </Typography>
        <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
          Будет видна другим пользователям
        </Typography>
      </div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ justifyContent: "center", flexDirection: "row" }}>
          <FormLabel sx={{ position: "relative" }}>
            <Avatar
              src={image?.imagePreview}
              sx={{ width: "7rem", height: "7rem", cursor: "pointer" }}
            >
              <AddAPhoto sx={{ width: "2.5rem", height: "2.5rem" }} />
            </Avatar>
            {image ? (
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  setImage("");
                }}
                sx={{ position: "absolute", top: "-1.5rem", right: "-1.5rem" }}
              >
                <Close />
              </IconButton>
            ) : (
              ""
            )}
          </FormLabel>
          <Input
            type="file"
            accept="image/*,.png,.jpg,"
            onChange={(e) => onImageChange(e)}
            sx={{
              visibility: "hidden",
              position: "absolute",
              width: 1,
              height: 1,
              margin: -1,
              border: 0,
              padding: 0,
              whiteSpace: "nowrap",
              clipPath: "inset(100%)",
              clip: "rect(0 0 0 0)",
              overflow: "hidden",
            }}
          />
        </FormControl>

        <FormWrapperLabel errors={errors?.first_name} title="Имя">
          <Input
            endDecorator={<Create />}
            type="text"
            autoFocus={true}
            placeholder={"Иван"}
            {...register("first_name", {
              required: "Необходимо заполнить",
              pattern: {
                value: VALID__NAME,
                message: "Имя содержит цифры",
              },
            })}
          />
        </FormWrapperLabel>

        <FormWrapperLabel errors={errors?.last_name} title="Фамилия">
          <Input
            endDecorator={<Draw />}
            type="text"
            placeholder="Иванов"
            {...register("last_name", {
              required: "Необходимо заполнить",
              pattern: {
                value: VALID__NAME,
                message: "Фамилия содержит цифры",
              },
            })}
          />
        </FormWrapperLabel>

        <AboutUser setValue={setValue} errors={errors} register={register} />

        <Button disabled={!isValid} loading={loadRegistration || loadAuthorization}>
          Зарегистрироваться
        </Button>
      </form>
    </>
  );
};

export default RegistrationFormStep4;
