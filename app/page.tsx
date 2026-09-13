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
            backgroundImage: 'url("/after-hero-bg.png"), url("/bg.png")',
            backgroundRepeat: 'no-repeat, repeat-y',
            backgroundPosition: 'top center, top center',
            backgroundSize: '100% auto, 100% auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '76vh',
            paddingBottom: '10vh',
          }}
        >
          <ProjectCarousel />
        </div>
      </main>
    </SiteGate>
  );
}