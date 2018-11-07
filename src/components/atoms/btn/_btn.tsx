import * as React from 'react';
import { DefaultProps, mapModifiers } from 'components/_utils';

export interface BtnProps extends DefaultProps {
  children?: string;
}

export const Btn = ({ children = 'Summit', modifiers = [] }: BtnProps) => (
  <button className={mapModifiers('a-btn', modifiers)}>{children}</button>
);

export default Btn;
