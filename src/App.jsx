import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import SocialProofSection from './components/SocialProofSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

/**
 * App — Semantic page skeleton.
 *
 * Structure:
 *   <header>           — nav + logo
 *   <main>
 *     <section hero>   — headline, subhead, CTA, hero visual
 *     <section features> — Bento-to-Accordion (Feature 2)
 *     <section pricing>  — Matrix pricing + currency switcher (Feature 1)
 *     <section social-proof> — logos / testimonials / stats
 *     <section cta>    — closing conversion block
 *   </main>
 *   <footer>
 *
 * Heading hierarchy: single <h1> in hero, <h2> per section, <h3> for sub-items.
 */
function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <SocialProofSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default App
