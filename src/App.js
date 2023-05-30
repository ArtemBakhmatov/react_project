import React, { useEffect, useState } from "react";

import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hook/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [isPostLoading, setIsPostLoading] = useState(false);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	async function fetchPosts() {
		setIsPostLoading(true);
		setTimeout(async () => {
			const posts = await PostService.getAll();
			setPosts(posts);
			setIsPostLoading(false);
		}, 1000);
		
	}

	// Получаем post из дочернего элемента	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	useEffect(() => {
		fetchPosts();
	}, []);// [] -> если пустой массив, то сроботает один раз
	
	return (
		<div className="App">
			<button onClick={fetchPosts}>GET POSTS</button>
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
			{isPostLoading
				? 
					<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
						<Loader />
					</div>
				:
					<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про вебразработку' />	
			}
			
		</div>
	);
}

export default App;
