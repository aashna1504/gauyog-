import "./App.css";
import Hero from "./frontend/Home/Hero";
import Testimonial from "./frontend/Home/Testimonial";
import Map from "./frontend/Home/Map";
import ProductSection from "./frontend/Home/Products";
import WhyChooseUs from "./frontend/Home/ChooseUs";
import AllProducts from "./frontend/Home/Allproducts";

function App() {
  return (
    <>
      <Hero />
      <ProductSection />
      <WhyChooseUs />
      <AllProducts />
      <Testimonial />
      <Map />
    </>
  );
}

export default App;
