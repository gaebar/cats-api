import React from 'react'
import axios from 'axios'
import Auth from '../auth/Auth'
import CatForm from './CatForm'

class CatNew extends React.Component {
  constructor() {
    super()

    this.state = { data: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/cats', this.state.data,{
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/cats'))
      .catch(err => console.log(err.response))
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <CatForm
            data={this.state.data}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}

          />

        </div>
      </section>
    )
  }
}

export default CatNew
