import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

function SignUp(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(signupUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [addUser, { loading }] = useMutation(SIGN_UP_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQlErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function signupUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Sign Up</h1>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange}
                />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Sign Up
                </Button>
            </Form>
            {Object.keys(errors).lengthh > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const SIGN_UP_USER = gql`
    mutation signup($username: String!, $password: String!, $confirnPassword: String!) {
        signup(
            signupInput: { username: $username, password: $password, confirmPassword: $confirmPassword }
        ) {
            id
            username
            createdAt
            token
        }
    }
`;

export default SignUp;