import ProTypes from 'prop-types'

import { StyledSpinner } from './styled'

export function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />
}

Spinner.propTypes = {
  size: ProTypes.number
}
