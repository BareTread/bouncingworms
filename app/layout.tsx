import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bouncing Worms Portfolio',
  description: 'Interactive portfolio experience with animated worm characters representing unique artworks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
