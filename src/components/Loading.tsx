import React from 'react';

import infinityLoadingImg from '../assets/images/Infinity-loading.svg';

import { LoadingContainer } from '../styles/components/Loading';

export const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <img src={infinityLoadingImg} alt="Carregando..." />
    </LoadingContainer>
  );
};
