import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';

import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';

import {
  HeaderContainer,
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

  const { theme, toggleTheme } = useTheme();

  const { title, questions } = useRoom(roomId);

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

  return (
    <RoomContainer>
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
          {questions.map((question) => {
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
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </QuestionList>
      </main>
    </RoomContainer>
  );
};
