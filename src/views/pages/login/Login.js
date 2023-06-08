import React, { useEffect, useState } from 'react'
import { getUser } from '../../../components/User'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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

export default function Login() {
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target

    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })

    setError(name, '')
    setError('not_registered', '')
    if (name === 'password') {
      setError('incorrect_password', '')
    }
  }

  const user = getUser()

  useEffect(() => {
    if (user) {
      navigate('/events')
    }
  }, [])

  const setError = (name, value) => {
    setErrors((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const login = () => {
    const { email, password } = params

    if (!email) {
      setError('email', 'email is required')
    }

    if (!password) {
      setError('password', 'password is required')
    }

    if (email && password) {
      const users = []

      users.push(...(JSON.parse(localStorage.getItem('users')) || []))

      const exist = users.find((u) => u?.email === params.email)
      if (exist) {
        if (exist.password !== params.password) {
          setError('incorrect_password', 'Incorrect Password')
        } else {
          exist.login = true
          localStorage.setItem('users', JSON.stringify(users))
          navigate('/events')
          setParams({})
        }
      } else {
        setError('not_registered', 'User not Registered')
      }
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    {!!errors.not_registered && (
                      <span className="mandatory">{errors.not_registered}</span>
                    )}
                    <div className="space"></div>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        type="text"
                        name="email"
                        value={params.email || ''}
                        onChange={handleChange}
                      />{' '}
                      {!!errors.email && <span className="mandatory">{errors.email}</span>}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={params.password || ''}
                        onChange={handleChange}
                      />
                      {!!errors.password && <span className="mandatory">{errors.password}</span>}
                      {!!errors.incorrect_password && (
                        <span className="mandatory">{errors.incorrect_password}</span>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={() => login()}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Daftar jika belum memiliki akun</p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                        onClick={() => navigate('/register')}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
