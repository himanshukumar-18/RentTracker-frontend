import './App.css'
// import { Nav, Footer } from "./index.js"
import { Outlet } from "react-router"
import { Provider } from 'react-redux'
import store from './app/store.js'
import { Sidebar, Loader } from './index.js'

function App() {

  return (
    <Provider store={store}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </Provider>
  )
}

export default App
