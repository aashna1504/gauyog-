import { Suspense, lazy } from "react";
import "./App.css";
import Hero from "./frontend/Home/Hero";

const ProductSection = lazy(() => import("./frontend/Home/Products"));
const WhyChooseUs    = lazy(() => import("./frontend/Home/ChooseUs"));
const AllProducts    = lazy(() => import("./frontend/Home/Allproducts"));
const Testimonial    = lazy(() => import("./frontend/Home/Testimonial"));
const Map            = lazy(() => import("./frontend/Home/Map"));

function App() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <ProductSection />
        <WhyChooseUs />
        <AllProducts />
        <Testimonial />
        <Map />
      </Suspense>
    </>
  );
}

export default App;
