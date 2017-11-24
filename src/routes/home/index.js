import React from 'react'
import './index.less'

import HomeBanner from './Banner/Banner'
import ShowItems from './ShowItems'
import Footer from './Footer'
const HomePage = () => {
  return (
    <div className='home-page'>
      <HomeBanner />
      <ShowItems />
      <Footer />
    </div>
  )
}

export default HomePage
