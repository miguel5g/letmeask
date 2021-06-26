import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  FiSun,
  FiMoon,
  FiCheckCircle,
  FiMessageSquare,
  FiThumbsUp,
  FiTrash,
} from 'react-icons/fi';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { Loading } from '../components/Loading';

import { useRoom } from '../hooks/useRoom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import {
  EmptyQuestions,
  HeaderContainer,
  IconButton,
  QuestionList,
  RoomContainer,
} from '../styles/pages/Room';

type RoomParams = {
  id: string;
};

export const AdminRoom: React.FC = () => {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const { title, questions, isAdmin, isLoading } = useRoom(roomId);

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      toast.error('Você não pode acessar esta página');
      history.replace('/');
    }
  }, [isAdmin, isLoading, history]);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
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
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
            <Button isOutlined aria-label="Inverter tema" onClick={toggleTheme}>
              {theme.title === 'light' ? <FiMoon /> : <FiSun />}
            </Button>
          </div>
        </div>
      </HeaderContainer>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

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
                    <>
                      <IconButton
                        type="button"
                        aria-label="Marcar como gostei"
                        color={
                          question.likeId ? theme.colors.purple : undefined
                        }
                        onClick={() =>
                          handleLikeQuestion(question.id, question.likeId)
                        }
                      >
                        {question.likeCount > 0 && (
                          <span>{question.likeCount}</span>
                        )}
                        <FiThumbsUp size={24} />
                      </IconButton>
                      <IconButton
                        aria-label="Marcar pergunta como respondida"
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <FiCheckCircle size={24} />
                      </IconButton>
                      <IconButton
                        type="button"
                        aria-label="Dar destaque à pergunta"
                        color={
                          question.isHighlighted
                            ? theme.colors.purple
                            : undefined
                        }
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <FiMessageSquare size={24} />
                      </IconButton>
                    </>
                  )}
                  <IconButton
                    type="button"
                    aria-label="Remover pergunta"
                    hoverColor={theme.colors.hoverDanger}
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <FiTrash size={24} />
                  </IconButton>
                </Question>
              );
            })
          ) : (
            <EmptyQuestions>
              <img src={emptyQuestionsImg} alt="Nenhuma pergunta" />
              <strong>Nenhuma pergunta por aqui...</strong>
              <span>
                Envie o código desta sala para seus amigos e comece a responder
                perguntas!
              </span>
            </EmptyQuestions>
          )}
        </QuestionList>
      </main>
    </RoomContainer>
  );
};
