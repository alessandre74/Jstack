import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../Button'

export function PostHeader(props) {
  return (
    <>
      <strong>
        {props.post.read && <s>{props.post.title}</s>}
        {!props.post.read && props.post.title}
      </strong>

      <Button onClick={() => props.onRemove(props.post.id)}>
        Remover
      </Button>
    </>
  )
}

PostHeader.propTypes = {
  onRemove: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    read: PropTypes.bool.isRequired
  }).isRequired
}
