import { useRef } from 'react'
import { toast } from '../../utils'
import ContactsService from '../../services/ContactsService'

export function useNewContact() {
  const contactFormRef = useRef(null)

  async function handleSubmit(contact) {
    try {
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
  return { contactFormRef, handleSubmit }
}
