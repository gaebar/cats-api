import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../auth/Auth'

class CatShow extends Component {
  constructor() {
    super()

    this.state = { cat: null, comment: {} }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCommentDelete = this.handleCommentDelete.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  handleChange(e) {
    this.setState({ comment: { text: e.target.value }})
  }

  getData() {
    axios.get(`/api/cats/${this.props.match.params.id}`)
      .then(res => this.setState({ cat: res.data, comment: {} }))
      .catch(err => console.log(err))
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post(`/api/cats/${this.props.match.params.id}/comments`, this.state.comment, {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  isCommentOwner(comment) {
    return Auth.getPayload().sub === comment.user._id
  }

  handleCommentDelete(comment) {
    axios.delete(`/api/cats/${this.props.match.params.id}/comments/${comment._id}`, {
      headers: { 'Authorization': Auth.getToken()}
    })
      .then(() => this.getData())
      .catch(err => console.log(err))
  }

  handleDelete() {
    axios.delete(`/api/cats/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/cats'))
      .catch(err => console.log(err.response))
  }

  isCatOwner() {
    return Auth.getPayload().sub === this.state.cat.user._id
  }

  render() {
    if (!this.state.cat) return null
    const { cat } =  this.state
    this.isCatOwner()
    return (
      <section className="section">
        <div className="container">
          <Fragment>
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
                <h4 className="title is-4">Cartoon</h4>
                <p>{cat.cartoon}</p>
                <hr />
                <h4 className="title is-4">Year</h4>
                <p>{cat.year}</p>
                <hr />
                <hr />
                <h4 className="title is-4">Rating</h4>
                <p>{cat.rating}</p>
                <hr />
                <h4 className="title is-4">Added by</h4>
                <p>{cat.users}</p>
                {this.isCatOwner() && <Link
                  className="button is-warning"
                  to={`/cats/${cat._id}/edit`}
                >
                  Edit
                </Link>}
                {this.isCatOwner() && <button onClick={this.handleDelete} className="button is-danger">Delete</button>}
              </div>
            </div>
            <hr />
            {cat.comments.map(comment => (
              <div key={comment._id} className="card">
                <div className="card-content">
                  {comment.text} - {new Date(comment.createdAt).toLocaleString()}
                </div>
                {this.isCommentOwner(comment) && <button
                  className="button is-danger"
                  onClick={() => this.handleCommentDelete(comment)}
                >Delete
                </button>}
              </div>
            ))}
            <hr />
            {Auth.isAuthenticated() &&
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Comment........."
                  onChange={this.handleChange}
                  value={this.state.comment.text || ''}
                >
                </textarea>
              </div>
            </div>
            <button className="button" type="submit">Comment</button>
          </form>}
          </Fragment>
        </div>
      </section>
    )
  }
}

export default CatShow
