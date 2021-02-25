import useInput from '@hooks/useInput';
import React, { useCallback } from 'react';

import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import { Container, Header } from './style';

// {/* Workspace 매개변수인 Children은 공유 될 수 있다. */}
const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat('');
    console.log('asd');
  }, []);

  return (
    <Container>
      <Header>Channel</Header>
      <ChatList />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
