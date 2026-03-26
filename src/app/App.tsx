import { DevicesPage } from "@pages/DevicePage/DevicesPage"
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
