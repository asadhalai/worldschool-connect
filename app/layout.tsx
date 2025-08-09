import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
export const metadata: Metadata = { title: 'Worldschool Connect', description: 'Find nearby worldschool families. Meet up. Share city guides.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body><Navbar />{children}<footer className="border-t bg-white mt-10"><div className="container py-6 text-sm text-gray-600 flex items-center gap-4"><span>© {new Date().getFullYear()} Worldschool Connect</span><a className="underline" href="#">Privacy</a><a className="underline" href="#">Safety</a><a className="underline" href="#">Contact</a></div></footer></body></html>)}
