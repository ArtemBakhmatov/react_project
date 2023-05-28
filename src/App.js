import React, { useState } from "react";

import './styles/App.css';
import PostList from "./components/PostList";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Description'},
		{id: 2, title: 'HTML', body: 'Description'},
		{id: 3, title: 'CSS', body: 'Description'}
	]);

	const [posts2, setPosts2] = useState([
		{id: 1, title: 'Python', body: 'Description'},
		{id: 2, title: 'C++', body: 'Description'},
		{id: 3, title: 'Java', body: 'Description'}
	]);

	return (
		<div className="App">
			<PostList posts={posts} title='Посты про вебразработку' />
			<PostList posts={posts2} title='Посты про програмирование' />
			
		</div>
	);
}

export default App;
