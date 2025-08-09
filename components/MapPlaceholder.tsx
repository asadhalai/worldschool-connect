import { MapPin } from 'lucide-react'
export default function MapPlaceholder(){return (<div className="aspect-[4/3] w-full rounded-xl border flex items-center justify-center text-gray-400"><div className="text-center"><MapPin className="h-10 w-10 mx-auto"/><p className="mt-2 text-sm">Map will render here (Mapbox). Add NEXT_PUBLIC_MAPBOX_TOKEN to enable.</p></div></div>)}
