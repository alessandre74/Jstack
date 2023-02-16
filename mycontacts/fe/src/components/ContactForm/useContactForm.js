import { useState, useEffect, useImperativeHandle } from 'react'
import { useErrors } from '../../hooks/useErrors'
import { isEmailValid, formatPhone } from '../../utils'
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState'
import CategoriesService from '../../services/CategoriesService'

export function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useSafeAsyncState([])
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true)
  const [isSubmitting, setIsSubmiting] = useState(false)

  const { errors, setError, removeError, getErrorMessageByFieldName } = useErrors()

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
    const controller = new AbortController()

    async function loadCategories() {
      try {
        const categoryList = await CategoriesService.listCategories(controller.signal)

        setCategories(categoryList)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()

    return () => {
      controller.abort()
    }
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

  return {
    name,
    email,
    phone,
    categories,
    categoryId,
    setCategoryId,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    isSubmitting,
    isLoadingCategories,
    isFormatValid,
    getErrorMessageByFieldName
  }
}
