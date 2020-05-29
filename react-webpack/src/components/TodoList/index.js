import React from 'react'
import s from './style.scss'

const TodoList = ({ todoList }) => {
    const todoItem = todoList.map(({ id, title }) => {
        return (
            <div key={id} className={s.todoItem}>
                {title}
            </div>
        )
    })
    return <div className={s.wrapper}>{todoItem}</div>
}

export default TodoList
