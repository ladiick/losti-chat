import { InfoOutlined } from "@mui/icons-material";
import { FormControl, FormHelperText, FormLabel } from "@mui/joy";
import React from "react";

const FormWrapperLabel = ({ errors, title, children, descriptionTitle, ...props }) => {
  return (
    <FormControl error={!!errors} {...props}>
      <FormLabel>{title}</FormLabel>
      {children}
      {errors && (
        <FormHelperText>
          <InfoOutlined />
          {errors?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormWrapperLabel;
