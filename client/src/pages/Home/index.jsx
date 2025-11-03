import Hero from '@components/home/Hero';
import FeaturedBooks from '@components/home/FeaturedBooks';
import Categories from '@components/home/Categories';
import WhyChooseUs from '@components/home/WhyChooseUs';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBooks />
      <Categories />
      <WhyChooseUs />
    </>
  );
}
