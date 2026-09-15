import FadeSection from '@/components/FadeSection';
import WorkImage from '@/components/WorkImage';
import WorkPDF from '@/components/WorkPDF';
import BackHomeLink from '@/components/BackHomeLink';

const TEXT_COLOR = '#314057';

const REFLECTION_PARAGRAPHS = [
  `Completing Project 0 pushed me to think about dimension as something broader than the standard categories of words, images, objects, time, and behavior. It also made me realize how differently I define a dimension compared to how it's typically used in interaction design, where it's treated more like a variable than a lens.`,
  `Starting from the Oxford English Dictionary definition, I found that dimension carries a sense of magnitude and extent, which led me toward ideas like ambition and greatness before I narrowed things down. Free-associating around the word also brought up how dimension can be measurable or abstract, figurative or literal, and that tension shaped a lot of my mind map.`,
  `I ended up choosing love, ambition, time, space, and purpose as my five dimensions, since these were the concepts that kept resurfacing regardless of which direction I explored from, whether through music, negative space, or the quotes I wrote down about dimensions dying out over time. Drawing five full-page representations of these words forced me to translate something intangible into a concrete visual, similar to what a designer does when building an experience around a feeling rather than an object.`,
  `This exercise showed me that a meaningful experience is not built from a fixed set of components, but from whatever dimensions actually matter to the person living it.`,
];

const DIMENSIONS = [
  { label: 'Time', image: '/time.jpg' },
  { label: 'Space', image: '/space.jpg' },
  { label: 'Purpose', image: '/purpose.jpg' },
  { label: 'Ambition', image: '/ambition.jpg' },
  { label: 'Love', image: '/love.jpg' },
];

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: '"lato", sans-serif',
        fontWeight: 400,
        fontSize: '1.8rem',
        color: TEXT_COLOR,
        margin: 0,
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}
    >
      {children}
    </h2>
  );
}

export default function Project0() {
  return (
    <main
      style={{
        backgroundColor: '#f7f4f2',
        backgroundImage: 'url("/bg.png")',
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'top center',
        backgroundSize: '100% auto',
        minHeight: '100vh',
        padding: '6rem 1.5rem 5rem',
      }}
    >
      {/* Title — full width, one line, always fully visible/static */}
      <h1
        style={{
          fontFamily: '"quiche-sans", sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
          color: TEXT_COLOR,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          margin: 0,
          marginBottom: '6rem',
        }}
      >
        DEFINE YOUR 5 D&apos;S
      </h1>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <FadeSection>
          <section style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <SectionHeader>Mind Map</SectionHeader>
            <WorkPDF src="/5d-mind-map.pdf" alt="5D Mind Map" />
          </section>
        </FadeSection>

        {DIMENSIONS.map((dimension) => (
          <FadeSection key={dimension.label}>
            <section style={{ marginBottom: '6rem', textAlign: 'center' }}>
              <SectionHeader>{dimension.label}</SectionHeader>
              <WorkImage src={dimension.image} alt={dimension.label} />
            </section>
          </FadeSection>
        ))}

        <FadeSection>
          <section style={{ maxWidth: '700px', margin: '0 auto 6rem' }}>
            <SectionHeader>Reflection</SectionHeader>
            {REFLECTION_PARAGRAPHS.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontFamily: '"lato", sans-serif',
                  fontWeight: 400,
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: TEXT_COLOR,
                  margin: 0,
                  marginBottom: i < REFLECTION_PARAGRAPHS.length - 1 ? '1.5rem' : 0,
                }}
              >
                {paragraph}
              </p>
            ))}
          </section>
        </FadeSection>

        <FadeSection>
          <div style={{ textAlign: 'center' }}>
            <BackHomeLink color={TEXT_COLOR} returnToProject={0} />
          </div>
        </FadeSection>
      </div>
    </main>
  );
}