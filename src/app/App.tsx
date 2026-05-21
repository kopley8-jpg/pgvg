import { colors } from "@/shared/constants/colors"
import { DevicesPage } from "@pages/DevicePage/DevicesPage"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DevicesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
