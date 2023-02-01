/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom'
import { useHome } from './useHome'
import { formatPhone } from '../../utils'
import { Loader } from '../../components/Loader'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import arrow from '../../assets/images/arrow.svg'
import edit from '../../assets/images/edit.svg'
import trash from '../../assets/images/trash.svg'
import sad from '../../assets/images/sad.svg'
import emptyBox from '../../assets/images/empty-box.svg'
import magnifierQuestion from '../../assets/images/magnifier-question.svg'

import * as S from './styles'

export function Home() {
  const hook = useHome()

  return (
    <S.Container>
      <Loader isLoading={hook.isLoading} />
      <Modal
        danger
        isLoading={hook.isLoadingDelete}
        visible={hook.isDeleteModalVisible}
        title={`Tem certe za que deseja remover o contato "${hook.contactBeingDelete?.name}"`}
        confirmLabel="Deletar"
        onCancel={hook.handleCloseDeleteModal}
        onConfirm={hook.handelConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {hook.contacts.length > 0 && (
        <S.InputSearchContainer>
          <input
            value={hook.searchTerm}
            type="text"
            placeholder="Pesquisar pelo nome..."
            onChange={hook.handleChangeSearchTerm}
          />
        </S.InputSearchContainer>
      )}

      <S.Header
        justifyContent={
          hook.hasError
            ? 'flex-end'
            : hook.contacts.length > 0
            ? 'space-between'
            : 'center'
        }
      >
        {!hook.hasError && hook.contacts.length > 0 && (
          <strong>
            {hook.filteredContacts.length}
            {hook.filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </S.Header>

      {hook.hasError && (
        <S.ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button type="button" onClick={hook.handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </S.ErrorContainer>
      )}

      {!hook.hasError && (
        <>
          {hook.contacts.length < 1 && !hook.isLoading && (
            <S.EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />

              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão
                <strong> ”Novo contato” </strong> à cima para cadastrar o seu primeiro!
              </p>
            </S.EmptyListContainer>
          )}

          {hook.contacts.length > 0 && hook.filteredContacts.length < 1 && (
            <S.SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>
                Nenhum resultado foi encontrado para
                <strong> {hook.searchTerm}.</strong>
              </span>
            </S.SearchNotFoundContainer>
          )}

          {hook.filteredContacts.length > 0 && (
            <S.ListHeader orderBy={hook.orderBy}>
              <button type="button" onClick={hook.handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </S.ListHeader>
          )}

          {hook.filteredContacts.map((contact) => (
            <S.Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && <small>{contact.category.name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button type="button" onClick={() => hook.handleDeleteContact(contact)}>
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </S.Card>
          ))}
        </>
      )}
    </S.Container>
  )
}
