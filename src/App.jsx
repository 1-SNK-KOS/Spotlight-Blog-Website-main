import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { userPosts, allPosts } from './store/postSlice'
import { Query } from 'appwrite'
import appwriteService from './appwrite/config'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData) 
  const userStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))

    // appwriteService.getAllPost()
    //   .then((allPostData) => {
    //     if (allPostData) {
    //       dispatch(allPosts(allPostData.documents))
    //     }
    //   })

  }, [])

  // useEffect(()=>{
  //   if (userStatus) {
  //     console.log("sfsfnEfose",userData)
  //     appwriteService
  //         .getAllPost([Query.equal("user_Id", [String(userData.userData.$id)])])
  //         .then((userPostData) => dispatch(userPosts(userPostData.documents)));
  // }
  // },[userStatus])

  //  console.log("dfds",userStatus)
  return !loading ? (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-black text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App