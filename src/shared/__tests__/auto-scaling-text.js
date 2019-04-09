import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import AutoScalingText from '../auto-scaling-text'

test('renders', () => {
  // const {container} = render(<AutoScalingText />)
  // console.log(container.innerHTML)
  render(<AutoScalingText />)
})
