import React from 'react';

import PostItem from './PostItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({remove, posts, title}) => {
    if (!posts.length) {
        return (
            <div 
			    style={{textAlign: 'center', fontWeight: "bold", fontSize: 18}}>
                    Посты не найдены!
            </div>
        )
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
				{title}
			</h1>
            <TransitionGroup>
                {posts.map((post, i) => 
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames='post'
                    >
                        <PostItem remove={remove} number={i + 1} post={post} key={post.id} />
                    </CSSTransition>  
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;