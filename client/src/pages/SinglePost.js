import React, { useContext, useRef, useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moments from 'moment';

import { AuthContext } from '../context/auth';
import TheLike from '../components/Like';
import TheDelete from '../components/Delete';
import ToolTip from '../utils/Tooltip';

function SinglePost(props) {
    const { postId } = props.match.params;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { loading, data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment,
        },
    });

    function deletePostCallback() {
        props.history.push('/');
    }

    let postMarkup;
    if (loading) {
        postMarkup = <p>Loading post...</p>;
    } else {
        const { id, body, createdAt, username, likes, comments, likeCount, commentCount } = data.getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png" size="small" float="right" />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moments(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <TheLike user={user} post={{ id, likeCount, likes }} />
                                <ToolTip content="Comment on this Post">
                                    <Button as="div" labelPosition="right" onClick={() => commentInputRef.current.focus()}>
                                        <Button basic color="orange">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label basic color="orange" pointing="left">
                                            {commentCount}
                                        </Label>
                                    </Button>
                                </ToolTip>
                                {user && user.username === username && <TheDelete postId={id} callback={deletePostCallback} />}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a New Comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment..."
                                                name="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button
                                                type="submit"
                                                className="ui button blue"
                                                disabled={comment.trim('') === ''}
                                                onClick={submitComment}
                                            >
                                                Submit!
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map((userComment) => (
                            <Card fluid key={userComment.id}>
                                <Card.Content>
                                    {user && user.username === userComment.username && (
                                        <TheDelete postId={id} commentId={userComment.id} />
                                    )}
                                    <Card.Header>{userComment.username}</Card.Header>
                                    <Card.Meta>{moments(userComment.createdAr).fromNow()}</Card.Meta>
                                    <Card.Description>{userComment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`;

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;