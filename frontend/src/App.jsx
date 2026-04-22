import { useState } from "react";
import "./App.css";
import NavBar from "./frontend/Home/NavBar";
import Hero from "./frontend/Home/Hero";
import Testimonial from "./frontend/Home/Testimonial";
import Map from "./frontend/Home/Map";
import Footer from "./frontend/Home/Footer";
import ProductSection from "./frontend/Home/Products";
import WhyChooseUs from "./frontend/Home/ChooseUs";
import AllProducts from "./frontend/Home/Allproducts";

function App() {

  return (
    <>
      {/* <Hero /> */}
      <ProductSection />
      <WhyChooseUs />
      <AllProducts />
      <Testimonial />
      <Map />
    </>
  );
}

export default App;
