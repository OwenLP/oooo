import { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Nav from '../components/Global/Nav'
import Container from '../components/Global/Container'
import Cryptosphere from '../components/Cryptosphere/Cryptosphere'
import Overview from '../components/Overview/Overview'
import CurrentPrice from '../components/CurrentPrice/CurrentPrice'
import Markets from '../components/Markets/Markets'
import SMA from '../components/SMA/SMA'
import Links from '../components/Links/Links'
import Volume from '../components/Volume/Volume'

export default function Home() {

  const [prices, setPrices] = useState({})
  const [changes, setChanges] = useState([])

  useEffect(() => {
    //? Get the prices
    axios.get(`${process.env.URL}/cryptosphere-prices`)
    .then(function (response) {
      setPrices(response.data)
    })

    //? Get the changes
    axios.get(`${process.env.URL}/cryptosphere-change`)
    .then(function (response) {
      setChanges(response.data)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>BuckNet</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>

      <Nav />

      <div className="flex justify-center h-screen relative z-0 px-8"
      style={{marginTop: '-64px'}}>
        <div className="self-center">
      <Container>
        <div className="order-2 col-span-6 sm:col-span-3 xl:order-1 xl:col-span-1">
          <Cryptosphere prices={prices} changes={changes} />
          <Volume changes={changes} />
        </div>
        <Overview />
        <div className="order-3 col-span-6 sm:col-span-3 xl:order-3 xl:col-span-1">
          <CurrentPrice />
          <Markets />
          <SMA />
          <Links />
        </div>
      </Container>
        </div>
      </div>

    </div>
  )
}
