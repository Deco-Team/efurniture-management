import { AxiosError } from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '~/components/loading/Loading'
import { EMPTY } from '~/global/constants/constants'
import { IAuthContextProps, IAuthProviderProps, IUser } from '~/global/interfaces/interface'
import { notifyError, notifySuccess } from '~/global/toastify'
import { ILoginFormProps } from '~/pages/auth/types/LoginForm'
import { post } from '~/utils/apiCaller'
import { decodeJwt } from 'jose'
import { ZERO } from '~/global/constants/numbers'

const initialContext: IAuthContextProps = {
  user: {
    role: EMPTY,
    iat: ZERO,
    exp: ZERO,
    name: EMPTY,
    sub: EMPTY
  },
  idToken: null,
  login: async () => {},
  logout: async () => {
    return
  },
  refreshToken: async () => {
    return
  }
}
export const AuthContext = createContext<IAuthContextProps>(initialContext)

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [idToken, setIdToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUser | undefined>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const storedToken = localStorage.getItem('idToken') || ''
    if (storedToken) {
      setIdToken(storedToken)
      const decodedToken = decodeJwt(storedToken)
      setUser({
        role: decodedToken.role as string,
        iat: decodedToken.iat as number,
        exp: decodedToken.exp as number,
        name: decodedToken.name as string,
        sub: decodedToken.sub as string
      })
    }
  }, [])

  useEffect(() => {
    if (idToken) {
      try {
        const decodedToken = decodeJwt(idToken)
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) navigate('/')
        else
          setUser({
            role: decodedToken.role as string,
            iat: decodedToken.iat as number,
            exp: decodedToken.exp as number,
            name: decodedToken.name as string,
            sub: decodedToken.sub as string
          })
      } catch (error) {
        navigate('/')
      }
    } else {
      navigate('/')
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  initialContext.login = async ({ email, password }: ILoginFormProps) => {
    try {
      setLoading(true)
      const { data } = await post('/auth/provider/login', { email, password }, {}, {})
      const token = data.data.accessToken
      setIdToken(token)
      const decodedToken = decodeJwt(token)
      localStorage.setItem('idToken', token)
      setUser({
        role: decodedToken.role as string,
        iat: decodedToken.iat as number,
        exp: decodedToken.exp as number,
        name: decodedToken.name as string,
        sub: decodedToken.sub as string
      })
      notifySuccess('Đăng nhập thành công')
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        notifyError(error.response.data.message)
      } else {
        notifyError('Lỗi!')
      }
    }
    setLoading(false)
  }

  initialContext.logout = async () => {
    setLoading(true)
    try {
      localStorage.removeItem('idToken')
    } catch (error) {
      console.error()
    }
    setIdToken(null)
    setUser(undefined)
    setLoading(false)
  }

  initialContext.user = user
  initialContext.idToken = idToken
  return !loading ? (
    <AuthContext.Provider value={initialContext}>{children}</AuthContext.Provider>
  ) : (
    <Loading fullViewport={true} />
  )
}

export default AuthProvider
