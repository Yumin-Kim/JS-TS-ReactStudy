import React from 'react'
import { Menu } from 'antd';
const { SubMenu } = Menu;
import UserPost from './UserPost';

const dummyData = {
    isLoggin: true,
    categoryPosts:[
        {
            title: 'javascript',
            subList: [
                {
                    title: '자바스크립트 연습중',
                    id: '1',
                },
                {
                    title: 'async await연습',
                    id: '2',
                }
            ],
        }, {
            title: 'TypeScript',
            subList: [
                {
                    title: 'TypeScript 사용하는 이유',
                    id: '1',
                },
                {
                    title: 'tsconfig.js',
                    id: '2',
                }
            ],
    
        }
    ]
}

const SubMenuComponent = () => {
    return (
        <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
        >
            {dummyData.categoryPosts.map((val, idx) => (
                <SubMenu
                    key={`sub${val}${idx}`}
                    title={<span>{val.title}</span>}
                >
                    {val.subList.map((val, idx) => (
                        <Menu.Item key={`subList${idx}`}>{val.title}</Menu.Item>
                    ))}
                </SubMenu>

            ))}
            {dummyData.isLoggin && <UserPost /> }
        </Menu>
    );
}

export default SubMenuComponent;