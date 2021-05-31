import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import tooltip from '../utils/Tooltip';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

function DeleteButtons({ postId, commentId, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy, result) {
            setConfirmOpen(false);

            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                });

                const posts = [result.data, ...data.getPosts];
            }
        }
    })
}