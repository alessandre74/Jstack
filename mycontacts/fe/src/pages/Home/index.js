import { Loader } from '../../components/Loader'
import { useHome } from './useHome'
import { Header } from './components/Header'
import { EmptyList } from './components/EmptyList'
import { InputSearch } from './components/InputSearch'
import { ErrorStatus } from './components/ErrorStatus'
import { SearchNotFound } from './components/SearchNotFound'
import ContactsList from './components/ContactsList'

import { Container } from './styles'
import { Modal } from '../../components/Modal'

export function Home() {
  const {
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
  } = useHome()

  const hasContacts = contacts.length > 0

  const isListEmpty = !hasError && !isLoading && !hasContacts

  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            title={`Tem certe za que deseja remover o contato "${contactBeingDelete?.name}"`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      )}
    </Container>
  )
}
