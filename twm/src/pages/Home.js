import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import PostsCards from '../components/PostCard';
import PostsForms from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostsForms />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading posts...</h1>
                ):(
                    <Transition.Group>
                        {data.getPosts &&
                            data.getPosts.map((post) => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                    <PostsCards post={post} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Home;