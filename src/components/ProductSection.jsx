export default function ProductSection({ title, items }) {
  if (!items) return null;
  return (
    <>
      <h2 className="text-lg font-semibold text-black mt-6 mb-2">{title}</h2>
      <ul className="list-disc pl-5 text-[#616161] mb-4">
        {items.map((item, idx) => (
          <li key={idx} className="mb-1">{item}</li>
        ))}
      </ul>
    </>
  );
}