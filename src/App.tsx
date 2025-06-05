// src/App.tsx
import  { useEffect, useState } from 'react'
import { NewsItem } from './types/common/newsItem'
import { useFetchNews } from './hooks/useFetchNews'
import { NewsImportanceList } from './components/lists/newsImportanceList'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import MyInfo from './pages/myInfo'
import MyNews from './pages/myNews'
import MyPage from './pages/myPage'
import NotificationComponent from './pages/notification'
import Login from './components/login'
import NewsDetail from './NewsDetail'
import MyMain from './MyMain'
import BottomBar from './components/BottomBar'

export default function App() {
  // const [news, setNews] = useState<NewsItem[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // useEffect(() => {
  //   useFetchNews()
  //     .then((items:any) => setNews(items))
  //     .catch((e:any) => setError(e.message))
  //     .finally(() => setLoading(false))
  // }, [])

  // if (loading) return <div>Loading news…</div>
  // if (error)   return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
      //<BrowserRouter>
      <>
        <Routes>
        <Route path='/newsdetails' element={<NewsDetail />} />
        <Route path='/mymain' element={<MyMain />} />

          
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/mypage/info' element={<MyInfo />} />
        <Route path='/mypage/news' element={<MyNews />} />
        <Route path='/mypage/notification' element={<NotificationComponent />} />
        <Route path='/login' element={<Login auth={{
       login: async (providerName: string) => {
      console.log(`Logging in with ${providerName}`);
      return { user: { uid: "dummy-user-id" } }; 
        },
        onAuthChange: (callback) => {
          console.log("Auth change listener registered");
         // 테스트용으로 1초 후 로그인된 상태로 넘김
         setTimeout(() => {
           callback({ uid: "dummy-user-id" });
         }, 1000);
         }
         }} />} />

        </Routes>
      <BottomBar />
      </>
    //</BrowserRouter>
  )
}