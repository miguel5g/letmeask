import React, { ButtonHTMLAttributes } from 'react';

import { ButtonContainer } from '../styles/components/Button';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  isOutlined = false,
  ...props
}) => <ButtonContainer isOutlined={isOutlined} {...props} />;
