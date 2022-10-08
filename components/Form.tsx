import React, {
  isValidElement,
  useDebugValue,
  useEffect,
  useState,
} from 'react'

type formData = { username: string; password: string; password2: string }

const Form = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    password2: '',
  })

  const [error, setError] = useState('')
  const [isDirty, setDirty] = useState(false)
  const [button, setButton] = useState(true)
  const [dataSent, setDataSent] = useState(false)

  useEffect(() => {
    if (!usernameValid(data) && isDirty) {
      setError('Brukernavn ikke gyldig')
      setButton(true)
    } else if (!passwordValid(data) && isDirty) {
      setButton(true)
      setError('Passord matcher ikke eller har for få tegn')
    } else if (!isDirty) {
      setButton(true)
    } else {
      setButton(false)
      setError('')
    }
  }, [data, isDirty])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id
    if (id && Object.keys(data).includes(id)) {
      setDirty(true)
      setData((prev) => ({ ...prev, [id]: event.target.value }))
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (usernameValid(data) && passwordValid(data)) {
      console.log(data.username, data.password)
    }
    setDataSent(true)
  }

  const usernameValid = ({ username }: formData) => {
    return username && username.length >= 4
  }

  const passwordValid = ({ password, password2 }: formData) => {
    return (
      password && password2 && password.length > 4 && password === password2
    )
  }

  return (
    <main>
      <section>
        <h2 data-testid="h2">Teste Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              data-testid="input-username"
              value={data.username}
              onChange={handleOnChange}
              id="username"
              placeholder="Brukernavn"
            ></input>
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              data-testid="input-password"
              value={data.password}
              onChange={handleOnChange}
              id="password"
              placeholder="Passord"
            ></input>
          </label>

          <label htmlFor="password2">
            Confirm Password
            <input
              type="password"
              data-testid="input-password2"
              value={data.password2}
              onChange={handleOnChange}
              id="password2"
              placeholder="Bekreft passord"
            ></input>
          </label>
          {error ? (
            <span className="error" data-testid="error">
              {error}
            </span>
          ) : null}
          <button type="submit" disabled={button} data-testid="button-submit">
            Opprett bruker
          </button>
        </form>
        <span className="ok" data-testid="success">
          {dataSent ? 'Registrering vellykket!' : null}
        </span>
      </section>
    </main>
  )
}

export default Form
