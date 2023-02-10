import { useEffect, useState, useMemo, useCallback, useDeferredValue } from 'react'
import { toast } from '../../utils'
import ContactsService from '../../services/ContactsService'

export function useHome() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDelete, setContactBeingDelete] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const deferredSearchTerm = useDeferredValue(searchTerm)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    )
  }, [contacts, deferredSearchTerm])

  const loadingContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactList = await ContactsService.listContacts(orderBy)

      setHasError(false)
      setContacts(contactList)
    } catch (error) {
      setHasError(true)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadingContacts()
  }, [loadingContacts])

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }, [])

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value)
  }

  function handleTryAgain() {
    loadingContacts()
  }

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true)
    setContactBeingDelete(contact)
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true)
      await ContactsService.deleteContact(contactBeingDelete.id)

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDelete.id)
      )

      handleCloseDeleteModal()

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!'
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato!'
      })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact
  }
}
