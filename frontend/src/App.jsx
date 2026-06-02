import { Suspense, lazy, useEffect, useRef, useState } from "react";
import "./App.css";
import Hero from "./frontend/Home/Hero";
import { setPageMeta } from "./utils/seo";

const ProductSection = lazy(() => import("./frontend/Home/Products"));
const WhyChooseUs    = lazy(() => import("./frontend/Home/ChooseUs"));
const AllProducts    = lazy(() => import("./frontend/Home/Allproducts"));
const Testimonial    = lazy(() => import("./frontend/Home/Testimonial"));
const Map            = lazy(() => import("./frontend/Home/Map"));

// Defers rendering its children until the placeholder div scrolls within
// rootMargin of the viewport. Once visible the observer disconnects permanently.
function LazySection({ children, rootMargin = "200px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
}

function App() {
  useEffect(() => {
    setPageMeta({
      title: "Gauyog Kendr | Organic Cow-Based Products & Natural Fertilizers",
      description:
        "Gauyog Kendr offers 100% certified organic cow-based products including Panchgavya, natural fertilizers, Ayurvedic wellness products and more. Pure, natural, delivered to your doorstep.",
      url: "https://www.gauyogkendr.com/",
    });
  }, []);

  return (
    <>
      <Hero />
      <LazySection>
        <Suspense fallback={null}><ProductSection /></Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}><WhyChooseUs /></Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}><AllProducts /></Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={null}><Testimonial /></Suspense>
      </LazySection>
      <LazySection rootMargin="400px">
        <Suspense fallback={null}><Map /></Suspense>
      </LazySection>
    </>
  );
}

export default App;
