import {Box, Spinner} from '@sanity/ui'
import React from 'react'

export const SpinnerFixed: React.FC = () => {
  return (
    <Box marginTop={1}>
      <Spinner muted />
    </Box>
  )
}
