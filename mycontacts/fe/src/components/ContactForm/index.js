import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react'
import PropTypes from 'prop-types'

import { Input } from '../Input'
import { Select } from '../Select'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { useErrors } from '../../hooks/useErrors'

import { Form, ButtonContainer } from './styles'
import { isEmailValid, formatPhone } from '../../utils'
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState'

import CategoriesService from '../../services/CategoriesService'

export const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useSafeAsyncState([])
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true)
  const [isSubmitting, setIsSubmiting] = useState(false)

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors()

  const isFormatValid = name && errors.length === 0

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '')
        setEmail(contact.email ?? '')
        setPhone(formatPhone(contact.phone) ?? '')
        setCategoryId(contact.category.id ?? '')
      },
      resetFields: () => {
        setName('')
        setEmail('')
        setPhone('')
        setCategoryId('')
      }
    }),
    []
  )

  useEffect(() => {
    async function loadingCategories() {
      try {
        const categoryList = await CategoriesService.listCategories()

        setCategories(categoryList)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadingCategories()
  }, [setCategories, setIsLoadingCategories])

  function handleNameChange(event) {
    setName(event.target.value)

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' })
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail inválido.' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmiting(true)

    await onSubmit({ name, email, phone, categoryId })

    setIsSubmiting(false)
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormatValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
})

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
