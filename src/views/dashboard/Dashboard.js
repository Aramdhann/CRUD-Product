import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../../components/Profile'
import { getUser } from '../../components/User'

export default function EventPage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])

  useEffect(() => {
    get()
  }, [])

  const user = getUser()

  const get = () => {
    const events = JSON.parse(localStorage.getItem('add-product'))
    setEvents(events?.filter((o) => o.userId === user?.id) || [])
  }

  const deleteEvent = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')

    if (confirmDelete) {
      const data = []
      const events = JSON.parse(localStorage.getItem('add-product'))
      data.push(...events.filter((e) => e.id !== id))
      localStorage.setItem('add-product', JSON.stringify(data))
      get()
    }
  }

  return (
    <div>
      <div className="eventPage">
        <table className="table">
          <thead>
            <tr>
              <th width="6%">Kode Produk</th>
              <th>Nama Produk</th>
              <th>Deskrpsi Produk</th>
              <th>Date</th>
              <th>Harga Produk</th>
              <th>UOM (Unit of Measurement) </th>
              <th width="10%" colSpan="2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => navigate(`/add-product/${item.id}`)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteEvent(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!events.length && <p style={{ textAlign: 'center', marginTop: '15px' }}>No results</p>}
      </div>
    </div>
  )
}
