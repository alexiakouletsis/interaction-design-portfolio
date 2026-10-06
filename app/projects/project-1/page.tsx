import FadeSection from '@/components/FadeSection';
import WorkImage from '@/components/WorkImage';
import ImageGrid from '@/components/ImageGrid';
import BackHomeLink from '@/components/BackHomeLink';
import SectionHeader, { TEXT_COLOR } from '@/components/SectionHeader';
import StoryboardCarousel from '@/components/StoryboardCarousel';

const OBJECTS = [
  {
    name: 'Bialetti Moka Pot',
    images: ['/moka-pot.png', '/moka-pot-bday.png'],
    description: `The Bialetti Moka Pot is an octagonal, three-chambered pot made of food-grade aluminum. Designed by Alfonso Bialetti and reportedly inspired by early laundry systems, it uses steam pressure to push water up through coffee grounds and into the top chamber. It's typically encountered on a stovetop in a kitchen, and it's designed to be used communally. It affords the experience of making café-quality espresso at home for an affordable price, and easily enough to share with others.`,
    meaning: `I studied abroad in Rome, Italy during my first semester of college. My roommates knew about my insatiable addiction for coffee and witnessed me spend euros daily on various lattes and cappuccinos. So, on the morning of my birthday, September 28th, I walked downstairs to our common area and found a Bialetti Moka Express box with a bow on it. This small stovetop pot was the traditional Italian way of brewing espresso in-house, and though I had never used one before, the way it worked was almost intuitive. I admire the design because it is simple, sleek, and incredibly effective. But I love the design because it reminds me of the people who gifted it to me and the country I was once lucky enough to call home.`,
  },
  {
    name: 'Fidgets (NeeDoh, Mini NeeDoh, Keyboard Clicker)',
    images: ['/fidgets.png'],
    description: `This set includes several small handheld objects with distinct materials and forms. The NeeDohs are made of a thermoplastic rubber outer shell filled with a non-toxic polyvinyl alcohol (PVA) glue, giving them a soft, squishy cube shape with a smooth exterior. The keyboard clicker is built from 3D-printed PLA plastic for its case or base, with PBT or ABS plastic keycaps that produce a satisfying click when pressed. All three are typically encountered in a dorm room, bedroom, or work setting, and they afford the user something to do with their hands. They relieve stress, ease restlessness, and help curb absent-minded habits like skin picking.`,
    meaning: `My roommates and I have an inside joke about our massive fidget collection. Whenever we're huddled together in our dorm gossiping, catching up, or just talking, we usually end up fidgeting with these toys. It's become part of our running joke, but it's also tied up in my memories of them. When I'm working or stressed, I use them to keep myself from picking at my skin; having something to occupy my hands helps me focus and calms me down.`,
  },
  {
    name: 'Owala Water Bottle',
    images: ['/owala.png'],
    description: `The Owala is a smooth, stainless steel cylindrical bottle with a straw at the top shaped to fit comfortably against the lips (the FreeSip Spout), and a lid that opens and closes with the push of a button. It also has a collapsible handle, and the body of the cylinder curves slightly inward to make it easier to grip and to twist open the screw-on top. It's encountered throughout the entire day, as having it on hand tends to mean drinking more water. However, it comes up especially during travel and exercise. It affords the user an easier, more user-friendly way to drink water through its curved stainless-steel body, button-controlled lid, and FreeSip spout, and its collapsible handle makes it portable. As one of the most popular and trendy water bottles right now, it also functions as a kind of social symbol, and being stainless steel, it keeps its contents at a consistent temperature.`,
    meaning: `I've had loved this bottle for many years, so much so that I call it my emotional support water bottle. My 95-year-old grandpa always forgets to drink water, so last Christmas I got him one, and he's finally staying hydrated, which matters because he's been hospitalized before for kidney issues caused by dehydration. I take this bottle with me everywhere: it's always in my school bag, next to my bed, with me at the gym. Since getting it, I've noticed I drink significantly more water (I honestly don't drink much when I don't have it with me) and I love how easy it is to sip from the straw.`,
  },
];

const REFERENCE_IMAGES = ['/ref1.png', '/ref2.png', '/ref3.png', '/ref4.png', '/ref5.png', '/ref6.png'];

const SKETCH_IMAGES = [
  { src: '/bottle-sketch1.png', alt: 'Sketch 1' },
  { src: '/bottle-sketch2.png', alt: 'Sketch 2' },
  { src: '/bottle-sketch3.png', alt: 'Sketch 3' },
  { src: '/bottle-sketch4.png', alt: 'Sketch 4' },
];

