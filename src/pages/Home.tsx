import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import {
  AuthContainer,
  CreateRoomButton,
  MainContainer,
  Separator,
} from '../styles/pages/Auth';

export const Home: React.FC = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const { theme } = useTheme();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: React.FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Sala não existe');
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Sala já foi encerrada');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <AuthContainer>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <MainContainer>
        <div>
          <img
            src={theme.title === 'light' ? logoImg : logoDarkImg}
            alt="Letmeask"
          />
          <CreateRoomButton onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </CreateRoomButton>

          <Separator>ou entre em uma sala</Separator>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </MainContainer>
    </AuthContainer>
  );
};
