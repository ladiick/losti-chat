import React, { useEffect } from "react";

import FormWrapper from "../../components/FormWrapper/FormWrapper";
import AuthorizationForm from "../../modules/Authorization/components/AuthorizationForm/AuthorizationForm";

const Authorization = () => {
  useEffect(() => {
    document.title = "Авторизация";
  }, []);

  return (
    <FormWrapper>
      <AuthorizationForm />
    </FormWrapper>
  );
};

export default Authorization;
