import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
<<<<<<< HEAD
    const { user } = useContext(AuthContext);

    return (
        <Route 
            {...rest}
            render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)}
        />
    )
}

export default AuthRoute;
=======
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  )
}

export default AuthRoute;
>>>>>>> a1e717675c4a5932f013cbcd6a0dde869c3a51b5
