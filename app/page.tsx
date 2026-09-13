import EyesHero from '@/components/EyesHero';
import ProjectCarousel from '@/components/ProjectCarousel';
import SiteGate from '@/components/SiteGate';

export default function Home() {
  return (
    <SiteGate>
      <main>
        <EyesHero />
        <div
          style={{
            position: 'relative',
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
            minHeight: '150vh',
            backgroundColor: '#eef6fb',
            backgroundImage: 'url("/after-hero-bg.svg"), url("/bg.svg")',
            backgroundRepeat: 'no-repeat, repeat',
            backgroundPosition: 'top center, top left',
            backgroundSize: '100% auto, auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '70vh',
            paddingBottom: '8vh',
          }}
        >
          <ProjectCarousel />
        </div>
      </main>
    </SiteGate>
  );
}