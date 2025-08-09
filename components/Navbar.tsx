'use client'
import { Compass } from 'lucide-react'
export default function Navbar() {
  return (<header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b"><div className="container py-3 flex items-center gap-4"><Compass className="h-7 w-7" /><div><h1 className="text-xl font-semibold">Worldschool Connect</h1><p className="text-sm text-gray-500">Find nearby worldschool families. Meet up. Share city guides.</p></div><div className="ml-auto flex items-center gap-2"><button className="btn">Sign in</button><button className="btn-primary">Create account</button></div></div></header>)}
