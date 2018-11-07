import * as React from 'react';
import { DefaultProps, mapModifiers } from '../../_utils';

export interface FormgroupProps extends DefaultProps {
  label?: string;
  children?: any;
}

export const FormGroup = ({
  label = 'ラベルをいれてください',
  modifiers = [],
  children = <p>コンテンツを挿入してください</p>
}: FormgroupProps) => (
  <div className={mapModifiers('a-btn', modifiers)}>
    <label className="m-formgroup__label">{label}</label>
    <div className="m-formgroup__body">{children}</div>
  </div>
);

export default FormGroup;
