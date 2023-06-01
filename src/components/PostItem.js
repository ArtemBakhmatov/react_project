import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom';

const PostItem = (props) => {
    const {title, body} = props.post;
    const {number, remove, post} = props;
    const router = useNavigate();
    return (
        <div className="post">
            <div className="post__content">
                <strong>{post.id}. {title}</strong>
                <div>
                    {body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton 
                    onClick={() => router(`/posts/${post.id}`)} >
                        Окрыть
                </MyButton>
                <MyButton 
                    onClick={() => remove(post)} >
                        Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;