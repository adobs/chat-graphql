import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from './useAuth';

// Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import { createApolloClient } from './initApollo';

// Chat UI
import { PrivateRoute } from './privateRoute';
import Login from './login';
import ChatInterface from './chatInterface';

const App = props => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/chat" component={ChatInterface} />
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
