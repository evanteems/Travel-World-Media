import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: '',
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQlErrors[0].extension.exception.errors);
        },
        variables: values,
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    type="text" label="Username" placeholder="Username..."
                    name="username" value={values.username} error={!!errors.username}
                    onChange={onChange} />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={!!errors.username}
                    onChange={onChange} />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((values) => (
                            <li key={values}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Login;