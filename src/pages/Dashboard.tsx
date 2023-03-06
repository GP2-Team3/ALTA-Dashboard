import React from 'react'
import Container from '../components/Container'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    // const currentUsers = useSelector((state) => state.users.currentUser)
  return (
    
    <Container>
        <Sidebar />
        <Navbar
        userName={'adam'}
        onLogout={() => {}}
        namePages='Dashboard'
        />
    </Container>
  )
}

export default Dashboard