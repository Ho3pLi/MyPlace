import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { PostsProvider } from "./context/PostsContext"

ReactDOM.render(
  <PostsProvider>
    <App />
  </PostsProvider>,
  document.querySelector("#root")
)
