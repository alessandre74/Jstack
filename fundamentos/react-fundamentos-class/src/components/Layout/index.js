import React, { Component } from 'react'

import Footer from '../Footer'
import Header from '../Header'
import PostsList from '../PostsList'

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <PostsList />
        <Footer />
      </>
    )
  }
}
