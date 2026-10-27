import FadeSection from '@/components/FadeSection';
import WorkImage from '@/components/WorkImage';
import ImageGrid from '@/components/ImageGrid';
import GalleryLightbox from '@/components/GalleryLightbox';
import BackHomeLink from '@/components/BackHomeLink';
import SectionHeader, { TEXT_COLOR } from '@/components/SectionHeader';
import StoryboardCarousel from '@/components/StoryboardCarousel';
import TabbedContent from '@/components/TabbedContent';
import BackToTopButton from '@/components/BackToTopButton';
import HomeIconButton from '@/components/HomeIconButton';

// ---------- shared small components ----------

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

function SubHeader({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </h3>
  );
}

function AttributesGrid({ attributes }: { attributes: { label: string; value: string }[] }) {
  return (
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
      {attributes.map((attribute) => (
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
  );
}

function ValuesWriting({
  fundamental,
  supplemental,
  admirable,
}: {
  fundamental: string;
  supplemental: string;
  admirable: string;
}) {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <p style={{ fontFamily: '"lato", sans-serif', fontWeight: 700, fontSize: '1rem', color: TEXT_COLOR, margin: 0, marginBottom: '0.5rem' }}>
        Fundamental
      </p>
      <BodyText>{fundamental}</BodyText>
      <p style={{ fontFamily: '"lato", sans-serif', fontWeight: 700, fontSize: '1rem', color: TEXT_COLOR, margin: 0, marginBottom: '0.5rem' }}>
        Supplemental
      </p>
      <BodyText>{supplemental}</BodyText>
      <p style={{ fontFamily: '"lato", sans-serif', fontWeight: 700, fontSize: '1rem', color: TEXT_COLOR, margin: 0, marginBottom: '0.5rem' }}>
        Admirable
      </p>
      <BodyText>{admirable}</BodyText>
    </div>
  );
}

function WorksCited({ citations }: { citations: string[] }) {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <p style={{ fontFamily: '"lato", sans-serif', fontWeight: 700, fontSize: '1rem', color: TEXT_COLOR, margin: 0, marginBottom: '0.75rem' }}>
        Works Cited
      </p>
      {citations.map((citation, i) => (
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
  );
}

// ---------- RESEARCH data ----------

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

const ORIGINAL_PROTOTYPE_IMAGES = [
  '/owala-prototype.png',
  '/owala-prototype-top.png',
  '/owala-holding-body.png',
  '/owala-holding-handle.png',
  '/owala-inside-lid.png',
  '/owalas-sidebyside.png',
];

const RESEARCH_PROPOSAL_PARAGRAPHS = [
  `I am redesigning the Owala water bottle for people who want to track their body's needs without adding another screen to check. My audience includes people like my grandpa, who forgets to drink water on his own, and people like myself, who carry a bottle everywhere but have no way of knowing what their body needs beyond water.`,
  `The bottle keeps its stainless-steel cylinder, button-controlled lid, and collapsible handle from the original, but adds a hand-like indent where the user rests their palm (see Sketch 1). This indent holds sensors that read iron, vitamin, hydration, and possibly hormone levels on contact. The bottom screws off to reveal a replaceable nutrient disk, labeled by supplement type, that infuses the water based on the sensor readings (see Sketch 3). It also comes with a ring, inspired by the Oura Ring, which reads pulse and blood levels throughout the day instead of only when the user touches the bottle (see Sketch 2; Reference Image 1). Smart rings like the Oura Ring are already validated in peer-reviewed studies for accurately tracking heart rate and blood oxygen (Oura, n.d.).`,
  `The message of this object is that hydration and nutrition should respond to what the body needs in the moment, not something the user has to calculate on their own. This matters for older adults, who face higher dehydration risk from reduced thirst perception and benefit from continuous, non-invasive monitoring (Es Sebar et al., 2025). In terms of where it lives, this object is meant to sit in a school bag, at a bedside, at the gym, or in a kitchen, mirroring the original Owala's daily presence.`,
  `Usability is where I ran into the most conflict. An app would organize the sensor data more clearly (see Sketch 4), but research shows apps with small text and multi-step navigation are difficult for older adults to use consistently (Amouzadeh et al., 2025). Since my grandpa is part of my audience, I'm leaning toward a simplified screen built into the bottle itself, so the ring stays optional. To prototype this, I'll build the bottle body out of cardboard, use Model Magic clay for the hand indent, button, and nutrient disk, and paper for smaller details like labels. For the rounded top, I'm considering paper mache over a cardboard armature, though I haven't tried it before, so I'd test it on a scrap piece first.`,
];

const RESEARCH_WORKS_CITED = [
  `Oura. (n.d.). Oura Ring: Science-based research for human health. https://ouraring.com/science-and-research`,
  `Es Sebar, L., Bonaldo, S., Cristaldi, L., Franchin, L., Grassini, S., Iannucci, L., Lombardo, L., Mineo, C., Neviani, A., Restelli, L., Sannino, I., Tonello, S., & Svelto, C. (2025). New insights on hydration monitoring in elderly patients by interdigitated wearable sensors. Sensors, 25(22), Article 7081. https://doi.org/10.3390/s25227081`,
  `Amouzadeh, E., Dianat, I., Faradmal, J., & Babamiri, M. (2025). Optimizing mobile app design for older adults: Systematic review of age-friendly design. Aging Clinical and Experimental Research, 37, Article 248. https://doi.org/10.1007/s40520-025-03157-7`,
];

// ---------- I1 data (health rooted in love) ----------

const I1_SKETCHES = [
  { src: '/bottle-sketch1.png', alt: 'Sketch 1' },
  { src: '/bottle-sketch2.png', alt: 'Sketch 2' },
  { src: '/bottle-sketch3.png', alt: 'Sketch 3' },
  { src: '/bottle-sketch4.png', alt: 'Sketch 4' },
];

const I1_CONCEPT_PARAGRAPHS = [
  `The Owala water bottle I carry every day already means more to me than its function suggests, since I associate it with my own habits and the people I think about when I use it. But I am the one who brings that meaning to it every time I pick it up. I am redesigning this with my grandpa in mind, who forgets to drink water on his own, and there are days I wish I could just buzz him until he picked up a glass.`,
  `The bottle is meant for private, everyday use, encountered alone at a bedside, in a school bag, at the gym, or in a kitchen, rather than in a crowded or public setting. A hand-like indent on the bottle's surface invites the user to rest their palm there, signaling where the sensors read hydration and nutrient levels, while the paired ring extends that same reminder throughout the day through an insistent buzz when the user is dehydrated. This object reflects a future where caring for someone far away, like a grandparent, does not have to rely on a phone call, but can be built directly into the objects we already use every day.`,
];

const I1_ATTRIBUTES = [
  { label: 'Audience', value: `People who need an emotional reason to stay hydrated, like my grandpa, who forgets to drink water on his own, and people like myself who carry a bottle everywhere without thinking about why it matters` },
  { label: 'Form', value: `Stainless-steel cylinder with a hand-like palm indent, button-controlled lid, collapsible handle, and a screw-off bottom` },
  { label: 'Material', value: `Stainless steel body with sensor-embedded palm indent, a built-in screen, and a replaceable nutrient disk` },
  { label: 'Appeal', value: `Makes the user feel a memory tied to someone they're staying healthy for, rather than just showing a number` },
  { label: 'Purpose', value: `Reads hydration, vitamin, and iron levels on contact, then projects a memory and vibrates with its emotion while infusing the water with the needed supplement` },
  { label: 'Message', value: `Staying hydrated means more than the present day, it means having the chance to make new memories and live long enough to relish them` },
  { label: 'Location', value: `School bag, bedside, gym, or kitchen` },
  { label: 'Usability', value: `A screen built into the bottle instead of an app, so feedback stays accessible without a phone, with a gentle vibration pulse instead of an alarming buzz` },
  { label: 'Technique', value: `Cardboard for the main structure, Model Magic clay for the indent and disk, paper for details, with small lit photos behind a paper cutout to simulate the memory projection` },
];

const I1_VALUES = {
  fundamental: `The fundamental value of this fictional water bottle is to turn hydration into an act of care rather than a forgettable chore, by connecting the user's physical need for water to the people they love. Sensors in the palm indent read hydration and nutrient levels. When those run low, the bottle projects a memory of someone the user is staying healthy for, paired with a vibration tuned to the feeling of that memory, so the reminder lands as something personal rather than clinical.`,
  supplemental: `This bottle simplifies the chore of remembering to drink water by outsourcing the reminder to something more persistent than willpower: a paired ring that buzzes throughout the day, inspired by the Oura Ring's constant on-body monitoring. For someone like my grandpa, who forgets to drink water on his own, that reminder does not depend on him thinking to check a screen or an app. It just happens, wherever he is.`,
  admirable: `What makes this bottle unique is that its reminder is never generic. Each time it nudges the user to drink, it surfaces a specific memory of someone they care about, so hydration becomes tied to a relationship rather than a number on a screen. Not everyone would want their water bottle to carry that kind of emotional weight. For someone motivated by love for a specific person, though, it turns a mundane object into something closer to a keepsake.`,
};

const I1_WORKS_CITED = [
  `Oura. (n.d.). Oura Ring: Science-based research for human health. https://ouraring.com/science-and-research`,
  `Es Sebar, L., Bonaldo, S., Cristaldi, L., Franchin, L., Grassini, S., Iannucci, L., Lombardo, L., Mineo, C., Neviani, A., Restelli, L., Sannino, I., Tonello, S., & Svelto, C. (2025). New insights on hydration monitoring in elderly patients by interdigitated wearable sensors. Sensors, 25(22), Article 7081. https://doi.org/10.3390/s25227081`,
  `Amouzadeh, E., Dianat, I., Faradmal, J., & Babamiri, M. (2025). Optimizing mobile app design for older adults: Systematic review of age-friendly design. Aging Clinical and Experimental Research, 37, Article 248. https://doi.org/10.1007/s40520-025-03157-7`,
];

const I1_STORYBOARD_IMAGES = Array.from({ length: 17 }, (_, i) => `/storyboard${i + 1}.png`);
const I2_STORYBOARD_IMAGES = Array.from({ length: 24 }, (_, i) => `/Storyboard2-${i + 1}.png`);
const I1_PROTOTYPE_IMAGES = Array.from({ length: 6 }, (_, i) => `/i1-proto${i + 1}.png`);
const I2_PROTOTYPE_IMAGES = Array.from({ length: 7 }, (_, i) => `/i2-proto${i + 1}.png`);

// ---------- I2 data (engineered addiction) ----------

const I2_CONCEPT_PARAGRAPHS = [
  `I am redesigning the Owala water bottle to provoke a dystopian question: is engineered addiction acceptable if it makes people healthier? This design process was inspired by my grandpa, who frequently forgets to drink water. But my target demographic is much younger, those who are dependent on instant feedback.`,
  `This project has two essential components: the bottle itself and the nutrition/memory disks inserted into the bottom. Each disk is bitten before insertion, pulling a memory that matches the mood the disk is meant to produce. For instance, a happy disk releases nutrients, caffeine, and dopamine alongside a positive memory. A sad disk carries depressant drugs instead, and a sleep disk carries CBD. Once inserted, the disk bleeds its contents into the water, and the screen on the bottle shows the memory pulled from the bite. Dependency on the bottle for emotion and gratification becomes the reminder to drink, as intuitive as checking a phone. This object should be carried with the user always, to work, beside their bed.`,
  `Ultimately, I want to spark conversation about whether engineered addiction can be (or is) a legitimate wellness tool or unethically seeds deeper issues into society.`,
];

const I2_ATTRIBUTES = [
  { label: 'Audience', value: `People who need a strong pull to drink water, from my grandpa, who forgets on his own, to anyone who reaches for their phone before their water bottle` },
  { label: 'Form', value: `Stainless-steel cylinder with finger indents along the side, a screw-off bottom for inserting disks, and a built-in screen` },
  { label: 'Material', value: `Stainless steel body with sensors embedded in the finger indents, a bitten nutrient disk, and a screen that displays a projected memory` },
  { label: 'Appeal', value: `Makes reaching for water as intuitive and compulsive as checking a phone` },
  { label: 'Purpose', value: `Finger indents read the user's nutrient and hydration levels and send a small vibration in response, while each bitten disk releases matching nutrients, mood-altering substances, and a pulled memory into the water once inserted` },
  { label: 'Message', value: `Raises the question of whether engineered addiction is an acceptable way to achieve health and longevity, or an unethical one` },
  { label: 'Location', value: `A bedside or a bag, encountered alone` },
  { label: 'Usability', value: `No ring is needed, since the finger-indent vibration and the dependency itself both function as the reminder to drink` },
  { label: 'Technique', value: `Model Magic clay for the bottle exterior and finger indents, cardboard for the disk, paint for the bite marks, and printed photos glued into a rectangular indent on the clay to act as the screen` },
];

const I2_VALUES = {
  fundamental: `The fundamental value of my fictional water bottle is to improve health and mood by increasing the user's hydration, adding nutritional supplements, and altering brain chemistry to be most optimal to what the user desires. This is achieved by the bottle containing sensors that read the user's nutrition/hydration levels and insertable disks that users bite before putting into the base of the bottle. When users bite these disks, depending on what they select (happy disk, calm disk, etc.), the disk will extract memories to play both on the bottle and in the user's head as they drink, turning the chore into a beneficial experience.`,
  supplemental: `By creating an addiction to the water bottle, this fictional object solves the chore of remembering to drink water. Just as nobody goes anywhere without their phone, the idea is that users will develop the same dependency to this water bottle, feeling "naked" whenever going anywhere without it. This also simplifies nutrition for users, it provides the necessary supplements the user needs, so they don't have to take a variety of different pills and guess at their health anymore.`,
  admirable: `This water bottle is customizable to the user's memories. If the user wants to feel happy, then their own happy memories will be played both on the bottle and in their heads when using the water bottle. Same goes for any other emotion or state the user wants to experience (calmness, motivation, sadness/grieving, etc.). The bottle also has the indent of the user's hand on it exactly where the user should be placing their hand, improving grip and almost hugging the user as they use it.`,
};

const I2_WORKS_CITED = [
  `Zhou, R. (2020). EmotiTactor: Emotional expression of robotic physical contact. https://www.ranzhourobot.com/emotitactor`,
];

// ---------- page ----------

export default function Project1() {
  const researchContent = (
    <>
      <FadeSection>
        <section style={{ marginBottom: '7rem' }}>
          <SectionHeader>Meaningful Objects</SectionHeader>
          {OBJECTS.map((object) => (
            <div key={object.name} style={{ marginBottom: '4rem' }}>
              <SubHeader>{object.name}</SubHeader>
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

      <FadeSection>
        <section style={{ marginBottom: '7rem', textAlign: 'center' }}>
          <SectionHeader>Reference Images</SectionHeader>
          <ImageGrid>
            {REFERENCE_IMAGES.map((src, i) => (
              <WorkImage key={src} src={src} alt={`Reference image ${i + 1}`} maxWidth="320px" maxHeight="45vh" />
            ))}
          </ImageGrid>
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem' }}>
          <SectionHeader>Owala Prototype (Original Object)</SectionHeader>
          <ImageGrid>
            {ORIGINAL_PROTOTYPE_IMAGES.map((src, i) => (
              <WorkImage key={src} src={src} alt={`Owala recreation, angle ${i + 1}`} maxWidth="380px" maxHeight="55vh" />
            ))}
          </ImageGrid>
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem', textAlign: 'center' }}>
          <SectionHeader>Sketches</SectionHeader>
          <ImageGrid>
            {I1_SKETCHES.map((sketch) => (
              <WorkImage key={sketch.src} src={sketch.src} alt={sketch.alt} maxWidth="380px" maxHeight="55vh" />
            ))}
          </ImageGrid>
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ maxWidth: '700px', margin: '0 auto 7rem' }}>
          <SectionHeader>Research Proposal</SectionHeader>
          {RESEARCH_PROPOSAL_PARAGRAPHS.map((p, i) => (
            <BodyText key={i}>{p}</BodyText>
          ))}
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '2rem' }}>
          <WorksCited citations={RESEARCH_WORKS_CITED} />
        </section>
      </FadeSection>
    </>
  );

  const i1Content = (
    <>
      <FadeSection>
        <section style={{ maxWidth: '700px', margin: '0 auto 7rem' }}>
          <SectionHeader>Concept Statement</SectionHeader>
          {I1_CONCEPT_PARAGRAPHS.map((p, i) => (
            <BodyText key={i}>{p}</BodyText>
          ))}
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem' }}>
          <SectionHeader>Object Attributes Grid</SectionHeader>
          <AttributesGrid attributes={I1_ATTRIBUTES} />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem' }}>
          <SectionHeader>Fictional Object Values</SectionHeader>
          <ValuesWriting {...I1_VALUES} />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem', textAlign: 'center' }}>
          <SectionHeader>Storyboard</SectionHeader>
          <StoryboardCarousel images={I1_STORYBOARD_IMAGES} />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem', textAlign: 'center' }}>
          <SectionHeader>Prototype</SectionHeader>
          <GalleryLightbox images={I1_PROTOTYPE_IMAGES} altPrefix="I1 prototype" />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '2rem' }}>
          <WorksCited citations={I1_WORKS_CITED} />
        </section>
      </FadeSection>
    </>
  );

  const i2Content = (
    <>
      <FadeSection>
        <section style={{ maxWidth: '700px', margin: '0 auto 7rem' }}>
          <SectionHeader>Concept Statement</SectionHeader>
          {I2_CONCEPT_PARAGRAPHS.map((p, i) => (
            <BodyText key={i}>{p}</BodyText>
          ))}
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem' }}>
          <SectionHeader>Object Attributes Grid</SectionHeader>
          <AttributesGrid attributes={I2_ATTRIBUTES} />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem' }}>
          <SectionHeader>Fictional Object Values</SectionHeader>
          <ValuesWriting {...I2_VALUES} />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem', textAlign: 'center' }}>
          <SectionHeader>Storyboard</SectionHeader>
          <StoryboardCarousel images={I2_STORYBOARD_IMAGES} applyFilter={false} />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '7rem', textAlign: 'center' }}>
          <SectionHeader>Prototype</SectionHeader>
          <GalleryLightbox images={I2_PROTOTYPE_IMAGES} altPrefix="I2 prototype" />
        </section>
      </FadeSection>

      <FadeSection>
        <section style={{ marginBottom: '2rem' }}>
          <WorksCited citations={I2_WORKS_CITED} />
        </section>
      </FadeSection>
    </>
  );

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
      <HomeIconButton returnToProject={1} />

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
        Fictional Object: The Clarence
      </h1>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <TabbedContent
          tabs={[
            { label: 'Research', content: researchContent },
            { label: 'I1', content: i1Content },
            { label: 'I2', content: i2Content },
          ]}
        />

        <FadeSection>
          <div style={{ textAlign: 'center', marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <BackToTopButton color={TEXT_COLOR} />
            <BackHomeLink color={TEXT_COLOR} returnToProject={1} />
          </div>
        </FadeSection>
      </div>
    </main>
  );
}