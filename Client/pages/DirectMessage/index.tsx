import React, { useCallback, useEffect, useRef } from 'react';
import gravatar from 'gravatar';
import useSWR, { useSWRInfinite } from 'swr';
import { useParams } from 'react-router-dom';

import { Header } from './style';
import { Container } from '@pages/Channel/style';
import { IDM } from '@typings/db';
import fetcher from '@utils/fetcher';

import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import axios from 'axios';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars';
import useSocket from '@hooks/useSocket';

const DirectMessage = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const { workspace, id } = useParams<{ workspace: string; id: string }>();

  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const [socket] = useSocket(workspace);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReeachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const scorllbarsRef = useRef<Scrollbars>(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(chat);
      //optimisitic UI 구현
      //먼저 화면을 그린 다음 데이터요청을 보낸다
      // 성공 여부에 따른 처리도 필요하지만 무조건 성공한다고 전제하에 이와 같이 구현한다.
      if (chat?.trim() && chatData) {
        const savedChat = chat;
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scorllbarsRef.current?.scrollToBottom();
        });
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
    [chat, myData, chatData, userData, workspace, id],
  );

  const onMessage = useCallback((data: IDM) => {
    if (data.SenderId === Number(id) && myData.id !== Number(myData.id)) {
      mutateChat((chatData) => {
        chatData?.[0].unshift(data);
        return chatData;
      }, false).then(() => {
        if (scorllbarsRef.current) {
          if (
            scorllbarsRef.current.getScrollHeight() <
            scorllbarsRef.current.getClientHeight() + scorllbarsRef.current.getScrollTop() + 150
          ) {
            scorllbarsRef.current.scrollToBottom();
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    if (chatData?.length === 1) {
      scorllbarsRef.current?.scrollToBottom();
    }
  }, [chatData]);

  if (!userData || !myData) return null;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>{' '}
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollRef={scorllbarsRef}
        setSize={setSize}
        isEmpty={isEmpty}
        isReachingEnd={isReeachingEnd}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default DirectMessage;
