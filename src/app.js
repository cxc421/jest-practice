import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import Calculator from './calculator'
import * as themes from './themes'

class App extends React.Component {
  state = {
    theme: 'dark',
  }

  handleThemeChange = ({target: {value}}) => this.setState({theme: value})

  render() {
    const {theme} = this.state
    return (
      <ThemeProvider theme={themes[theme]}>
        <React.Fragment>
          <Calculator />
          <div style={{marginTop: 30}}>
            <fieldset>
              <legend>Theme</legend>
              <label>
                <input
                  type="radio"
                  onChange={this.handleThemeChange}
                  checked={theme === 'light'}
                  name="theme"
                  value="light"
                />{' '}
                light
              </label>
              <label style={{marginLeft: 20}}>
                <input
                  type="radio"
                  onChange={this.handleThemeChange}
                  checked={theme === 'dark'}
                  name="theme"
                  value="dark"
                />{' '}
                dark
              </label>
            </fieldset>
          </div>
          <div style={{marginTop: 30, textAlign: 'center'}}>
            Calculator component{' '}
            <a href="https://codepen.io/mjijackson/pen/xOzyGX">created</a>
            {' by '}
            <br />
            <a href="https://twitter.com/mjackson">Michael Jackson</a> of{' '}
            <a href="https://reacttraining.com/">React Training</a>
          </div>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}

export default App
