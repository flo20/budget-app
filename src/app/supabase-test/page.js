import { createClient } from "@/lib/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("connection_test")
    .select("*");

  if (error) {
    return (
      <main>
        <h1>Supabase connection failed</h1>
        <p>{error.message}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main>
      <h1>Supabase connection successful</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}