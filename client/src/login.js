import React, { useEffect } from 'react';
import { useAuth } from './useAuth';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

const Login = props => {
  const auth = useAuth();
  const location = useLocation();
  // const { referer } = location.state || { referer: { pathname: '/chat' } };

  const [inputValue, setInputValue] = React.useState('');

  const onInputChange = val => setInputValue(val);

  const onSubmit = () => auth.login(inputValue);
  if (auth.user) {
    console.log('chat', auth.user);
    return <Redirect to="/chat" />;
  }

  return (
    <div>
      <b>Enter your login name</b>
      <br />
      <input onChange={e => onInputChange(e.target.value)} type="text" />
      <button onClick={onSubmit}>Begin Chatting</button>
    </div>
  );
};

export default Login;
