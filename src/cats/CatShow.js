import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../auth/Auth'

class CatShow extends React.Component {
  constructor() {
    super()

    this.state = { cat: null }
    this.handleDelete = this.handleDelete.bind(this)
  }  

  componentDidMount() {
    axios.get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data }))
      .catch(err => console.log(err))
  }

  handleDelete() {
    axios.delete(`/api/cats/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/cats'))
      .catch(err => console.log(err.response))
  }

  isOwner() {
    return Auth.getPayload().sub === this.state.cat.user._id
  }

  render() {
    if (!this.state.cat) return null
    const { cat } =  this.state
    this.isOwner()
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">{cat.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={cat.image} alt={cat.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Description</h4>
              <p>{cat.description}</p>
              <hr />
              <h4 className="title is-4">Origin</h4>
              <p>{cat.origin}</p>
              <hr />
              {this.isOwner() && <Link
                className="button is-warning"
                to={`/cats/${cat._id}/edit`}
              >
                Edit
              </Link>}
              {this.isOwner() && <button onClick={this.handleDelete} className="button is-danger">Delete</button>}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CatShow
