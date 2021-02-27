import React, { useCallback } from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';

import { Header } from './style';
import { Container } from '@pages/Channel/style';
import { IDM } from '@typings/db';
import fetcher from '@utils/fetcher';

import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';

const DirectMessage = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: chatData, mutate: mutateChat, revalidate } = useSWR<IDM[]>(
    `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher,
  );
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR(`/api/users`, fetcher);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(chat);

      if (chat?.trim()) {
        console.log('Axios');

        axios
          .post(
            `/api/workspaces/${workspace}/dms/${id}/chats`,
            {
              content: chat,
            },
            {
              withCredentials: true,
            },
          )
          .then(() => {
            revalidate();
            setChat('');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    [chat],
  );

  if (!userData || !myData) return null;

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>{' '}
      </Header>
      <ChatList chatData={chatData} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
