import { IDM, IChat } from '@typings/db';
import React, { VFC, memo, useMemo } from 'react';
import { ChatWrapper } from '@components/Chat/style';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link, useParams } from 'react-router-dom';

interface Props {
  data: IDM | IChat;
}

const Chat: VFC<Props> = ({ data }) => {
  const user = 'Sender' in data ? data.Sender : data.User;
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  //자식 컴포넌트의 props변화가 없을때 랜더링 방지 memo
  // useMemo 오랜시간이 걸리는 연산을하는 함수를 묶어서 [변수] 변수의 변화가 없으면 실행 안되게 막음
  const result = useMemo(() => {
    return regexifyString({
      input: data.content,
      pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
      decorator(match, index) {
        const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
        if (arr) {
          return (
            <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
              @{arr[1]}
            </Link>
          );
        }
        return <br key={index} />;
      },
    });
  }, [data.content]);

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);
