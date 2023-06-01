import React, { useEffect, useRef, useState } from "react";

import '../styles/App.css';
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/myModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hook/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import { useFething } from "../hook/useFething";
import { getPageCount, getPagesArray } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({sort: '', query: ''});
	const [modal, setModal] = useState(false);
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [totalPages, setTotalPages] = useState(0); 	// Обшее количество постов
	const [limit, setLimit] = useState(10);				// Кол-во постов на одной странице
	const [page, setPage] = useState(1);				// Первая страница
	const lastElement = useRef();
	const observer = useRef();
	console.log(lastElement);
 
	
	const [fetchPosts, isPostLoading, postError] = useFething(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
			setPosts([...posts, ...response.data]);
			const totalCount = response.headers['x-total-count']; // общее кол-во постов
			setTotalPages(getPageCount(totalCount, limit));
	});

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false);
	}

	// Получаем post из дочернего элемента	
	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	useEffect(() => {
		if (isPostLoading) return;
		if (observer.current) observer.current.disconnect();
		let callback = function(entries, observer) {
			if (entries[0].isIntersecting && page < totalPages) {
				console.log(page);
				setPage(page + 1);
			}
			console.log(entries);
			
		}
		observer.current = new IntersectionObserver(callback);
		observer.current.observe(lastElement.current)
	}, [isPostLoading])

	useEffect(() => {
		fetchPosts(limit, page);
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
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про вебразработку' />	
			<div 
				ref={lastElement} 
				style={{height: '20px', background: 'red'}}>	
			</div>
			{isPostLoading &&
				<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
					<Loader />
				</div>
			}
			<Pagination 
				page={page} 
				changePage={changePage} 
				totalPages={totalPages} 
			/>
		</div>
	);
}

export default Posts;