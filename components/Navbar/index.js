import React from 'react'
import {FormattedMessage} from 'react-intl'
import Link from 'next/link'

export default () => (
  <nav>
    <li>
      <Link href='/'>
        <a><FormattedMessage id='nav.home' defaultMessage='Home' /></a>
      </Link>
    </li>
    <li>
      <Link href='/about'>
        <a><FormattedMessage id='nav.about' defaultMessage='About' /></a>
      </Link>
    </li>
  </nav>
)
