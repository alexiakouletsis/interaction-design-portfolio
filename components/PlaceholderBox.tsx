export default function PlaceholderBox({
  message = 'Photos coming soon',
  width = '600px',
  height = '400px',
}: {
  message?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      style={{
        width,
        height,
        maxWidth: '100%',
        margin: '0 auto',
        border: '2px dashed rgba(49, 64, 87, 0.4)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '1rem',
        fontFamily: '"lato", sans-serif',
        fontWeight: 400,
        fontStyle: 'italic',
        fontSize: '1rem',
        color: '#314057',
        opacity: 0.6,
      }}
    >
      {message}
    </div>
  );
}