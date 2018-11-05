
import React from 'react';

export interface BtnProps {
  type?: string;
  children?: string;
  className?: string;
}

export default ({
  type = 'summit',
  children = 'Summit',
  className
}: BtnProps) => (
  <button className={className ? `a-btn ${className}` : 'a-btn'} type={type}>
    {children}
  </button>
);
