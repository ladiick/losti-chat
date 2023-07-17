import React from "react";
import { BiCalendar } from "react-icons/bi";
import FormWrapperLabel from "../../../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";
import ActionInput from "../../../../../../components/ui/ActionInput/ActionInput";
import RadioButtonGroup from "../../../../../../components/ui/RadioGroup/RadioGroup";
import s from "./AboutUser.module.scss";

const AboutUser = ({ errors, register, setValue }) => {
  const toggleRadio = (name) => {
    const gender = name === "Мужчина" ? "m" : "f";
    setValue("gender", gender);
  };

  return (
    <div className={s.date__gender}>
      <FormWrapperLabel errors={errors?.birth_date} title="Дата рождения">
        <ActionInput
          type="date"
          style={
            errors?.birth_date
              ? {
                  borderColor: "red",
                  marginTop: 8,
                }
              : { marginTop: 8 }
          }
          {...register("birth_date", {
            required: "Необходимо заполнить",
            min: {
              value: 1970,
              message: "Дата рождения некорректна",
            },
            max: {
              value: new Date(),
              message: "Выбранная дата превышает реальную",
            },
            valueAsDate: true,
          })}
        />
        <BiCalendar className={s.icon__calendar} />
      </FormWrapperLabel>
      <div className={s.wrapper__gender}>
        <RadioButtonGroup toggle={toggleRadio} classWrapperEl={s.wrapper__radio} descriptionTitle="Пол" names={["Мужчина", "Женщина"]} />

        <input
          id="male"
          className={s.input__radio}
          type="radio"
          value="m"
          {...register("gender", {
            required: "Необходимо заполнить",
          })}
        />

        <input
          id="female"
          className={s.input__radio}
          type="radio"
          value="f"
          {...register("gender", {
            required: "Необходимо заполнить",
          })}
        />
      </div>
    </div>
  );
};

export default AboutUser;
