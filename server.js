// Polyfill Node with `Intl` that has data for all locales.
// See: https://formatjs.io/guides/runtime-environments/#server
const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const {readFileSync} = require('fs')
const {basename} = require('path')
// const accepts = require('accepts')
const glob = require('glob')
const next = require('next')

const express = require('express')
const cookieParser = require('cookie-parser')

// require('dotenv').config()

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Get the supported languages by looking for translations in the `lang/` dir.
const languages = glob.sync('./lang/*.json').map((f) => basename(f, '.json'))

// We need to expose React Intl's locale data on the request for the user's
// locale. This function will also cache the scripts by lang in memory.
const localeDataCache = new Map()
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0]
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}

// We need to load and expose the translations on the request for the user's
// locale. These will only be used in production, in dev the `defaultMessage` in
// each message description in the source code will be used.
const getMessages = (locale) => {
  return require(`./lang/${locale}.json`)
}

const detectLocale = (req) => {
  const cookieLocale = req.cookies.locale
  if (languages.indexOf(cookieLocale) !== -1) {
    console.log('inner ==', cookieLocale)
    return cookieLocale
  } else {
    return 'zh-cn'
  }
}

app.prepare()
  .then(() => {
    const server = express()
    server.use(cookieParser())
    server.use((req, res, next) => {
      const locale = detectLocale(req)
      req.locale = locale
      req.localeDataScript = getLocaleDataScript(locale)
      req.messages = getMessages(locale)
      res.cookie('locale', locale, { maxAge: (new Date() * 0.001) + (365 * 24 * 3600) })
      next()
    })

    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    //
    // server.get('/b', (req, res) => {
    //   return app.render(req, res, '/a', req.query)
    // })
    //
    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })
    //
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
