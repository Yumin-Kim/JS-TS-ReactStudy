import WorkSpace from '@layouts/Workspace';
import React from 'react';

const Channel = () => {
  return (
    <WorkSpace>
      {/* Workspace 매개변수인 Children은 공유 될 수 있다. */}
      <div>로그인 성공</div>
    </WorkSpace>
  );
};

export default Channel;
