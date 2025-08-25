import TopStrip from '../components/TopStrip'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Benefits from '../components/Benefits'
import Courses from '../components/Courses'
import LiveOnDemand from '../components/LiveOnDemand'
import BottomCta from '../components/BottomCta'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      <TopStrip />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Courses />
        <LiveOnDemand />
        <BottomCta />
      </main>
      <Footer />
    </>
  )
}
