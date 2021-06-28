import React, { useCallback, memo } from 'react'
import { Menu } from 'antd';
import UserPost from './UserPost';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clickCategoryAction, LOAD_CATEGORY_REQUEST, LOAD_DETAILCATEGORY_REQUEST } from '../redux/reducer/post';
import { Link, Route, Switch } from 'react-router-dom';
import Category from './Category';
import { useRef } from 'react';
const SubMenuComponent = () => {

    const { isLogging } = useSelector(state => state.user);
    const { categoryPosts, clickCategory } = useSelector(state => state.posts);
    const timeout = useRef(null);
    const dispatch = useDispatch();

    const onClickCategory = useCallback((index) => () => {
        // if (timeout.current) {
        //     clearTimeout(timeout.current)
        // }
        // dispatch(clickCategoryAction(clickCategory));
        // timeout.current = setTimeout(() => {
        //     return dispatch(clickCategoryAction(clickCategory));
        // }, 0);
        console.log(index)

        dispatch({
            type: LOAD_CATEGORY_REQUEST,
            data: index
        })
    }, [])

    const onClickDetailCategory = useCallback((index) => () => {
        dispatch(clickCategoryAction(clickCategory))
        dispatch({
            type: LOAD_DETAILCATEGORY_REQUEST,
            data: index
        })
    })

    return (
        <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
        >
            {categoryPosts && categoryPosts.map((val, idx) => (
                <Menu.SubMenu
                    key={`sub${val.category}${idx}`}
                    title={
                        <Link to={`/category/${val.id}`}>
                            <span onClick={onClickCategory(val.id)}>{val.category}[<span>{val.Posts.length}</span>]</span>
                        </Link>
                    }
                >
                    {val.Posts.map((subVal, subIdx) => (
                        <Menu.Item key={`subList${subIdx}`}>
                            <Link to={`/category/${val.id}/${subVal.id}`} onClick={onClickDetailCategory(subVal.id)} >
                                {subVal.title}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>

            ))}
            {isLogging && <UserPost />}
        </Menu>
    );
}

export default memo(SubMenuComponent);