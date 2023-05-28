import React from "react";

import './styles/App.css';
import PostItem from "./components/PostItem";

function App() {
	return (
		<div className="App">
			<PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}} />
			<PostItem post={{id: 2, title: 'HTML', body: 'Description'}} />
			<PostItem post={{id: 3, title: 'CSS', body: 'Description'}} />
			<PostItem post={{id: 4, title: 'React', body: 'Description'}} />
			<PostItem post={{id: 5, title: 'React Native', body: 'Description'}} />
		</div>
	);
}

export default App;
