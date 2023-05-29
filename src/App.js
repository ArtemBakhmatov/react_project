import React, { useMemo, useRef, useState } from "react";

import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Descriptionqwedq'},
		{id: 2, title: 'HTML', body: 'Descriptioqwfefwn'},
		{id: 3, title: 'CSS', body: 'Descriptionwqefgseewe'}
	]);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
	}

	// Получаем post из дочернего элемента	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	const [selectedSost, setSelectedSost] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const sortedPosts = useMemo(() => {
		console.log('sdfjjsjfjl')
		if (selectedSost) {
			[...posts].sort((a, b) => a[selectedSost].localeCompare(b[selectedSost]));
		}
		return posts;
	}, [selectedSost, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post => post.title.toLocaleLowerCase().includes(searchQuery))
	}, [searchQuery, sortedPosts]);

	const sortPosts = (sort) => {
		setSelectedSost(sort);	
	};
	

	return (
		<div className="App">
			<PostForm create={createPost} />
			<hr style={{margin: '15px 0'}} />
			<div>
				<MyInput
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск...'
				/>
				<MySelect
					value={selectedSost}
					onChange={sortPosts}
					defaultValue='Сортировка'
					options={[
						{value: 'title', name: 'По названию'},
						{value: 'body', name: 'По описанию'}
					]}
				/>
			</div>
			{sortedAndSearchedPosts.length !== 0
				? 
					<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про вебразработку' />
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
