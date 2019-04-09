import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import CalculatorDisplay from '../calculator-display'

test('mounts', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container instanceof Element).toBe(true)
  expect(container.firstChild).toMatchSnapshot()
})