const PROPOSAL_PARAGRAPHS = [
  `I am redesigning the Owala water bottle to embed reason and love into health and hydration. My audience includes people like my grandpa, who forgets to drink water on his own, and people like myself, who carry a bottle everywhere but rarely think about why it matters.`,
  `The bottle keeps its stainless-steel cylinder, button-controlled lid, and collapsible handle, but adds a hand-like indent where the user rests their palm (see Sketch 1). This indent holds sensors that read hydration, vitamin, and iron levels on contact. When a reading is low, the bottle projects a memory onto the screen built into its side (see Sketch 4), tied to someone the user is staying healthy for, while the handle vibrates in a pattern matched to the emotion felt during that memory. The bottom screws off to reveal a replaceable nutrient disk that infuses water based on the readings (see Sketch 3).`,
  `It also comes with a ring, inspired by the Oura Ring, which reads pulse and blood levels throughout the day instead of only on contact (see Sketch 2; Reference Image 1) and is already validated for tracking heart rate and blood oxygen (Oura, n.d.). The ring can trigger the same memory and vibration on its own, so the reminder reaches the user even out of sight of the bottle.`,
  `The message is that staying hydrated and taking care of health means more than the present day. It can mean the chance to make new memories, and live long enough to relish in those stories. This matters especially for older adults, who face higher dehydration risk and benefit from personal reminders (Es Sebar et al., 2025).`,
  `This object lives in a school bag, at a bedside, at the gym, or in a kitchen. Usability is where I ran into the most conflict. An app would organize data more clearly, but research shows apps are difficult for older adults to use consistently (Amouzadeh et al., 2025), so I kept the feedback on a screen built into the bottle. The vibration reads as a gentle pulse rather than a buzz, so it makes the user feel the memory, not alarms them.`,
  `To prototype this, I'll build the bottle out of cardboard, use Model Magic clay for the indent and disk, and paper for details. I'll test the projection with small photos behind the paper screen cutout, lit from behind to simulate the glow.`,
];

const WORKS_CITED = [
  `Oura. (n.d.). Oura Ring: Science-based research for human health. https://ouraring.com/science-and-research`,
  `Es Sebar, L., Bonaldo, S., Cristaldi, L., Franchin, L., Grassini, S., Iannucci, L., Lombardo, L., Mineo, C., Neviani, A., Restelli, L., Sannino, I., Tonello, S., & Svelto, C. (2025). New insights on hydration monitoring in elderly patients by interdigitated wearable sensors. Sensors, 25(22), Article 7081. https://doi.org/10.3390/s25227081`,
  `Amouzadeh, E., Dianat, I., Faradmal, J., & Babamiri, M. (2025). Optimizing mobile app design for older adults: Systematic review of age-friendly design. Aging Clinical and Experimental Research, 37, Article 248. https://doi.org/10.1007/s40520-025-03157-7`,
];

const ATTRIBUTES = [
  {
    label: 'Audience',
    value: `People who need an emotional reason to stay hydrated, like my grandpa, who forgets to drink water on his own, and people like myself who carry a bottle everywhere without thinking about why it matters`,
  },
  {
    label: 'Form',
    value: `Stainless-steel cylinder with a hand-like palm indent, button-controlled lid, collapsible handle, and a screw-off bottom`,
  },
  {
    label: 'Material',
    value: `Stainless steel body with sensor-embedded palm indent, a built-in screen, and a replaceable nutrient disk`,
  },
  {
    label: 'Appeal',
    value: `Makes the user feel a memory tied to someone they're staying healthy for, rather than just showing a number`,
  },
  {
    label: 'Purpose',
    value: `Reads hydration, vitamin, and iron levels on contact, then projects a memory and vibrates with its emotion while infusing the water with the needed supplement`,
  },
  {
    label: 'Message',
    value: `Staying hydrated means more than the present day, it means having the chance to make new memories and live long enough to relish them`,
  },
  {
    label: 'Location',
    value: `School bag, bedside, gym, or kitchen`,
  },
  {
    label: 'Usability',
    value: `A screen built into the bottle instead of an app, so feedback stays accessible without a phone, with a gentle vibration pulse instead of an alarming buzz`,
  },
  {
    label: 'Technique',
    value: `Cardboard for the main structure, Model Magic clay for the indent and disk, paper for details, with small lit photos behind a paper cutout to simulate the memory projection`,
  },
];

const PROTOTYPE_IMAGES = [
  '/owala-prototype.png',
  '/owala-prototype-top.png',
  '/owala-holding-body.png',
  '/owala-holding-handle.png',
  '/owala-inside-lid.png',
  '/owalas-sidebyside.png',
];

function BodyText({ children, italic = false }: { children: React.ReactNode; italic?: boolean }) {
  return (
    <p
      style={{
        fontFamily: '"lato", sans-serif',
        fontWeight: 400,
        fontStyle: italic ? 'italic' : 'normal',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        color: TEXT_COLOR,
        margin: 0,
        marginBottom: '1.25rem',
      }}
    >
      {children}
    </p>
  );
}

