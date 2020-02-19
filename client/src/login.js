import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onInputChange }) {
    const input = React.createRef();

    return (
        <div>
            Enter your login name
                <input onChange={() => onInputChange(input.current.value)} ref={input} type='text' />
                <Link to='/chat'>
                    Enter
                </Link>
        </div>
    )
}

export default Login;
