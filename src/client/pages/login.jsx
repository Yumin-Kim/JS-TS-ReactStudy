import React, { useState , useCallback } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement("#root");

const inputhooks = (init = null) => {
    const [state, setState] = useState(init);
    const handleonChange = useCallback((e) => {
        setState(e.target.value);
    },[init])
    return [state, handleonChange];
}


const Login = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [state, setState] = useState('');
    const [ id , onchangeID ] = inputhooks('')

    console.log("Login Props", props);

    const onSubmitEvent = (e) => {
        e.preventDefault();
        console.log("onSubmitEvent");
        //redux 처리
    }

    const onchangeID1 = (e) => {
        setState(e.target.value)
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
            <div>Login Form</div>
            <form onSubmit={onSubmitEvent} >
                <p>
                    <label> 아이디 :</label>
                    <input type="text" value={id} onChange={onchangeID}  placeholder="id를 입력하세요" />
                </p>
                <p>
                    <label> 비밀번호 :</label>
                    <input type="password" value={state} onChange={onchangeID1} placeholder="Password를 입력하세요" />
                </p>
                <button type="submit" >로그인</button>
                <div>
                    <button type="submit" onClick={handleOpenModal}  >회원 가입</button>
                    <ReactModal
                        isOpen={showModal}
                        contentLabel="Show Modal"
                        onRequestClose={handleCloseModal}
                    >
                        <p>Modal text</p>
                        <button onClick={handleCloseModal} >Close Mdoal</button>
                    </ReactModal>
                </div>
            </form>
        </>
    );
}

export default Login;