export default function Project1() {
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
      {/* Title — always fully visible/static, matching Project 0's treatment */}
      <h1
        style={{
          fontFamily: '"quiche-sans", sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
          color: TEXT_COLOR,
          textAlign: 'center',
          margin: 0,
          marginBottom: '5rem',
          lineHeight: 1.15,
        }}
      >
        FICTIONAL OBJECT:
        <br />
        RESEARCH &amp; PROPOSAL
      </h1>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* STEP 1 */}
        <FadeSection>
          <section style={{ marginBottom: '7rem' }}>
            <SectionHeader>Step 1 — Meaningful Objects</SectionHeader>
            {OBJECTS.map((object) => (
              <div key={object.name} style={{ marginBottom: '4rem' }}>
                <h3
                  style={{
                    fontFamily: '"lato", sans-serif',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: TEXT_COLOR,
                    textAlign: 'center',
                    margin: 0,
                    marginBottom: '1.5rem',
                  }}
                >
                  {object.name}
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <ImageGrid>
                    {object.images.map((src) => (
                      <WorkImage key={src} src={src} alt={object.name} maxWidth="380px" maxHeight="55vh" />
                    ))}
                  </ImageGrid>
                </div>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <BodyText>{object.description}</BodyText>
                  <BodyText italic>{object.meaning}</BodyText>
                </div>
              </div>
            ))}
          </section>
        </FadeSection>

        {/* STEP 2 */}
        <FadeSection>
          <section style={{ marginBottom: '7rem' }}>
            <SectionHeader>Step 2 — Redesign Proposal</SectionHeader>
            <h3
              style={{
                fontFamily: '"lato", sans-serif',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: TEXT_COLOR,
                textAlign: 'center',
                margin: 0,
                marginBottom: '2rem',
              }}
            >
              Redesigning the Owala Water Bottle
            </h3>

            <div style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
              {PROPOSAL_PARAGRAPHS.map((paragraph, i) => (
                <BodyText key={i}>{paragraph}</BodyText>
              ))}
            </div>

            <h4
              style={{
                fontFamily: '"lato", sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: TEXT_COLOR,
                textAlign: 'center',
                margin: 0,
                marginBottom: '1.5rem',
              }}
            >
              Reference Images
            </h4>
            <div style={{ marginBottom: '3rem' }}>
              <ImageGrid>
                {REFERENCE_IMAGES.map((src, i) => (
                  <WorkImage key={src} src={src} alt={`Reference image ${i + 1}`} maxWidth="320px" maxHeight="45vh" />
                ))}
              </ImageGrid>
            </div>

            <h4
              style={{
                fontFamily: '"lato", sans-serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: TEXT_COLOR,
                textAlign: 'center',
                margin: 0,
                marginBottom: '1.5rem',
              }}
            >
              Sketches
            </h4>
            <div style={{ marginBottom: '3rem' }}>
              <ImageGrid>
                {SKETCH_IMAGES.map((sketch) => (
                  <WorkImage key={sketch.src} src={sketch.src} alt={sketch.alt} maxWidth="380px" maxHeight="55vh" />
                ))}
              </ImageGrid>
            </div>

            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h4
                style={{
                  fontFamily: '"lato", sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: TEXT_COLOR,
                  margin: 0,
                  marginBottom: '0.75rem',
                }}
              >
                Works Cited
              </h4>
              {WORKS_CITED.map((citation, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: '"lato", sans-serif',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    color: TEXT_COLOR,
                    margin: 0,
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    textIndent: '-1.5rem',
                  }}
                >
                  {citation}
                </p>
              ))}
            </div>
          </section>
        </FadeSection>

        {/* STEP 3 */}
        <FadeSection>
          <section style={{ marginBottom: '7rem' }}>
            <SectionHeader>Step 3 — Object Attributes Grid</SectionHeader>
            <div
              style={{
                maxWidth: '700px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                columnGap: '1.5rem',
                rowGap: '1.25rem',
              }}
            >
              {ATTRIBUTES.map((attribute) => (
                <div key={attribute.label} style={{ display: 'contents' }}>
                  <div
                    style={{
                      fontFamily: '"lato", sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: TEXT_COLOR,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {attribute.label}
                  </div>
                  <div
                    style={{
                      fontFamily: '"lato", sans-serif',
                      fontWeight: 400,
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: TEXT_COLOR,
                    }}
                  >
                    {attribute.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeSection>

        {/* OWALA PROTOTYPE */}
        <FadeSection>
          <section style={{ marginBottom: '7rem' }}>
            <SectionHeader>Owala Prototype</SectionHeader>
            <ImageGrid>
              {PROTOTYPE_IMAGES.map((src, i) => (
                <WorkImage
                  key={src}
                  src={src}
                  alt={`Owala paper prototype, angle ${i + 1}`}
                  maxWidth="380px"
                  maxHeight="55vh"
                />
              ))}
            </ImageGrid>
          </section>
        </FadeSection>

        {/* STORYBOARD */}
        <FadeSection>
          <section style={{ marginBottom: '7rem' }}>
            <SectionHeader>Storyboard</SectionHeader>
            <StoryboardCarousel />
          </section>
        </FadeSection>

        {/* Future steps (Step 4 redesign iterations, etc.) get appended here as
            additional <FadeSection><section>...</section></FadeSection> blocks */}

        <FadeSection>
          <div style={{ textAlign: 'center' }}>
            <BackHomeLink color={TEXT_COLOR} returnToProject={1} />
          </div>
        </FadeSection>
      </div>
    </main>
  );
}