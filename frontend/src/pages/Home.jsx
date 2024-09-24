import React from 'react'
import SideBar from '../components/SideBar'
import Middle from '../components/Middle'
import Activity from '../components/Activity'
import "../styles/Home.css"

const Home = () => {
  return (
    <div className='grid-container h-full w-full'>
        <SideBar className='grid-item'/>
        <Middle className='grid-item'/>
        <Activity className='grid-item'/>
    </div>
  )
}

export default Home