import React, { useCallback, useRef, VFC } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

import { ChatZone, Section } from './style';
import { IDM } from '@typings/db';

interface Props {
  chatData?: IDM[];
}

const ChatList: VFC<Props> = ({ chatData }) => {
  const scrollbarsRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollbarsRef} onScrollFrame={onScroll}>
        {chatData?.map((chat) => (
          <Chat key={chat.id} data={chat} />
        ))}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
