import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from './Profile'

export default function AddProduct() {
  const navigate = useNavigate()
  const params = useParams()
  const [event, setEvent] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (params.id) {
      const events = JSON.parse(localStorage.getItem('add-product'))
      if (events && events.length) {
        const ev = events.find((e) => e.id === Number(params.id))
        if (ev) {
          setEvent(ev)
        } else {
          navigate('/dashboard')
        }
      }
    }
  }, [])

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'price') {
      value = value.replace(/\D/g, '')
    }
    setEvent((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })

    setError(name, '')
  }

  const setError = (name, value) => {
    setErrors((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const cancel = () => {
    setEvent({})
    setErrors({})
    navigate('/dashboard')
  }

  const create = () => {
    const validate = ['name', 'description', 'price', 'date', 'type']
    let errs = {}
    for (let i = 0; i < validate.length; i++) {
      if (!event[validate[i]]) {
        errs = { ...errs, [validate[i]]: `${validate[i]} is required` }
      }
    }

    setErrors((prev) => {
      return {
        ...prev,
        ...errs,
      }
    })

    if (!Object.keys(errs).length) {
      save()
    }
  }

  const save = () => {
    const data = []
    const user = { id: 1 }
    const old = JSON.parse(localStorage.getItem('add-product'))
    let id = 1
    if (old) {
      data.push(...old)
      id = old.length ? old[old.length - 1].id + 1 : 1
    }

    if (event?.id) {
      const oldEvent = data.find((o) => o.id === event.id)
      for (const a in oldEvent) {
        oldEvent[a] = event[a]
      }
    } else {
      data.push({ id, userId: user.id, ...event })
    }

    localStorage.setItem('add-product', JSON.stringify(data))
    cancel()
  }

  return (
    <div>
      <div className="form">
        <div className="title">
          <p>{event.id ? 'Update' : 'Add'} Product</p>
        </div>
        <div className="space"></div>
        <div>
          <label>
            Nama Produk<span className="mandatory">*</span>
          </label>
          <div className="space"></div>
          <input type="text" name="name" value={event.name || ''} onChange={handleChange} />
          {!!errors.name && <span className="mandatory">{errors.name}</span>}
        </div>
        <div className="space"></div>
        <div>
          <label>
            Deskripsi Produk<span className="mandatory">*</span>
          </label>
          <textarea
            style={{ width: '100%' }}
            rows="4"
            name="description"
            value={event.description || ''}
            onChange={handleChange}
          ></textarea>
          {!!errors.description && <span className="mandatory">{errors.description}</span>}
        </div>
        <div className="space"></div>
        <label>
          Harga Produk<span className="mandatory">*</span>
        </label>
        <div className="space"></div>
        <input type="text" name="price" value={event.price || ''} onChange={handleChange} />
        {!!errors.price && <span className="mandatory">{errors.price}</span>}
        <div className="space"></div>
        <label>
          Date<span className="mandatory">*</span>
        </label>
        <div className="space"></div>
        <input type="date" name="date" value={event.date || ''} onChange={handleChange} />
        {!!errors.date && <span className="mandatory">{errors.date}</span>}
        <div className="space"></div>
        <div>
          <label>
            UOM (Unit of Measurement)<span className="mandatory">*</span>
          </label>
          <div className="space"></div>
          <select name="uom" value={event.uom} onChange={handleChange}>
            <option hidden>Select UOM</option>
            <option value="SHEET">SHEET</option>
            <option value="ROLL">ROLL</option>
            <option value="PCS">PCS</option>
          </select>
          {!!errors.uom && <span className="mandatory">{errors.uom}</span>}
        </div>
        <br></br>
        <div className="space"></div>
        <div>
          <button onClick={() => cancel()}>Cancel</button>
          <button style={{ marginLeft: '5px' }} onClick={() => create()}>
            {event.id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}
