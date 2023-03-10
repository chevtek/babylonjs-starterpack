import React from "react"
import ReactDOM from "react-dom/client"
import ReactApp from "./ReactApp"
import "./index.css"
import store from "./store"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactApp />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
