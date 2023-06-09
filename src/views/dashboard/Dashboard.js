import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from '../../components/Profile'
import { getUser } from '../../components/User'
import {
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

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
      <CTable responsive>
        <CTableHead className="bg-white">
          <CTableRow>
            <CTableHeaderCell className="border" width="6%">
              Kode Produk
            </CTableHeaderCell>
            <CTableHeaderCell className="border">Nama Produk</CTableHeaderCell>
            <CTableHeaderCell className="border">Deskripsi Produk</CTableHeaderCell>
            <CTableHeaderCell className="border">Date</CTableHeaderCell>
            <CTableHeaderCell className="border">Harga Produk</CTableHeaderCell>
            <CTableHeaderCell className="border">UOM (Unit of Measurement)</CTableHeaderCell>
            <CTableHeaderCell className="border" colSpan="2">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody className="bg-white">
          {events?.map((item, i) => (
            <CTableRow key={i}>
              <CTableDataCell className="border">{i + 1}</CTableDataCell>
              <CTableDataCell className="border">{item.name}</CTableDataCell>
              <CTableDataCell className="border">{item.description}</CTableDataCell>
              <CTableDataCell className="border">{item.date}</CTableDataCell>
              <CTableDataCell className="border">{item.price}</CTableDataCell>
              <CTableDataCell className="border">{item.uom}</CTableDataCell>
              <CTableDataCell className="border">
                <CButton
                  className="m-1"
                  color="primary"
                  onClick={() => navigate(`/add-product/${item.id}`)}
                >
                  Edit
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton
                  className="text-white m-1"
                  color="danger"
                  onClick={() => deleteEvent(item.id)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {!events.length && <p style={{ textAlign: 'center', marginTop: '15px' }}>No results</p>}
    </div>
  )
}
