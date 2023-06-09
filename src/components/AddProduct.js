import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from './Profile'
import {
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
  CFormTextarea,
  CRow,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdown,
} from '@coreui/react'

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
    const validate = ['name', 'description', 'price', 'date', 'uom']
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
      <CForm className="form">
        <div className="title bold fs-4">
          <p>{event.id ? 'Update' : 'Add'} Product</p>
        </div>
        <CCol md={12}>
          <CFormInput
            label="Nama Produk"
            type="text"
            name="name"
            value={event.name || ''}
            onChange={handleChange}
          />
          {!!errors.name && <span className="mandatory">{errors.name}</span>}
        </CCol>
        <CCol md={12} className="mt-3">
          <CFormTextarea
            label="Deskripsi Produk"
            type="text"
            name="description"
            placeholder="Write description product here"
            id="floatingTextarea2"
            style={{ height: '150px' }}
            value={event.description || ''}
            onChange={handleChange}
          ></CFormTextarea>
        </CCol>
        <CRow>
          <CCol md={4} className="mt-3">
            <CFormInput
              label="Harga Produk"
              type="text"
              name="price"
              value={event.price || ''}
              onChange={handleChange}
            />
            {!!errors.price && <span className="mandatory">{errors.price}</span>}
          </CCol>
          <CCol md={4} className="mt-3">
            <CFormInput
              label="Tanggal Produk"
              type="date"
              name="date"
              value={event.date || ''}
              onChange={handleChange}
            />
            {!!errors.date && <span className="mandatory">{errors.date}</span>}
          </CCol>
          <CCol md={4} className="mt-3">
            <CFormSelect
              id="inputState"
              label="UOM (Unit of Measurement)"
              name="uom"
              value={event.uom}
              onChange={handleChange}
            >
              <option hidden>Choose...</option>
              <option value="SHEET">SHEET</option>
              <option value="ROLL">ROLL</option>
              <option value="PCS">PCS</option>
            </CFormSelect>
            {!!errors.uom && <span className="mandatory">{errors.uom}</span>}
          </CCol>
        </CRow>
        <CCol xs={12} className="mt-3">
          <CButton type="submit" onClick={() => cancel()}>
            Cancel
          </CButton>
          <CButton type="submit" onClick={() => create()} className="ms-3">
            {event.id ? 'Update' : 'Create'}
          </CButton>
        </CCol>
      </CForm>
    </div>
  )
}
