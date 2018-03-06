import React from 'react'
import {FormattedMessage, FormattedNumber, defineMessages} from 'react-intl'
import Head from 'next/head'
import pageWithIntl from '../components/PageWithIntl'
import Layout from '../components/Layout'
import Cookie from 'js-cookie'

const {description} = defineMessages({
  description: {
    id: 'description',
    defaultMessage: 'An example app integrating React Intl with Next.js'
  }
})

export default pageWithIntl(({intl}) => {
  const {locale} = intl
  const handleClick = () => {
    Cookie.set('locale', locale === 'en' ? 'zh-cn' : 'en')
    window.location.reload(true)
  }
  return (
    <Layout>
      <Head>
        <meta name='description' content={intl.formatMessage(description)} />
      </Head>
      <p>
        <FormattedMessage id='greeting' defaultMessage='Hello, World!' />
      </p>
      <p>
        <FormattedNumber value={1000} />
      </p>
      <p>
        <button onClick={handleClick}>{locale === 'en' ? '中文' : 'English'}</button>
      </p>
    </Layout>
  )
})
