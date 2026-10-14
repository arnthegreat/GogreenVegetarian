import { ActivityCarousel } from '@/components/home/ActivityCarousel'
import { Hero } from '@/components/home/Hero'
import { Products } from '@/components/home/Products'
import { Stores } from '@/components/home/Stores'
import { Testimonials } from '@/components/home/Testimonials'
import { Footer, Nav } from '@/components/layout/index'
import type { Navigate } from '@/types/navigation'

type HomePageProps = {
  navigate: Navigate
  setSelectedProduct: (index: number) => void
  setSelectedStore: (index: number) => void
}

export default function HomePage({
  navigate,
  setSelectedProduct,
  setSelectedStore,
}: HomePageProps) {
  return (
    <div className="min-h-screen">
      <Nav navigate={navigate} />
      <ActivityCarousel navigate={navigate} />
      <Hero navigate={navigate} />
      <Products navigate={navigate} setSelectedProduct={setSelectedProduct} />
      <div className="bg-[#C4962A] overflow-hidden py-4 grain grain-light">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, outer) => (
            <span key={outer} className="inline-flex items-center">
              {Array.from({ length: 12 }).map((__, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-4 px-8 text-white text-base font-bold tracking-wide uppercase"
                >
                  {index % 2 === 0 ? 'Plant-Based Food' : 'Plant-Based Product'}
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <Stores navigate={navigate} setSelectedStore={setSelectedStore} />
      <Testimonials />
      <Footer navigate={navigate} />
    </div>
  )
}
