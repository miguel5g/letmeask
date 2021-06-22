import React, { ButtonHTMLAttributes } from 'react';

import '../styles/components/button.scss';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => <button className="button" {...props} />;
