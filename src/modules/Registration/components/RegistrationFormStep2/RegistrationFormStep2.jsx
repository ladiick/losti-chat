import { InfoOutlined } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, Typography } from "@mui/joy";
import { useTheme } from "@mui/joy/styles";
import React, { useEffect, useState } from "react";
import { PinInput } from "react-input-pin-code";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRegistrationSteps } from "../../store/registrationStepsSlice";
import { useCheckAuthCodeMutation } from "./api/checkAuthCodeApiSlice";

const RegistrationFormStep2 = () => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const [btnDisable, setBtnDisable] = useState(false);

  const [codeError, setCodeError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [checkAuthCode] = useCheckAuthCodeMutation();

  const theme = useTheme();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/registration");
    }
  }, [navigate]);

  useEffect(() => {
    const val = values.join("");
    if (val.length === 6) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [values, btnDisable]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const code = values.join("");
    localStorage.setItem("code", code);
    if (!code.length) {
      setCodeError("Пин-код пуст");
      return;
    }
    try {
      await checkAuthCode(code).unwrap();
      dispatch(setRegistrationSteps({ code }));
      navigate("/registration/password");
    } catch (err) {
      if (err.response.data.type === 3) {
        setValues(["", "", "", "", "", ""]);
        setCodeError("Код введен неверно");
      }
    }
  };

  return (
    <>
      <div>
        <Typography component="h1" fontSize="xl2" fontWeight="lg">
          На {localStorage.getItem("email")} отправлен код активации
        </Typography>
        <Typography level="body-sm" sx={{ my: 1, mb: 3 }}>
          Введите код ниже
        </Typography>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <FormControl sx={{ alignItems: "center" }}>
          <PinInput
            size="sm"
            autoFocus={true}
            values={values}
            autoTab={true}
            borderColor={theme.vars.palette.neutral.outlinedBorder}
            errorBorderColor={theme.vars.palette.danger.outlinedBorder}
            focusBorderColor={theme.vars.palette.primary.outlinedBorder}
            inputStyle={{
              color: theme.vars.palette.neutral.outlinedColor,
              backgroundColor: theme.vars.palette.background.surface,
              borderRadius: theme.vars.radius.sm,
            }}
            placeholder="●"
            validBorderColor={theme.vars.palette.success.outlinedBorder}
            aria-label={codeError}
            required={true}
            onBlur={() => {
              setCodeError("");
            }}
            onChange={(value, index, values) => setValues(values)}
          />
          {codeError && (
            <FormHelperText>
              <InfoOutlined />
              {codeError}
            </FormHelperText>
          )}
        </FormControl>

        <Button disabled={!btnDisable}>Продолжить</Button>
      </form>
    </>
  );
};

export default RegistrationFormStep2;
