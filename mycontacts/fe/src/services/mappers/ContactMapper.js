import { formatPhone, unFormatPhone } from '../../utils'

class ContactMapper {
  toPersistence(domainContact) {
    return {
      id: domainContact.id,
      name: domainContact.name,
      email: domainContact.email,
      phone: unFormatPhone(domainContact.phone),
      category_id: domainContact.categoryId
    }
  }

  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: formatPhone(persistenceContact.phone),
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name
      }
    }
  }
}

export default new ContactMapper()
