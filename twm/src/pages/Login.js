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
        passowrd: '',
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors()
        }
    })
}