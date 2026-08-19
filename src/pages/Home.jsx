import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import Category from '../components/Category'
import Featured from '../components/Featured'
import { UserContext } from '../context/UserContext'
import Sale from '../components/Sale'
import BestSellers from '../components/BestSellers'
import FeaturesBar from '../components/FeaturesBar'
import Reviews from '../components/Reviews'

const Home = () => {

  const {fetchProducts} = useContext(UserContext)

  useEffect(() => {
  fetchProducts()
  }, [])
  

  return (
    <div>
        
        <Hero/>
        <Category/>
        <Featured />
        <Sale />
        <BestSellers/>
        <FeaturesBar/>
        <Reviews/>
        
    </div>
  )
}

export default Home