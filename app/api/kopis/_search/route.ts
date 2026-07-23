export async function GET() {
  return Response.json(
    { ok: false, error: "아직 구현되지 않은 API입니다." },
    { status: 501 }
  );
}