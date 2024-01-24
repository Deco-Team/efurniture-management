import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }} justifyContent='center' alignItems='center'>
      <CircularProgress size={80} />
    </Box>
  )
}

export default Loading
