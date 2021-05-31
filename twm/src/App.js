import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'sematic-ui-react';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SinglePost';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Container>
                    <MenuBar />
                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" components={Login} />
                    <AuthRoute exact path="/signup" components={Signup} />
                    <Route exact path="/posted/:postId" components={SinglePost} />
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;