import React from 'react'

const CatForm = ({ data, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className="field">
      <label className="label">Name</label>
      <div className="control">
        <input
          className="input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={data.name || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Friendly</label>
      <div className="control">
        <input
          className="input"
          name="friendly"
          placeholder="Friendly"
          onChange={handleChange}
          value={data.friendly || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Cartoon</label>
      <div className="control">
        <input
          className="input"
          name="cartoon"
          placeholder="Cartoon"
          onChange={handleChange}
          value={data.cartoon || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Year</label>
      <div className="control">
        <input
          className="input"
          name="year"
          placeholder="Year"
          onChange={handleChange}
          value={data.year || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Image</label>
      <div className="control">
        <input
          className="input"
          name="image"
          placeholder="Image"
          onChange={handleChange}
          value={data.image || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Description</label>
      <div className="control">
        <textarea
          className="textarea"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={data.description || ''}
        />
      </div>
    </div>
    <div className="field">
      <label className="label">Rating</label>
      <div className="control">
        <input
          className="range"
          type="radio"
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
          value={data.radio || ''}
        />
      </div>
    </div>
    

    <button type="submit" className="button is-info">Submit</button>
  </form>
)

export default CatForm
