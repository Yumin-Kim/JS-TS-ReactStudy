import { Meta, Story } from "@storybook/react";
import React from "react";

import { DropDown } from "./index";

export default {
  title: "Example/DropDown",
  component: DropDown,
} as Meta;

const Template: Story<any> = (args) => <DropDown {...args} />;

export const DropDownCompnent = Template.bind({});
