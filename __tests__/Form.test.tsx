import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '../components/Form'
import '@testing-library/jest-dom'

it('should check that Form elements renders as expected', () => {
  render(<Form />)

  expect(screen.getByTestId('h2')).toBeInTheDocument()
  expect(screen.getByTestId('input-username')).toBeInTheDocument()
  expect(screen.getByTestId('input-password')).toBeInTheDocument()
  expect(screen.getByTestId('input-password2')).toBeInTheDocument()
  expect(screen.getByTestId('button-submit')).toBeInTheDocument()
})

it('should check that button is diabled when inputs are empty'),
  () => {
    render(<Form />)
    expect(screen.getByTestId('button-submit')).toBeDisabled()
  }

it('should check that username-error is displayed when username input is less than 4 characters', () => {
  render(<Form />)

  fireEvent.change(screen.getByTestId('input-username'), {
    target: { value: 'fre' },
  })

  expect(screen.getByTestId('error')).toHaveTextContent(
    'Brukernavn ikke gyldig'
  )
})

it('should check that username-error is not displayed when username input is less than 4 characters', () => {
  render(<Form />)

  fireEvent.change(screen.getByTestId('input-username'), {
    target: { value: 'fredrik' },
  })

  expect(screen.getByTestId('error')).toHaveTextContent('Passord matcher ikke')
})

it('should check that password-error is displayed when passord value is less than 5 characters ', () => {
  render(<Form />)

  fireEvent.change(screen.getByTestId('input-username'), {
    target: { value: 'fredrik' },
  })
  fireEvent.change(screen.getByTestId('input-password'), {
    target: { value: 'pass' },
  })
  fireEvent.change(screen.getByTestId('input-password2'), {
    target: { value: 'pass' },
  })
  expect(screen.getByTestId('error')).toHaveTextContent('Passord matcher ikke')
})

it('should check that password-error is displayed when passord and password2 input values do not match ', () => {
  render(<Form />)

  fireEvent.change(screen.getByTestId('input-username'), {
    target: { value: 'fredrik' },
  })
  fireEvent.change(screen.getByTestId('input-password'), {
    target: { value: 'passord' },
  })
  fireEvent.change(screen.getByTestId('input-password2'), {
    target: { value: 'passor' },
  })
  expect(screen.getByTestId('error')).toHaveTextContent('Passord matcher ikke')
})

it('should check that button is enabled when passord and password2 input values match ', () => {
  render(<Form />)

  fireEvent.change(screen.getByTestId('input-username'), {
    target: { value: 'fredrik' },
  })
  fireEvent.change(screen.getByTestId('input-password'), {
    target: { value: 'passord' },
  })
  fireEvent.change(screen.getByTestId('input-password2'), {
    target: { value: 'passord' },
  })
  expect(screen.getByTestId('button-submit')).toBeEnabled()
})

it('should check that the data is sent when inputs are correct and button is clicked', () => {
  render(<Form />)

  userEvent.type(screen.getByTestId('input-username'), 'fredrik')
  userEvent.type(screen.getByTestId('input-password'), 'passord')
  userEvent.type(screen.getByTestId('input-password2'), 'passord')

  // screen.getByTestId('button-submit').click()
  userEvent.click(screen.getByTestId('button-submit'))

  expect(screen.getByTestId('success')).toBeInTheDocument()
})
