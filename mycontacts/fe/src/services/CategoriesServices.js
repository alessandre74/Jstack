import HttpClient from './utils/HttpClient'

class CategoriesServices {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listCategories() {
    return this.httpClient.get('/categories')
  }
}

export default new CategoriesServices()
