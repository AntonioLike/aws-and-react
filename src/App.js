import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Auth,API,graphqlOperation} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator } from 'aws-amplify-react';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
Auth.configure(awsconfig);
API.configure(awsconfig);

function updateTodo(todo, newDesc){
  todo['description'] = newDesc;
  API.graphql(graphqlOperation(mutations.updateTodo, {input:todo}));
}

function deleteTodo(todo){
  API.graphql(graphqlOperation(mutations.deleteTodo, {input:{'id':todo['id']}}));
}

function App() {

  const userTodos = API.graphql(graphqlOperation(queries.listTodos, {filter:{'name':{'eq':"beartest"}}}));
  console.log(userTodos);

  const allTodos = API.graphql(graphqlOperation(queries.listTodos));
  console.log(allTodos);

  const oneTodo = API.graphql(graphqlOperation(queries.getTodo, {id:"71c786cd-6e49-4399-81eb-84998a3d42b3"})).then(function(todo){
    //updateTodo(todo['data']['getTodo'], "new desc");
    //deleteTodo(todo['data']['getTodo']);
  });
  console.log(oneTodo);

  Auth.currentAuthenticatedUser({
    bypassCache:false
  }).then(function(user){
    console.log("User: " + JSON.stringify(user));
  
  console.log("User:" + JSON.stringify(user));
  const todo = {name: "app", description: "new todo"};
  const newTodo = API.graphql(graphqlOperation(mutations.createTodo, {input:todo}));
}).catch(err => console.log(err));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, {includeGreetings: true});
//export default App;
