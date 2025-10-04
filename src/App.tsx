import React, { useEffect, useState, type ReactNode } from "react";

// ===============================
// Types
// ===============================
interface ContainerProps { children: ReactNode; className?: string }
interface SectionTitleProps { eyebrow?: ReactNode; title: ReactNode; subtitle?: ReactNode }
interface FeatureCardProps { title: ReactNode; children?: ReactNode }
interface TeamCardProps { name: string; role?: string; blurb?: string; href?: string; imgSrc?: string; imgAlt?: string }
interface CTAButtonProps { href?: string; children?: ReactNode }

// ===============================
// Primitives
// ===============================
const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ eyebrow, title, subtitle }: SectionTitleProps) => (
  <div className="text-center max-w-3xl mx-auto">
    {eyebrow && (
      <div className="uppercase tracking-widest text-xs font-semibold text-gray-500 mb-2">{eyebrow}</div>
    )}
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
    {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
  </div>
);

const CTAButton = ({ href = "#contact", children }: CTAButtonProps) => (
  <a href={href} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-[#80D535] text-white hover:bg-[#6fbf2d] shadow">
    {children}
  </a>
);

const FeatureCard = ({ title, children }: FeatureCardProps) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-3 text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const TeamCard = ({ name, role, blurb, href, imgSrc, imgAlt }: TeamCardProps) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-end gap-4">
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt || name} className="h-40 w-40 rounded-2xl object-cover border" loading="lazy" />
      ) : (
        <div className="h-40 w-40 rounded-2xl bg-gray-100 border flex items-center justify-center text-2xl font-semibold text-gray-500">
          {name.split(" ").map((n) => n?.[0] ?? "").join("")}
        </div>
      )}
      <div className="flex flex-col justify-end h-40">
        <div className="font-semibold">{name}</div>
        {role && <div className="text-sm text-gray-500">{role}</div>}
      </div>
    </div>
    {blurb && <p className="mt-4 text-gray-600 text-sm">{blurb}</p>}
    {href && (
      <a href={href} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-4">LinkedIn</a>
    )}
  </div>
);

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small.jpg?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small2.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small3.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small4.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small5.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small6.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small7.PNG?raw=true"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => { document.title = "Cycling Batteries"; }, []);

  const navItems = [
    { label: "Products", href: "#products" },
    { label: "Technology", href: "#technology" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
    { label: "Waitlist", href: "#waitlist" },
  ];

  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
        if (history?.replaceState) history.replaceState(null, "", href);
      }
      setMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-[#00539D] text-white h-32 flex items-end">
        <Container className="w-full flex items-end justify-between py-4">
          <a href="#" className="flex items-end gap-10 font-semibold">
            <img src="https://static.wixstatic.com/media/4c4b2c_1c6a8de0cd2c49e6bf205fc7e5fc90eb~mv2.png/v1/crop/x_0,y_1,w_2040,h_816/fill/w_174,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Group%2010.png" alt="Cycling Batteries Logo" className="h-28 w-auto" />
          </a>
          <nav className="hidden md:flex items-end gap-10 text-2xl">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => onAnchorClick(e, n.href)} className="hover:opacity-80">{n.label}</a>
            ))}
            <CTAButton href="#contact">Talk to us</CTAButton>
          </nav>
        </Container>
      </header>

      {/* Hero Section */}
      <section>
        <Container className="py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <div className="bg-[#00539D] rounded-2xl p-6 inline-block">
                <img
                  src="https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts2_green.png?raw=true"
                  alt="Fazt Batts Logo"
                  className="h-48 sm:h-64 w-auto my-6 mx-auto lg:mx-0"
                />
              </div>
              <p className="mt-6 text-2xl font-semibold">Fastest charging bike battery on Earth.</p>
              <p className="mt-4 text-lg text-gray-600">The Cycling Batteries Corporation is pioneering the E-bike battery revolution by creating the most efficient, convenient, universally compatible, and safe e-bike batteries to serve 300+ million global e-bike users.</p>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
                <CTAButton href="#waitlist">Join the waitlist</CTAButton>
                <a href="#technology" onClick={(e) => onAnchorClick(e, "#technology")} className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80">
                  Learn more
                </a>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Fazt Batts Product ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
