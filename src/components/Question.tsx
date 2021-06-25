import React from 'react';

import {
  QuestionContainer,
  UserInfoContainer,
} from '../styles/components/Question';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

export const Question: React.FC<QuestionProps> = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}) => {
  return (
    <QuestionContainer isAnswered={isAnswered} isHighlighted={isHighlighted}>
      <p>{content}</p>
      <footer>
        <UserInfoContainer>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfoContainer>
        <div>{children}</div>
      </footer>
    </QuestionContainer>
  );
};
