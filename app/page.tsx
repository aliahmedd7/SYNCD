import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhySyncd from '@/components/WhySyncd'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhySyncd />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
