import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { toast, unFormatPhone } from '../../utils'
import { Loader } from '../../components/Loader'
import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import ContactsService from '../../services/ContactsService'

export function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')
  const contactFormRef = useRef(null)

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id)

        contactFormRef.current.setFieldsValues(contact)

        setIsLoading(false)
        setContactName(contact.name)
      } catch (error) {
        history.push('/')
        toast({ type: 'danger', text: 'Contato não encontrado!' })
      }
    }

    loadContact()
  }, [id, history])

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: unFormatPhone(formData.phone),
        category_id: formData.categoryId
      }

      const contactData = await ContactsService.updateContact(id, contact)

      setContactName(contactData.name)

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!'
      })
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  )
}
