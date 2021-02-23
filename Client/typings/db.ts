export interface WorkspaceDateType {
  createdAt: string;
  updatedAt: string;
  deleatedAt?: string | null;
}

export interface WorkspaceMemberType extends WorkspaceDateType {
  UserId: number;
  WorkspaceId: number;
  loggedInAt: string;
}

export interface WorkspacesData extends WorkspaceDateType {
  id: number;
  name: string;
  OwnerId: null | number | string;
  WorkspaceMember: WorkspaceMemberType;
  email: string;
}

export interface SWRUserData {
  email: string;
  id: number;
  nickname: string;
  Workspaces: Array<WorkspacesData>;
}

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  Workspaces: IWorkspace[];
}

export interface IUserWithOnline extends IUser {
  online: boolean;
}

export interface IChannel {
  id: number;
  name: string;
  private: boolean;
  WorkspaceId: number;
}

export interface IChat {
  id: number;
  UserId: number;
  User: IUser;
  content: string;
  createdAt: Date;
  ChannelId: number;
  Channel: IChannel;
}

export interface IDM {
  id: number;
  SenderId: number;
  Sender: IUser;
  ReceiverId: number;
  Receiver: IUser;
  content: string;
  createdAt: Date;
}

export interface IWorkspace {
  id: number;
  name: string;
  url: string;
  OwnerId: number;
}
