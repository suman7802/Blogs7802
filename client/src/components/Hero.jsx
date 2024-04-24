import HeroAnimation from '../assets/hero.svg';

export default function Hero() {
  return (
    <div className="py-4">
      <img
        src={HeroAnimation}
        alt="hero"
        className="mx-auto max-w-full h-auto my-6"
      />
      <h1 className="text-4xl font-semibold text-center leading-relaxed">
        <span className="md:inline block">Discover with&nbsp;</span>
        <span className="text-red-500 md:inline block">Blogs7802</span>
      </h1>
      <p className="text-center p-5">
        Where Ideas Flourish: Explore, Engage, Evolve
      </p>
    </div>
  );
}
