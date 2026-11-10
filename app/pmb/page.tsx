import HalamanPmb from "@/components/HalamanPmb";
import ResponsiveFrame from "@/components/ResponsiveFrame";

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <ResponsiveFrame width={998} height={1214}>
        <HalamanPmb />
      </ResponsiveFrame>
    </main>
  );
}
