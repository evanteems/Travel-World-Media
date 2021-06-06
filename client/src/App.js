import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import SinglePost from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar />
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exacy path="/signup" component={SignUp} />
                    <Route exact path="/posts/:postId" component={SinglePost} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;