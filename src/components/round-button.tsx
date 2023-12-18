
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

const RoundButton = styled(Button)({
  boxShadow: 'none',
  lineHeight: 1.5,
  borderRadius: 20,
  '&:hover': {
    boxShadow: 'none',
  },
})

export default RoundButton
