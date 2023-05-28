import React, { useRef, useState } from "react";

import './styles/App.css';
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

function App() {
	const [posts, setPosts] = useState([
		{id: 1, title: 'JavaScript', body: 'Description'},
		{id: 2, title: 'HTML', body: 'Description'},
		{id: 3, title: 'CSS', body: 'Description'}
	]);

	const [title, setTitle] = useState('');
	const bodyInputRef = useRef(); // доступ к дом элементу

	const addNewPost = (e) => {
		e.preventDefault();
		console.log(title);
		console.log(bodyInputRef.current.value); 	// выводится что вводили в поле
		console.log(bodyInputRef.current); 			// выводится <input type="text">
	}


	return (
		<div className="App">
			<form>
				{/* Управляемый компонент */}
				<MyInput 
					value={title}
					onChange={e => setTitle(e.target.value)}
					type="text" 
					placeholder="Название поста" 
				/>
				{/* Неуправляемый компонент */}
				<MyInput 
					ref={bodyInputRef}
					type="text" 
					placeholder="Описание поста" />
				<MyButton onClick={addNewPost}>Создать пост</MyButton>
			</form>
			<PostList posts={posts} title='Посты про вебразработку' />	
		</div>
	);

	// type='submit' нужен когда мы отправляем на сервер, сейчас он нам не нужен
}

export default App;
