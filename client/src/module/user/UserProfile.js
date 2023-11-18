import React, { useEffect } from "react";
import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import TextArea from "components/input/TextArea";

const UserProfile = () => {
  const {
    control,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form>
        <div className="flex items-center solo-form-layout">
          <Field>
            <ImageUpload></ImageUpload>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Contact Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
        </div>
        <div className="solo-form-layout">
          <Label>Description</Label>
          <TextArea
            control={control}
            name="textarea"
            placeholder="Write something about you"
          ></TextArea>
        </div>
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
