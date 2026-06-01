import { Hero } from './components/Hero';
import { PackageGrid } from './components/PackageGrid';
import { Playground } from './components/Playground';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <main>
        <PackageGrid />
        <Playground />
      </main>
      <Footer />
    </div>
  );
}
