export const TEXT_COLOR = '#314057';

export default function SectionHeader({ children }: { children: React.ReactNode }) {
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