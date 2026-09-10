import BlobDefs from '@/components/ui/BlobDefs'
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import Comparison from '@/components/sections/Comparison'
import Pricing from '@/components/sections/Pricing'
import SocialProof from '@/components/sections/SocialProof'
import Guarantee from '@/components/sections/Guarantee'
import FinalCta from '@/components/sections/FinalCta'
import Footer from '@/components/sections/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="skip-link rounded-full bg-action-primary px-s6 py-s3 text-sm font-semibold text-white shadow-3"
      >
        Skip to main content
      </a>

      <BlobDefs />
      <Navbar />

      <main id="main">
        {/* 1 — hero + offer countdown  2 — Premium vs Super Premium
            3 — plans (+ testimonial)  4 — trust  5 — guarantee
            6 — promo countdown CTA */}
        <Hero />
        <Comparison />
        <Pricing />
        <SocialProof />
        <Guarantee />
        <FinalCta />
      </main>

      <Footer />
    </>
  )
}
