import { useEffect, useState, useMemo, useCallback, useTransition } from 'react'
import { toast } from '../../utils'
import ContactsService from '../../services/ContactsService'

export function useHome() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDelete, setContactBeingDelete] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [filteredContacts, setFilteredContacts] = useState([])
  const [isPeding, startTransition] = useTransition()

  // const filteredContacts = useMemo(() => {
  //   return contacts.filter((contact) =>
  //     contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // }, [contacts, searchTerm])

  const loadingContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactList = await ContactsService.listContacts(orderBy)

      setHasError(false)
      setContacts(contactList)
      setFilteredContacts(contactList)
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
    const { value } = event.target

    setSearchTerm(value)

    startTransition(() => {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase())
        )
      )
    })
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
    isPeding,
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
