import React from "react";
import { Login, LoginForm } from "react-admin";

import { ForgotPassword } from "../ForgotPasswordPage";

const CustomLoginForm = (props: any) => (
  <div>
    <LoginForm {...props} />
    <ForgotPassword {...props} />
  </div>
);

export const LoginPage = (props: any) => (
  <Login {...props}>
    <CustomLoginForm {...props} />
  </Login>
);
