import React, { ForwardedRef, forwardRef, RefObject, useCallback, useRef, VFC } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Chat from '@components/Chat';
import { Scrollbars, positionValues } from 'react-custom-scrollbars';

import { ChatZone, Section, StickyHeader } from './style';
import { IChat, IDM } from '@typings/db';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean;
  scrollRef: RefObject<Scrollbars>;
}

const ChatList: VFC<Props> = ({ chatSections, isEmpty, isReachingEnd, setSize, scrollRef }) => {
  const onScroll = useCallback((values: positionValues) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      setSize((prevSize) => prevSize + 1).then(() => {});
      console.log('상단');
      if (scrollRef?.current) scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight);
    }
  }, []);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => {
                return <Chat key={chat.id} data={chat} />;
              })}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatList;
