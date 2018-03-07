import React from 'react'
import {defineMessages, injectIntl} from 'react-intl'
import Head from 'next/head'
import fontawesome from '@fortawesome/fontawesome'
import { faPatreon } from '@fortawesome/fontawesome-free-brands'
import { faHeart } from '@fortawesome/fontawesome-free-regular'
import { faChartBar } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faPatreon, faHeart, faChartBar)

import Nav from '../Navbar'

import '../../styles/index.scss'
import '../../styles/style.scss'

const messages = defineMessages({
  title: {
    id: 'title',
    defaultMessage: 'React Intl Next.js Example'
  }
})

export default injectIntl(({intl, title, children}) => (
  <div className='example'>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <title>{title || intl.formatMessage(messages.title)}</title>
    </Head>

    <header>
      <Nav />
    </header>

    {children}

  </div>
))
