import React from 'react'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/home'
import Login from './Components/Login/Login'

const App = () => {

  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/createUser' />
          <Route exact path='/login' component={Login}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
