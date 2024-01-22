import Sidebar from "./homepage/sidebar";
import Timeline from "./homepage/timeline";

export default function Home() {
  return (
    <main className="flex">
      <Sidebar />
      <Timeline />
    </main>
  );
}
