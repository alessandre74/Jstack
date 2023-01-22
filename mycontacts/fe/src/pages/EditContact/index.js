import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'

export function EditContact() {
  return (
    <>
      <PageHeader title="Editar Mike Livramento" />
      <ContactForm buttonLabel="Salvar alterações" />
    </>
  )
}
