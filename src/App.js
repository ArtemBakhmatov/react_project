import React, { useRef, useState } from "react";

import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Description'},
		{id: 2, title: 'HTML', body: 'Description'},
		{id: 3, title: 'CSS', body: 'Description'}
	]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	}

	// Получаем post из дочернего элемента	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}


	return (
		<div className="App">
			<PostForm create={createPost} />
			{posts.length !== 0
				? 
					<PostList remove={removePost} posts={posts} title='Посты про вебразработку' />
				: 
					<div 
						style={{textAlign: 'center', fontWeight: "bold", fontSize: 18}}>
							Посты не найдены!
					</div>
			}
				
		</div>
	);

	// type='submit' нужен когда мы отправляем на сервер, сейчас он нам не нужен
}

export default App;
