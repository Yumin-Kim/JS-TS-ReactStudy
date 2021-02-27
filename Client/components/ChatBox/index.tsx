import React, { VFC, useCallback, useEffect, useRef } from 'react';
import { ChatArea, EachMention, Form, MentionsTextarea, SendButton, Toolbox } from './style';
import autosize from 'autosize';
import { Mention, SuggestionDataItem } from 'react-mentions';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { SWRUserData } from '@typings/db';
import fetcher from '@utils/fetcher';
import gravatar from 'gravatar';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

const ChatBox: VFC<Props> = ({ chat, onSubmitForm, onChangeChat, placeholder }) => {
  //DOM에 직접 접근

  const { workspace } = useParams<{ workspace: string }>();

  // {data: userdata >> data라는 변수를 userData로 변경하여 사용 할 수 았다}
  const { data: userData, error, revalidate, mutate } = useSWR<SWRUserData>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const { data: memberData } = useSWR<SWRUserData[]>(
    userData! ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const textureRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textureRef.current) {
      autosize(textureRef.current);
    }
  }, []);
  // 재사용되고 공유할 수 있는것들은 SWR사용
  // 재사용되지만 공유하지 않는것들은 부모 컴포넌트로 올려서 재사용한다.

  const onKeydownChat = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  const renderSuggestion = useCallback(
    (
      suggestion: SuggestionDataItem,
      search: string,
      highlightedDisplay: React.ReactNode,
      index: number,
      focus: boolean,
    ): React.ReactNode => {
      if (!memberData) return;
      return (
        <EachMention focus={focus}>
          <img
            src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })}
            alt={memberData[index].nickname}
          />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [memberData],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          placeholder={placeholder}
          inputRef={textureRef}
          allowSuggestionsAboveCursor
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={memberData?.map((v) => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderSuggestion}
          />
        </MentionsTextarea>
        <Toolbox>
          <SendButton
            className={
              'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
              (chat?.trim() ? '' : ' c-texty_input__button--disabled')
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
