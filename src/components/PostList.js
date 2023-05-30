import React from 'react';

import PostItem from './PostItem';

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
			{posts.map((post, i) => 
				<PostItem remove={remove} number={i + 1} post={post} key={post.id} />
			)}
        </div>
    );
};

export default PostList;