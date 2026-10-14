import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import AboutPage from '@/pages/AboutPage'
import ActivitiesPage from '@/pages/ActivitiesPage'
import ContactPage from '@/pages/ContactPage'
import FounderPage from '@/pages/FounderPage'
import ProductPage from '@/pages/ProductPage'
import ShopComingSoonPage from '@/pages/ShopPage'
import StorePage from '@/pages/StorePage'
import PartnerPage from '@/pages/PartnerPage'
import HomePage from '@/pages/HomePage'
import { PRODUCTS, STORES } from '@/data/catalog'
import type { Navigate, Page } from '@/types/navigation'

export default function App() {
  const [route, setRoute] = useState<{ page: Page; section?: string }>({ page: 'home' })
  const { page } = route
  const homeScroll = useRef(0)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [selectedStore, setSelectedStore] = useState(0)

  const navigate = useCallback<Navigate>(
    (nextPage, section) => {
      if (page === 'home' && nextPage !== 'home') homeScroll.current = window.scrollY
      setRoute({ page: nextPage, section })
    },
    [page],
  )

  useLayoutEffect(() => {
    const target = route.section ? document.getElementById(route.section) : null
    if (target) {
      target.scrollIntoView({ block: 'start', behavior: 'instant' })
    } else {
      window.scrollTo({ top: page === 'home' ? homeScroll.current : 0, behavior: 'instant' })
    }
  }, [route, page])

  if (page === 'contact') return <ContactPage navigate={navigate} />
  if (page === 'shop') return <ShopComingSoonPage navigate={navigate} />
  if (page === 'about') return <AboutPage navigate={navigate} />
  if (page === 'partner') return <PartnerPage navigate={navigate} />
  if (page === 'founder') return <FounderPage navigate={navigate} />
  if (page === 'activities') return <ActivitiesPage navigate={navigate} />
  if (page === 'product') {
    return <ProductPage navigate={navigate} product={PRODUCTS[selectedProduct]} />
  }
  if (page === 'store') {
    return <StorePage navigate={navigate} store={STORES[selectedStore]} />
  }

  return (
    <HomePage
      navigate={navigate}
      setSelectedProduct={setSelectedProduct}
      setSelectedStore={setSelectedStore}
    />
  )
}
