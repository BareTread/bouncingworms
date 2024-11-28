import dynamic from 'next/dynamic'

const ClientWrapper = dynamic(() => import('../components/ClientWrapper'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
})

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <ClientWrapper />
    </main>
  )
}
