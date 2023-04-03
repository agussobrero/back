import './App.css';
import Rout from './routes/Routes';
import { ApolloProvider } from '@apollo/client';
import client from './api/ApolloClient';

function App() {

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Rout/>
      </ApolloProvider>
    </div>
  );
}

export default App;
