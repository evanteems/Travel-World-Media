import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import tooltip from '../utils/Tooltip';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import e from 'express';

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

                const posts = [result.data, ...data.getPosts]
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
            }

            if (Callback) callback();
        },
        variables: {
            postId,
            commentId,
        },
        onError(err) {
            return err;
        },
    });
    return (
        <>
            <Tooltip contents={commentId ? 'Delete this comment' : 'Delete this post'}>
                <Button as="div" color="red" floated="right" onClick={() => setConfirmOpen(true)}>
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </Tooltip>
            <Confirm open={confrimOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrComment} />
            </>
        );
    }

    const DELETE_POST_MUTATION = gql`
        mutation deletePost($postId: ID!)
            deletePost(postId: $post)
    `;

    const DELETE_COMMENT_MUTATION = gql`
        mutation deleteComment($postId: ID!, $commentId: ID!) {
            deleteComment(postId: $postId, commentId: $commentId) {
                id 
                comments {
                    id
                    username
                    createdAt
                    body
                }
                commentCount
            }
        }
    `;
    
    export default DeleteButtons;