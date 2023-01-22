import { PageHeader } from '../../components/PageHeader'
import { ContactForm } from '../../components/ContactForm'
import { unFormatPhone, toast } from '../../utils'
import ContactsService from '../../services/ContactsService'

export function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: unFormatPhone(formData.phone),
        category_id: formData.categoryId
      }

      await ContactsService.createContact(contact)

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

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  )
}
