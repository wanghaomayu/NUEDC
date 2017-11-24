import React from 'react'
import NProgress from 'nprogress'
import { Helmet } from 'react-helmet'
import { config } from '../utils'
import pathToRegexp from 'path-to-regexp'
import './app.less'
import '../themes/index.less'
import { connect } from 'dva'
import Layout from '../components/Layout'
const App = (props) => {
  const {loading} = props
  NProgress.start()
  !loading.global && NProgress.done()
  const {logoSrc = '', name = '', iconFontJS, iconFontCSS} = config
  const {app: {role = 'student'}, location: {pathname = ''}} = props
  const match = pathToRegexp(`/${role}/:params`).exec(pathname) || pathname === '/' + role
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        {!match && <meta name='viewport' content='width=device-width, initial-scale=1.0' />}
        <link rel='icon' href={logoSrc} type='image/x-icon' />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel='stylesheet' href={iconFontCSS} />}
      </Helmet>
      <Layout {...props} />
    </div>
  )
}

export default connect(({loading, app}) => ({loading, app}))(App)
