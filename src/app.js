import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import './style.scss'
import axios from 'axios'

axios.get('/api/cats')
  .then(res => console.log(res.data))
  .catch(err => console.log(err))

import Home from './common/Home' 
import NavBar from './common/Navbar'
import Register from './auth/Register'
import Login from './auth/Login'
import CatIndex from './cats/CatIndex'
import CatShow from './cats/CatShow'
import CatNew from './cats/CatNew'
import CatEdit from './cats/CatEdit'
import SecureRoute from './common/SecureRoute'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
          <SecureRoute path="/cats/:id/edit" component={CatEdit}/>
          <SecureRoute path="/cats/new" component={CatNew} />
          <Route path="/cats/:id" component={CatShow} />
          <Route path="/cats" component={CatIndex} />
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
