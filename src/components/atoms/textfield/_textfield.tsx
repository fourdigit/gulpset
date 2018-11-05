import React from 'react';
import { DefaultProps, mapModifiers } from 'components/_utils';

export interface TextfieldProps extends DefaultProps {
  label?: string;
  type?: string;
}

export default ({ type = 'text', label = 'label', modifiers = [] }: TextfieldProps) => (
  <div className={mapModifiers('m-formgroup', modifiers)}>
    {label}
    <input className="a-textfield__body" type={type} />
  </div>
);
