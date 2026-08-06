import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import App from "./App"
import { PostsProvider } from "./context/PostsContext"

function renderApp(path = "/") {
  window.history.pushState({}, "", path)

  return render(
    <PostsProvider>
      <App />
    </PostsProvider>
  )
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    )
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("App", () => {
  it("renders the portfolio home page", async () => {
    renderApp("/")

    expect(screen.getByRole("heading", { level: 1, name: /daniele barile/i })).toBeInTheDocument()

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/posts", {})
    })
  })

  it("renders an empty blog state when the API returns no posts", async () => {
    renderApp("/blog")

    expect(await screen.findByText(/no published posts yet/i)).toBeInTheDocument()
  })

  it("renders the not found route", async () => {
    renderApp("/missing-page")

    expect(screen.getByRole("heading", { level: 1, name: /page not found/i })).toBeInTheDocument()

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("http://localhost:4000/posts", {})
    })
  })
})
