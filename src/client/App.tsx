import * as React from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import Emoji from './components/Emoji';

import Home from './views/Home';
import Blog from './views/Blog';
import CreateEdit from './views/CreateEdit';
import Admin from './views/Admin';
import Author from './views/Author';
import Tag from './views/Tag';

const App = (props: AppProps) => {
	return (
		<BrowserRouter>
			<nav className="navbar sticky-top p3 mb-5">
				<div className="container-fluid">
					<Link to="/" className="logo">Vishal's Blog</Link>
					<div className="d-flex">
						<Link to="/new" className="btn m-1"><Emoji symbol="✍️" label="write"/>New Post</Link>
						<Link to="/admin" className="btn m-1"><Emoji symbol="⚙️" label="gear"/>Admin</Link>
					</div>
				</div>
			</nav>
			<main className="container my-5"> 
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/blog/:id/:status">
						<Blog />
					</Route>
					<Route exact path="/blog/:id">
						<Blog />
					</Route>					
					<Route exact path="/author/:id">
						<Author />
					</Route>
					<Route exact path="/tag/:id">
						<Tag />
					</Route>
					<Route exact path="/new">
						<CreateEdit isEdit={false} />
					</Route>
					<Route exact path="/edit/:id">
						<CreateEdit isEdit={true} />
					</Route>
					<Route exact path="/admin">
						<Admin />
					</Route>
				</Switch>
			</main>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
