'use client'
import React, {useEffect} from 'react'
import { useUser } from '@/app/context/userContext'
import Header from '@/app/components/Header'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

const Profile = () => {
    const user = useUser()
    const router = useRouter()
    const params = useParams()
    const isOwner = user?.user?.userId === params.id


    useEffect(() => {
        if(user) {
            return
        } else {
            router.push("/")
        }
    })

  return (
    <div className='screen'>
        <Header />
        <h1>Profile de {user?.user?.username} </h1>
        <p>{!isOwner ? "visitando perfil" : "Dono"}</p>
    </div>
  )
}

export default Profile