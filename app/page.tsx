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
            minHeight: '100vh',
            backgroundColor: '#f7f4f2',
            backgroundImage: 'url("/bg.png")',
            backgroundRepeat: 'repeat-y',
            backgroundPosition: 'top center',
            backgroundSize: '100% auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '36vh',
            paddingBottom: '4.5vh',
          }}
        >
          <ProjectCarousel />
        </div>
      </main>
    </SiteGate>
  );
}