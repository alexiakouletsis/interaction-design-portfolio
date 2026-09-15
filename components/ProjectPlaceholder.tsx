import BackHomeLink from '@/components/BackHomeLink';

const TEXT_COLOR = '#314057';

export default function ProjectPlaceholder({ projectIndex }: { projectIndex: number }) {
  return (
    <main
      style={{
        backgroundColor: '#f7f4f2',
        backgroundImage: 'url("/bg.png")',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'top center',
        backgroundSize: '100% auto',
        minHeight: '100vh',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '2rem',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: '"quiche-sans", sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: TEXT_COLOR,
            margin: 0,
            marginBottom: '1rem',
          }}
        >
          Page not built yet
        </h1>
        <p
          style={{
            fontFamily: '"lato", sans-serif',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: TEXT_COLOR,
            margin: 0,
          }}
        >
          Check back soon :)
        </p>
      </div>

      <BackHomeLink color={TEXT_COLOR} returnToProject={projectIndex} />
    </main>
  );
}