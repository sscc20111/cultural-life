// app/detail/[id]/page.tsx
import Header from "../components/Header";

export default async function DetailPage({ params }: { params: { id: string } }) {
  const res = await fetch(`https://example.com/movie-api/${params.id}`);
  const detail = await res.json();

  return (
    <div>
      <Header />
      <h1>{detail.title}</h1>
      <p>{detail.description}</p>
    </div>
  );
}
