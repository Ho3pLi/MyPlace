export default async () => {
  return new Response(
    JSON.stringify({
      message: "This experimental automation endpoint has been disabled."
    }),
    {
      status: 410,
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
}
