
import './App.css';
import LoginPage from './components/LoginPage';
import RegistraionPage from './components/RegistraionPage';
import TaskManager from './components/TaskManager'
import ViewTasksList from './components/ViewTasksList';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path='/register'component={RegistraionPage}/>
        <Route exact path='/taskmanager' component={TaskManager}/>
        <Route exact path="/taskview" component={ViewTasksList}/>
      </Switch>
  </BrowserRouter>
  )
}

export default App;
