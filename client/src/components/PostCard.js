import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moments from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import TheLike from './Like';
import TheDelete from './Delete';
import ToolTip from '../utils/Tooltip';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    const {user} = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moments(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <TheLike user={user} post={{ id, likes, likeCount }} />
                <ToolTip content="Comment for this post">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="orange" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="orange" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </ToolTip>
                {user && user.username === username && <TheDelete postId={id} />}
            </Card.Content>
        </Card>
    );
}

export default PostCard;