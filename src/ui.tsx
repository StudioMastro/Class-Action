/** @jsx h */
import { h } from 'preact'
import { Button, Container, render, VerticalSpace } from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'

import './styles.css'

function Plugin(): h.JSX.Element {
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Button fullWidth onClick={() => emit('SAVE_CLASS', { test: true })}>
        Save Class
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin) 