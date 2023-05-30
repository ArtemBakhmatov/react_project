import React, { useMemo, useState } from "react";

import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import MyButton from "./components/UI/button/MyButton";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Descriptionqwedq'},
		{id: 2, title: 'HTML', body: 'Descriptioqwfefwn'},
		{id: 3, title: 'CSS', body: 'Descriptionwqefgseewe'}
	]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	// Получаем post из дочернего элемента	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	const [filter, setFilter] = useState({sort: '', query: ''});

	const sortedPosts = useMemo(() => {
		console.log('sdfjjsjfjl');
		if (filter.sort) {
			[...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
		}
		return posts;
	}, [filter.sort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
	}, [filter.query, sortedPosts]);

	//modal
	const [modal, setModal] = useState(false);
	

	return (
		<div className="App">
			<MyButton 
				style={{marginTop: '30px'}}
				onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal} >
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{margin: '15px 0'}} />
			<PostFilter 
				filter={filter} 
				setFilter={setFilter} 
			/>
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про вебразработку' />	
		</div>
	);
}

export default App;
