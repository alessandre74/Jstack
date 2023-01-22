const defaultStyles = {
  spacing: {
    small: 8,
    medium: 16,
    large: 24
  },
  borderRadius: '10px'
}

const dark = {
  ...defaultStyles,
  backgroundColor: '#222',
  textColor: '#fff',
  headerBackgrouncColor: '#111',
  footerBackgrouncColor: '#111',
  postBackgroundColor: '#333'
}

const light = {
  ...defaultStyles,
  backgroundColor: '#fff',
  textColor: '#222',
  headerBackgrouncColor: '#aaa',
  footerBackgrouncColor: '#aaa',
  postBackgroundColor: '#ddd'
}

export default { dark, light }
