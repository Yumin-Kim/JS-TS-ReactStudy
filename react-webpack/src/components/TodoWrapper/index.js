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

    const onClickInstall = () => {
        Notification.requestPermission()
            .then(e => { console.log("success",e) })
            .catch(error=>{ console.log("error",error) })
    };
  
    return (
        <div className={s.wrapper}>
            <button onClick={onClickInstall} >Install</button>
            <TodoTitle />
            <TodoList todoList={todoList} />
        </div>
    )
}

export default TodoWrapper
