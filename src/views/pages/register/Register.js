import React, { useEffect, useState } from 'react'
import { getUser, validateEmail } from '../../../components/User'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

export default function Register() {
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [errors, setErrors] = useState({})

  const user = getUser()

  useEffect(() => {
    if (user) {
      navigate('/events')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })

    setError(name, '')

    if (name === 'email') {
      setError('registered', '')
      setError('invalid_email', '')
    }
  }

  const setError = (name, value) => {
    setErrors((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const register = () => {
    const validate = ['name', 'email', 'password']
    let errs = {}
    for (let i = 0; i < validate.length; i++) {
      if (!params[validate[i]]) {
        errs = { ...errs, [validate[i]]: `${validate[i]} is required` }
      }
    }

    if (params?.email && !validateEmail(params.email)) {
      errs = { ...errs, invalid_email: 'Invalid Email' }
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
    const users = []

    users.push(...(JSON.parse(localStorage.getItem('users')) || []))
    let id = users.length ? users[users.length - 1].id + 1 : 1

    const exist = users.find((u) => u?.email === params.email)
    if (!exist) {
      users.push({ ...params, id })
      localStorage.setItem('users', JSON.stringify(users))
      setParams({})
      navigate('/')
    } else {
      setError('registered', 'Email already Registered')
    }
  }

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={9} lg={7} xl={6}>
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-medium-emphasis">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        type="text"
                        name="name"
                        value={params.name || ''}
                        onChange={handleChange}
                      />
                      {!!errors.name && <span className="mandatory">{errors.name}</span>}
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        type="text"
                        name="email"
                        value={params.email || ''}
                        onChange={handleChange}
                      />
                      {!!errors.email && <span className="mandatory">{errors.email}</span>}
                      {!!errors.invalid_email && (
                        <span className="mandatory">{errors.invalid_email}</span>
                      )}
                      {!!errors.registered && (
                        <span className="mandatory">{errors.registered}</span>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        name="password"
                        value={params.password || ''}
                        onChange={handleChange}
                      />
                      {!!errors.password && <span className="mandatory">{errors.password}</span>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      {/* <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    /> */}
                      <div>
                        <span>
                          Already registered?{' '}
                          <span className="account" onClick={() => navigate('/')}>
                            login here
                          </span>
                        </span>
                      </div>
                    </CInputGroup>
                    <div className="d-grid">
                      <CButton color="success" onClick={() => register()}>
                        Create Account
                      </CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}
