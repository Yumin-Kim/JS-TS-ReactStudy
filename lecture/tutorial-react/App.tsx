import * as React from 'react'
import { Component } from 'react';
import { connect } from 'react-redux';
import { logIn, logout, UserData, ThunkDispatch } from './actions/user';
import { UserState } from './reducer/user';
import { Dispatch } from 'redux';
import { RootState } from './reducer';

interface Props {
    dispatchLogIn: ({ id, password }: { id: string, password: string }) => void;
    dispatchLogOut: () => void;
    user: UserState;
    posts:string[]
}

class App extends Component<Props> {

    onClick = () => {
        this.props.dispatchLogIn({
            id: 'Hello',
            password: 'password',
        })
    }

    onLogout = () => {
        this.props.dispatchLogOut();
    }

    render() {
        const { user, posts } = this.props
        return (
            <div>
                {user.isLoggingIn
                    ? <div>로그인 중</div>
                    : user.data
                ? <div>{user.data.nickname}////{posts.map((v,i)=><p key={v+i} >{v}</p>)}</div>
                        : '로그인 해주세요.'}
                {!user.data
                    ? <button onClick={this.onClick}>로그인</button>
                    : <button onClick={this.onLogout}>로그아웃</button>}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    user: state.user,
    posts: state.posts,
})

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    dispatchLogIn: (data: UserData) => dispatch(logIn(data)),
    dispatchLogOut: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);