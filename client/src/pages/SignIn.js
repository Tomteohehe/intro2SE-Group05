import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import Input from "../components/input/Input";
import { Label } from "../components/label";
import AuthenticationPage from "./AuthenticationPage";
import { toast } from "react-toastify";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import { authContext } from "../contexts/authContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  username: yup
    .string()
    .email("Your username is not valid!")
    .required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const { loginUser } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Login Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async (values) => {
    const { username, password } = values;
    try {
      const loginData = await loginUser({ username, password });
      if (loginData["success"]) {
        toast.success(`Welcome back, ${loginData["username"]}!`);
        navigate(location.state?.from || "/");
        console.log(loginData.message);
      } else {
        toast.error(loginData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="username" className="label">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        <div className="have-account">
          Not a member? <NavLink to={"/sign-up"}>Sign up here</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
