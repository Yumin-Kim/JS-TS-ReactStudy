import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
  title: 'Example/Storybook Knobs',
  decorators: [withKnobs],
};
export const withAButton = () => (
  <button disabled={boolean('Disabled', false)}>{text('Label', 'Hello Storybook')}</button>
);

export const asDynamicVariables = () => {
  const name = text('Name', 'James');
  const age = number('Age', 35);
  const content = `I am ${name} and I'm ${age} years old.`;
  return <div>{content}</div>;
};