import Navbar from "@/components/Navbar";
import Doctors from "@/components/Doctors";
import Footer from "@/components/Footer";

export default function DoctorsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Doctors />
      <Footer />
    </main>
  );
}