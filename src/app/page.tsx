import { HeroSection } from './_components/hero-section'
import { CatalogSection } from './_components/catalog-section'

export default async function IndexPage() {
  return (
    <div className="my-container my-8 space-y-12">
      <HeroSection />
      {/* <CatalogSection /> */}
      <div className="h-[1000px]" />
    </div>
  )
}
