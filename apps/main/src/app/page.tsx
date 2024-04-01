import { HeroSection } from './_components/hero-section'
import { CatalogSection } from '@/contents/components/catalog-section'

export default async function IndexPage() {
  return (
    <div className="my-container-full">
      <HeroSection />
      <CatalogSection className="bg-slate-200 dark:bg-slate-700" />
      <div className="h-[200px] bg-slate-100 dark:bg-slate-800"></div>
    </div>
  )
}
