import React, { useState } from 'react'
import { Post, Header } from '../../components'
import { Title } from './styles'
import { data } from '../../data'
import { ThemeProvider } from '../../context/ThemeContext'

export function App() {
  const [posts, setPosts] = useState(data)

  function handleRefresh() {
    setPosts((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        title: `Title#0${prevState.length + 1}`,
        subtitle: `Sub#0${prevState.length + 1}`,
        likes: 40,
        read: false,
        removed: false
      }
    ])
  }

  function hanldeRemovePost(postId) {
    setPosts((prevState) =>
      prevState.map((post) =>
        post.id === postId
          ? { ...post, removed: true }
          : post
      )
    )
  }

  return (
    <ThemeProvider>
      <Header>
        <Title as="h2">
          Posts da semana
          <button onClick={handleRefresh}>Atualizar</button>
        </Title>
      </Header>
      <hr />

      {posts.map((post) => (
        <Post
          key={post.id}
          onRemove={hanldeRemovePost}
          post={post}
        />
      ))}
    </ThemeProvider>
  )
}
