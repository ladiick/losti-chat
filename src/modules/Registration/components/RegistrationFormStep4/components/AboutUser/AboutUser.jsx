import { CalendarMonth } from "@mui/icons-material";
import { Input, Radio, RadioGroup } from "@mui/joy";
import React from "react";
import FormWrapperLabel from "../../../../../../components/FormWrapper/FormWrapperLabel/FormWrapperLabel";

const AboutUser = ({ errors, register, setValue }) => {
  const toggleRadio = ({ target: { value } }) => {
    setValue("gender", value);
  };

  return (
    <>
      <FormWrapperLabel errors={errors?.birth_date} title="Дата рождения">
        <Input
          endDecorator={<CalendarMonth />}
          sx={{
            "input[type='date']::-webkit-inner-spin-button, input[type='date']::-webkit-calendar-picker-indicator":
              {
                display: "none",
                "-webkit-appearance": "none",
                background: "transparent",
              },
          }}
          type="date"
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
      </FormWrapperLabel>

      <FormWrapperLabel defaultValue="male" errors={errors?.gender} title="Пол">
        <RadioGroup
          onChange={toggleRadio}
          orientation="horizontal"
          sx={{ justifyContent: "center" }}
        >
          <Radio
            type="radio"
            value="m"
            label="Мужчина"
            {...register("gender", {
              required: "Необходимо заполнить",
            })}
          />

          <Radio
            type="radio"
            value="f"
            label="Женщина"
            {...register("gender", {
              required: "Необходимо заполнить",
            })}
          />
        </RadioGroup>
      </FormWrapperLabel>
    </>
  );
};

export default AboutUser;
