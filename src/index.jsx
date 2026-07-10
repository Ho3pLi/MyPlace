import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { PostsProvider } from "./context/PostsContext"

createRoot(document.querySelector("#root")).render(
  <PostsProvider>
    <App />
  </PostsProvider>
)
