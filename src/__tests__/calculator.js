import React from 'react'
import {render} from 'calculator-test-utils'
import lodable from 'react-loadable'
import Calculator from '../calculator'

test('renders', async () => {
  await lodable.preloadAll()
  render(<Calculator />)
  // const {container, debug} = render(<Calculator />)
  // debug(container)
})
