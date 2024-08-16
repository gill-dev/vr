import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Welcome to AR Art Gallery</h1>
      <Link href="/gallery">
        View AR Gallery
      </Link>
    </main>
  )
}