import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SharedLayout } from './components/SharedLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import OnSales from './pages/OnSales'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/onSales" element={<OnSales />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
