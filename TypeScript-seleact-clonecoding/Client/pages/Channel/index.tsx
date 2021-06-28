import useInput from '@hooks/useInput';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR, { useSWRInfinite } from 'swr';
import { Scrollbars } from 'react-custom-scrollbars';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import gravatar from 'gravatar';

import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import { Container, Header } from './style';
import makeSection from '@utils/makeSection';
import fetcher from '@utils/fetcher';
import { IChannel, IChat, IDM, IUser } from '@typings/db';
import useSocket from '@hooks/useSocket';
import InviteChannelModal from '@components/InviteChannelModal';

// {/* Workspace 매개변수인 Children은 공유 될 수 있다. */}
const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: myData } = useSWR(`/api/users`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IChat[]>(
    (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const { data: channelData } = useSWR<IChannel>(`/api/workspace/${workspace}/channels/${channel}`, fetcher);
  const { data: channelMembersData } = useSWR<IUser[]>(
    myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
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
      if (chat?.trim() && chatData && channelData) {
        const savedChat = chat;
        mutateChat((prevChatData) => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: myData.id,
            User: myData,
            ChannelId: channelData.id,
            Channel: channelData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scorllbarsRef.current?.scrollToBottom();
        });
        axios
          .post(
            `/api/workspaces/${workspace}/channels/${channel}/chats`,
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
    [chat, myData, chatData, channelData, workspace, channel],
  );

  const onMessage = useCallback(
    (data: IChat) => {
      if (data.Channel.name === channel && data.UserId !== myData?.id) {
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
    },
    [channel, myData],
  );

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    if (chatData?.length === 1) {
      scorllbarsRef.current?.scrollToBottom();
    }
  }, [chatData]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  }, []);

  if (!myData) return null;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container>
      <Header>
        <span>#{channel}</span>{' '}
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      <ChatList
        chatSections={chatSections}
        scrollRef={scorllbarsRef}
        setSize={setSize}
        isEmpty={isEmpty}
        isReachingEnd={isReeachingEnd}
      />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </Container>
  );
};

export default Channel;
