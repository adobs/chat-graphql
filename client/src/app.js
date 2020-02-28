import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './login';
import ChatInterface from './chatInterface';

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             from: ''
//         }
//     }
//
//     onInputChange = (from) => {
//         this.setState({ from })
//     }
//
//     render() {
//         return (
//             <div>
//                 <Router>
//                     <Route exact path='/' render={() => <Login onInputChange={this.onInputChange} />} />
//                     <Route path='/chat' render={() => <ChatInterface from={this.state.from}/>} />
//                 </Router>
//             </div>
//         );
//     }
// }
// useEffect(() => {
//  // this shit runs on launch of compts
//
// },[])

const App = () => {
  const [from, setFrom] = React.useState('');

  // const {loginRender} = React.useCallback(() => <Login onInputChange={onInputChange} />)

  const onInputChange = from => {
    setFrom(from);
  };

  return (
    <div>
      <Router>
        <Route exact path="/" render={() => <Login onInputChange={onInputChange} />} />
        <Route path="/chat" render={() => <ChatInterface from={from} />} />
      </Router>
    </div>
  );
};

export default App;
