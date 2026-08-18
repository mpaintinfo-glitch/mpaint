export default function Icon({ id }: { id: string }) {
  return (
    <svg>
      <use href={`#${id}`} />
    </svg>
  );
}
