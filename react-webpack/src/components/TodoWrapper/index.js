import React, { useState, useEffect } from 'react'
import axios from 'axios'
import s from './style.scss'
import TodoTitle from '../TodoTitle'
import TodoList from '../TodoList'


const TodoWrapper = () => {
    const [todoList, setTodoList] = useState([])

    const getTodoList = async () => {
        try {
            const { data: todoList } = await axios.get(
                'https://jsonplaceholder.typicode.com/todos'
            )
            setTodoList(todoList.splice(0, 10))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTodoList()
    }, [])

    // const onClickInstall = () => {
    //     let deferredPrompt;

    //     window.addEventListener('beforeinstallprompt', function(event) {
    //       // Prevent Chrome 67 and earlier from automatically showing the prompt
    //       event.preventDefault();
    //       // Stash the event so it can be triggered later.
    //       deferredPrompt = event;
    //     });
    //     if(deferredPrompt === null) deferredPrompt = window;
    //     console.log(this)
    //     console.log(deferredPrompt)
    //     deferredPrompt.prompt();
    //     // Wait for the user to respond to the prompt
    //     deferredPrompt.userChoice
    //         .then((choiceResult) => {
    //             if (choiceResult.outcome === 'accepted') {
    //                 console.log('User accepted the A2HS prompt');
    //             } else {
    //                 console.log('User dismissed the A2HS prompt');
    //             }
    //             deferredPrompt = null;
    //         })
    // };

    const addToHomeScreen = () => {
        //@ts-ignore
        debugger
        console.log(window);
        debugger
        console.log(window.promptEvent);
        debugger
        window.prompt();
        //@ts-ignore
        window.promptEvent.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
        })
    }

    return (
        <div className={s.wrapper}>
            <button onClick={addToHomeScreen} >Install</button>
            <TodoTitle />
            <TodoList todoList={todoList} />
        </div>
    )
}

export default TodoWrapper
