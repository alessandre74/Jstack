import { useRef } from 'react'
import { PageHeader } from '../../components/PageHeader'
import { ContactForm } from '../../components/ContactForm'
import { unFormatPhone, toast } from '../../utils'
import ContactsService from '../../services/ContactsService'

export function NewContact() {
  const contactFormRef = useRef(null)

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: unFormatPhone(formData.phone),
        category_id: formData.categoryId
      }

      await ContactsService.createContact(contact)

      contactFormRef.current.resetFields()

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!'
      })
    }
  }
  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  )
}
