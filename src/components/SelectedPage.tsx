/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box, Card, Checkbox, Flex, studioTheme, Text, ThemeProvider} from '@sanity/ui'
import React, {Dispatch, useEffect, useRef} from 'react'
import {CheckedPage, Page} from 'src/types'

interface SelectedPageProps {
  page: Page
  checkedPages: CheckedPage
  setCheckedPages: Dispatch<React.SetStateAction<CheckedPage>>
  isDeselect: boolean
}

const SelectedPage = ({page, checkedPages, setCheckedPages, isDeselect}: SelectedPageProps) => {
  const pageRef = useRef<HTMLInputElement>(null)
  const {title, _id} = page
  useEffect(() => {
    if (isDeselect && pageRef.current && pageRef.current.checked) {
      pageRef.current.checked = false
    }
  }, [isDeselect])
  return (
    <ThemeProvider theme={studioTheme}>
      <Card padding={4}>
        <Flex align="center">
          <Checkbox
            id={page._id}
            className="block"
            ref={pageRef}
            onChange={(e) =>
              setCheckedPages({
                ...checkedPages,
                [page._id]: (e.target as HTMLInputElement).checked,
              })
            }
          />
          <label htmlFor={page._id}>
            <Box flex={1} paddingLeft={3}>
              <Flex gap={2} direction="column">
                <Text>{title}</Text>
                <Text size={1} muted>
                  {_id}
                </Text>
              </Flex>
            </Box>
          </label>
        </Flex>
      </Card>
    </ThemeProvider>
  )
}
export default SelectedPage
