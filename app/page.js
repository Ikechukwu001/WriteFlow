import DisclaimerModal from '@/components/DisclaimerModal';
import Hero from '@/components/Hero';
import ReviewCarousel from '@/components/Reviews';
import ServicesSection from '@/components/ServiceSection';
import KnowMe from '@/components/KnowMe';

export default function Home() {
  return (
    <main className="w-full">
      <DisclaimerModal />
      <Hero />
      <KnowMe />
      <ServicesSection />
      <ReviewCarousel />
    </main>
  );
}
