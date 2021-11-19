import * as React from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink } from 'react-router-dom';
import Emoji from './components/Emoji';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Home from './views/Home';
import Blog from './views/Blog';
import CreateEdit from './views/CreateEdit';
import Admin from './views/Admin';
import Author from './views/Author';
import Tag from './views/Tag';
import Donate from './views/Donate';

const App = (props: AppProps) => {

	const stripe = loadStripe('pk_test_BCTJCRhh7sCzgYxAcA3Iw8UN');
	
	return (
		<BrowserRouter>
			<nav className="navbar sticky-top p3 mb-5">
				<div className="container-fluid">
					<Link to="/" className="logo">Vishal's Blog</Link>
					<div className="d-flex">
						<Link to="/new" className="btn m-1"><Emoji symbol="✍️" label="write"/>New Post</Link>
						<Link to="/donate" className="btn m-1"><Emoji symbol="💸" label="money"/>Donate</Link>
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
					<Route exact path="/donate">
						<Elements stripe={stripe}>
							<Donate />
						</Elements>
					</Route>
				</Switch>
			</main>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
