import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { InputField } from "./InputField";
import React, { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    type: "text",
    value: "",
    onChange: () => {},
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    value: "",
    onChange: () => {},
    minLength: 6,
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Password"
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        minLength={6}
      />
    );
  },
};
