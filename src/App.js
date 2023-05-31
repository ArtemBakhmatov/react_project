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
import { useFething } from "./hook/useFething";
import { getPageCount, getPagesArray } from "./utils/pages";

function App() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [totalPages, setTotalPages] = useState(0); 	// Обшее количество постов
	const [limit, setLimit] = useState(10);				// Кол-во постов на одной странице
	const [page, setPage] = useState(1);				// Первая страница
	let pagesArray = getPagesArray(totalPages);
 
	for (let i = 0; i < totalPages; i++) {
		pagesArray.push(i + 1);
	}
	console.log([pagesArray]);
	const [fetchPosts, isPostLoading, postError] = useFething(async () => {
		const response = await PostService.getAll(limit, page);
			setPosts(response.data);
			const totalCount = response.headers['x-total-count']; // общее кол-во постов
			setTotalPages(getPageCount(totalCount, limit));
	});

	console.log(totalPages);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	// Получаем post из дочернего элемента	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	useEffect(() => {
		fetchPosts();
	}, [page]);// [] -> если пустой массив, то сроботает один раз

	const changePage = (page) => {
		setPage(page);
	} 
	
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
			{postError &&
				<div>Произошла ошибка ${postError}</div>
			}
			{isPostLoading
				? 
					<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
						<Loader />
					</div>
				:
					<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про вебразработку' />	
			}
			<div className="page__wrapper">
				{pagesArray.map(p => 
					<span 
						key={p}
						className={page === p ? 'page page__current' : 'page'}
						onClick={() => changePage(p)}
					>
						{p}
					</span>
				)}
			</div>
		</div>
	);
}

export default App;
