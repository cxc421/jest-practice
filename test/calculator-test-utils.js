import React from 'react'
import {render as rtlRender} from 'react-testing-library'
import {ThemeProvider} from 'emotion-theming'
import * as themes from 'themes'

function render(ui, ...rest) {
  return rtlRender(
    <ThemeProvider theme={themes.dark}>{ui}</ThemeProvider>,
    ...rest,
  )
}

export * from 'react-testing-library'
// voerride the built-in render with out own
export {render}
