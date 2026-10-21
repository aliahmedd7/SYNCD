import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import WhySyncd from '@/components/WhySyncd'
import CtaBand from '@/components/CtaBand'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <HowItWorks />
        <WhySyncd />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
