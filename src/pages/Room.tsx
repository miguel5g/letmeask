import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiSun, FiMoon, FiThumbsUp, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { Loading } from '../components/Loading';

import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import {
  EmptyQuestions,
  FormContainer,
  HeaderContainer,
  IconButton,
  QuestionList,
  RoomContainer,
} from '../styles/pages/Room';

type RoomParams = {
  id: string;
};

export const Room: React.FC = () => {
  const { user, signInWithGoogle, singOut } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const history = useHistory();

  const roomId = params.id;

  const { theme, toggleTheme } = useTheme();
  const { title, questions, isLoading, isClosed, roomExist } = useRoom(roomId);

  async function handleSendQuestion(event: React.FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (!user) return toast.error('Você precisa estar conectado');

    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  useEffect(() => {
    if (!isLoading && isClosed) {
      history.replace('/');
      toast.error('Sala encerrada');
    }
  }, [history, isClosed, isLoading]);

  useEffect(() => {
    if (!isLoading && !roomExist) {
      history.replace('/');
      toast.error('Sala não encontrada');
    }
  }, [history, roomExist, isLoading]);

  return (
    <RoomContainer>
      {isLoading && <Loading />}

      <HeaderContainer>
        <div>
          <img
            src={theme.title === 'light' ? logoImg : logoDarkImg}
            alt="Letmeask"
          />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined aria-label="Inverter tema" onClick={toggleTheme}>
              {theme.title === 'light' ? <FiMoon /> : <FiSun />}
            </Button>
            {user && (
              <Button isOutlined onClick={singOut} aria-label="Encerrar sessão">
                <FiLogOut />
              </Button>
            )}
          </div>
        </div>
      </HeaderContainer>

      <main>
        <div>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <FormContainer onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <footer>
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{' '}
                <button onClick={signInWithGoogle}>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </footer>
        </FormContainer>

        <QuestionList>
          {questions.length > 0 ? (
            questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <IconButton
                      type="button"
                      aria-label="Marcar como gostei"
                      color={question.likeId ? theme.colors.purple : undefined}
                      onClick={() =>
                        handleLikeQuestion(question.id, question.likeId)
                      }
                    >
                      {question.likeCount > 0 && (
                        <span>{question.likeCount}</span>
                      )}
                      <FiThumbsUp size={24} />
                    </IconButton>
                  )}
                </Question>
              );
            })
          ) : (
            <EmptyQuestions>
              <img src={emptyQuestionsImg} alt="Nenhuma pergunta" />
              <strong>Nenhuma pergunta por aqui...</strong>
              <span>
                Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
              </span>
            </EmptyQuestions>
          )}
        </QuestionList>
      </main>
    </RoomContainer>
  );
};
