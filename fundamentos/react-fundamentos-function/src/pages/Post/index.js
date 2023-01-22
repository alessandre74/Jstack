import React, { useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'

// export default function Post() {
//   const params = useParams()
//   const { search } = useLocation()
//   const queryParams = useMemo(() => new URLSearchParams(search), [search])

//   console.log(queryParams.get('queryParam'))

//   return <h1>Post</h1>
// }

export default class Post extends React.Component {
  constructor(props) {
    super(props)

    const { search } = this.props.location
    this.queryParms = new URLSearchParams(search)
  }

  handleNavigate = () => {
    this.props.history.push('/posts')
  }

  render() {
    return (
      <>
        <button onClick={this.handleNavigate}>
          Voltar para lista de posts
        </button>
        <h1>Post page</h1>
      </>
    )
  }
}
