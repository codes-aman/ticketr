
import SellerDashboard  from '@/components/SellerDashboard'
import { redirect } from 'next/navigation';
import {auth} from "@clerk/nextjs/server"
import React from 'react'

async function SellerPage() {
    const {userId} = await auth();
    if(!userId) redirect("/");
  return (
    <div className='min-h-screen bg-gray-50'>
        <SellerDashboard/>
    </div>
  )
}

export default SellerPage
