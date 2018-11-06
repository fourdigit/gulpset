import React from 'react';
import { DefaultProps, mapModifiers } from 'components/_utils';

export interface FormgroupProps {
  label?: string,
  modifiers: string[];
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
