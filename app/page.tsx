import HalamanSmup from "@/components/HalamanSmup";
import ResponsiveFrame from "@/components/ResponsiveFrame";

export default function Page() {
  return (
    <main className="w-full overflow-hidden">
      <ResponsiveFrame width={998} height={1640}>
        <HalamanSmup />
      </ResponsiveFrame>
    </main>
  );
}
