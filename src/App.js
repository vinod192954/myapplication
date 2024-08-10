import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegistraionPage from './components/RegistraionPage';
import TaskManager from './components/TaskManager'
import PublicRoute from './components/PublicRoute';
import ViewTasksList from './components/ViewTasksList';




function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={LoginPage}/>
        <PublicRoute exact path='/register'component={RegistraionPage}/>
        <ProtectedRoute exact path='/taskmanager' component={TaskManager}/>
        <ProtectedRoute exact path="/taskview" component={ViewTasksList}/>
      </Switch>
  </BrowserRouter>
  )
}

export default App;
