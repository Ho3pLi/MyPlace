import posts from "../post/postsData"

const Data = posts.map(({ id, banner, title, github, slug }) => ({
  id,
  image: banner,
  title,
  github,
  read: `/Blog/${slug}`
}))

export default Data