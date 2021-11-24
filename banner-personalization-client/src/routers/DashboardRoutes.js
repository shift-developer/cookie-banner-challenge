import React from 'react'
import { Navbar } from '../components/ui/Navbar'
import { Routes, Route } from 'react-router-dom'
import { HomeScreen } from '../components/domains/HomeScreen'
import { NewDomainScreen } from '../components/domains/NewDomainScreen'
import { DomainScreen } from '../components/domains/DomainScreen'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path='/new' element={<NewDomainScreen />}/>
                <Route path='/domain/:domainId' element={<DomainScreen />}/>
                <Route path='/' element={<HomeScreen />}/>
            </Routes>
        </>
    )
}
