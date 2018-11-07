import * as React from 'react';
import { DefaultProps, mapModifiers } from '../../_utils';

export interface TextfieldProps extends DefaultProps {
  label?: string;
  type?: string;
}

export const Textfield = ({ type = 'text', label = 'label', modifiers = [] }: TextfieldProps) => (
  <div className={mapModifiers('m-formgroup', modifiers)}>
    {label}
    <input className="a-textfield__body" type={type} />
  </div>
);

export default Textfield;
