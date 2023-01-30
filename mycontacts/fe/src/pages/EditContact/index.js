import { useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { toast } from '../../utils'
import { Loader } from '../../components/Loader'
import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import ContactsService from '../../services/ContactsService'

export function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const contactFormRef = useRef(null)

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id)

        contactFormRef.current.setFieldsValues(contact)

        setIsLoading(false)
      } catch (error) {
        history.push('/')
        toast({ type: 'danger', text: 'Contato não encontrado!' })
      }
    }

    loadContact()
  }, [id, history])

  function handleSubmit() {}

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Mike Livramento" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  )
}
