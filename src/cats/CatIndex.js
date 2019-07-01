import React from 'react'
import axios from 'axios'

import CatCard from './CatCard'

class CatIndex extends React.Component {
  constructor() {
    super()

    this.state = { cats: null }
  }

  componentDidMount() {
    axios.get('/api/cats')
      .then(res => this.setState({ cats: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    if (!this.state.cats) return null
    console.log(this.state.cats)
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.cats.map(cat => (
              <CatCard
                key={cat._id}
                {...cat}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }
}

export default CatIndex
