'use client'
import { useMemo, useState, useEffect } from 'react'
import { Search, PlusCircle, Compass } from 'lucide-react'
import FamilyCard from '@/components/FamilyCard'
import dynamic from 'next/dynamic'
const MapPlaceholder = dynamic(() => import('@/components/MapPlaceholder'), { ssr: false })
type Family = any
export default function Home() {
  const [q, setQ] = useState('')
  const [radius, setRadius] = useState(25)
  const [selectedCity, setSelectedCity] = useState('Toronto, ON')
  const [lang, setLang] = useState('')
  const [families, setFamilies] = useState<Family[]>([])
  const [meetups, setMeetups] = useState<any[]>([])
  const [guides, setGuides] = useState<any[]>([])
  useEffect(()=>{
    fetch('/data/families.json').then(r=>r.json()).then(d=>setFamilies(d.families))
    fetch('/data/meetups.json').then(r=>r.json()).then(d=>setMeetups(d.meetups))
    fetch('/data/city_guides.json').then(r=>r.json()).then(d=>setGuides(d.guides))
  }, [])
  const filtered = useMemo(()=>{
    return families.filter((f:any)=>{
      const hay = `${f.name} ${f.city} ${f.kids} ${f.interests.join(' ')} ${f.languages.join(' ')}`.toLowerCase()
      const cityOk = selectedCity ? f.city.includes(selectedCity.split(',')[0]) : true
      const langOk = lang ? f.languages.map((l:string)=>l.toLowerCase()).includes(lang.toLowerCase()) : true
      const textOk = hay.includes(q.toLowerCase())
      return cityOk && langOk && textOk
    })
  }, [families, q, selectedCity, lang])
  return (<div className="min-h-screen">
      <section className="container grid md:grid-cols-2 gap-6 mt-6">
        <div className="p-6 card">
          <h2 className="text-2xl font-semibold">Who’s nearby?</h2>
          <p className="text-sm text-gray-600 mt-1">Set your city & radius. Filter by languages and interests.</p>
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            <div className="col-span-2 flex items-center gap-2 rounded-2xl border px-3 py-2">
              <Search className="h-4 w-4" />
              <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search families, interests, languages..." className="w-full outline-none" />
            </div>
            <select value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)} className="rounded-2xl border px-3 py-2">
              <option>Toronto, ON</option><option>Austin, TX</option><option>Tangier, MA</option><option>Lisbon, PT</option><option>Tulum, MX</option><option>Bali, ID</option><option>Chiang Mai, TH</option><option>Barcelona, ES</option><option>Porto, PT</option><option>Marrakesh, MA</option>
            </select>
          </div>
          <div className="mt-3 grid sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600">Radius: {radius} km</label>
              <input type="range" min={5} max={100} value={radius} onChange={(e)=>setRadius(parseInt(e.target.value))} />
            </div>
            <select value={lang} onChange={(e)=>setLang(e.target.value)} className="rounded-2xl border px-3 py-2">
              <option value="">Any language</option>
              <option>English</option><option>Spanish</option><option>Arabic</option><option>French</option><option>Portuguese</option><option>Urdu</option><option>Punjabi</option><option>Indonesian</option><option>Thai</option><option>Catalan</option>
            </select>
          </div>
          <div className="mt-5 grid gap-3 max-h-[520px] overflow-auto pr-1">
            {filtered.map((f:any)=> (<FamilyCard key={f.id} f={f} />))}
            {filtered.length === 0 && (<div className="text-sm text-gray-500">No matches here yet. Try expanding your radius.</div>)}
          </div>
        </div>
        <div className="p-6 card">
          {<MapPlaceholder />}
          <div className="mt-5">
            <h3 className="font-semibold">Upcoming meetups</h3>
            <div className="mt-3 grid gap-2">
              {meetups.map(m => (<div key={m.id} className="p-3 rounded-xl border flex items-center justify-between"><div><p className="font-medium">{m.title}</p><p className="text-xs text-gray-500">{m.info}</p></div><button className="btn">RSVP</button></div>))}
              <button className="mt-2 inline-flex items-center gap-2 btn text-sm"><PlusCircle className="h-4 w-4"/> Create meetup</button>
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-10 mb-16">
        <h3 className="text-lg font-semibold">Featured City Guides</h3>
        <div className="mt-3 grid md:grid-cols-3 gap-4">
          {guides.map((g:any, idx:number)=> (<div key={idx} className="p-4 card"><p className="font-medium flex items-center gap-2"><Compass className="h-4 w-4"/> {g.city}</p><ul className="mt-2 list-disc list-inside text-sm text-gray-700">{g.items.map((it:string, i:number)=> (<li key={i}>{it}</li>))}</ul></div>))}
        </div>
      </section>
    </div>)
}
