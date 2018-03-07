import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cookie from 'js-cookie'

const propTypes = {
  locale: PropTypes.string.isRequired,
}

class LocaleButton extends Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    Cookie.set('locale', this.props.locale === 'en' ? 'zh-cn' : 'en')
    alert(this.props.locale)
    window.location.reload(true)
  }

  render() {
    return <button onClick={this.handleClick}>{this.props.locale === 'en' ? '中文' : 'English'}</button>
  }
}

LocaleButton.propTypes = propTypes

export default LocaleButton
