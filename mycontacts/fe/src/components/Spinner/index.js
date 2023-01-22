import ProTypes from 'prop-types'

import { StyledSpinner } from './styled'

export function Spinner({ size }) {
  return <StyledSpinner size={size} />
}

Spinner.propTypes = {
  size: ProTypes.number
}

Spinner.defaultProps = {
  size: 32
}
