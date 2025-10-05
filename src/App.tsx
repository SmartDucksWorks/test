import React, { useEffect, useRef, useState } from "react";

// ===============================
// Primitives
// ===============================
const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const SectionTitle = ({ eyebrow, title, subtitle }: { eyebrow?: React.ReactNode; title: React.ReactNode; subtitle?: React.ReactNode }) => (
  <div className="text-center max-w-3xl mx-auto">
    {eyebrow && (
      <div className="uppercase tracking-widest text-xs font-semibold text-gray-500 mb-2">{eyebrow}</div>
    )}
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">{title}</h2>
    {subtitle && <p className="mt-3 text-gray-600">{subtitle}</p>}
  </div>
);

const CTAButton = ({ href = "#contact", children }: { href?: string; children?: React.ReactNode }) => (
  <a href={href} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-[#80D535] text-white hover:bg-[#6fbf2d] shadow">
    {children}
  </a>
);

const FeatureCard = ({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-3 text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const TeamCard = ({ name, role, blurb, href, imgSrc, imgAlt }: { name: string; role?: string; blurb?: string; href?: string; imgSrc?: string; imgAlt?: string }) => (
  <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-end gap-4">
      {imgSrc ? (
        <img src={imgSrc} alt={imgAlt || name} className="h-60 w-60 rounded-2xl object-cover border" loading="lazy" />
      ) : (
        <div className="h-60 w-60 rounded-2xl bg-gray-100 border flex items-center justify-center text-2xl font-semibold text-gray-500">
          {name.split(" ").map((n) => n?.[0] ?? "").join("")}
        </div>
      )}
      <div className="flex flex-col justify-end h-60 pb-1">
        <div className="font-semibold text-gray-900">{name}</div>
        {role && <div className="text-sm text-gray-600">{role}</div>}
      </div>
    </div>
    {blurb && <p className="mt-4 text-gray-600 text-sm">{blurb}</p>}
    {href && (
      <a href={href} className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-4">LinkedIn</a>
    )}
  </div>
);

// ===============================
// App
// ===============================
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { document.title = "Cycling Batteries"; }, []);

  // Smooth anchor scrolling
  const onAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
        if ((window as any).history?.replaceState) (window as any).history.replaceState(null, "", href);
      }
      setMobileOpen(false);
    }
  };

  // ===== Slideshow (crossfade) for Fazt Batts side image =====
  const slideshowImages = [
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small.jpg?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small2.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small3.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small4.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small5.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small6.PNG?raw=true",
    "https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts_image_small7.PNG?raw=true",
  ];
  const [slideIdx, setSlideIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [fading, setFading] = useState(false);
  useEffect(() => {
    const id = window.setInterval(() => {
      setSlideIdx((i) => {
        setPrevIdx(i);
        setFading(true);
        window.setTimeout(() => setFading(false), 500);
        return (i + 1) % slideshowImages.length;
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  // ===== Autoplay-on-scroll for Technology video =====
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.5 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const navItems = [
    { label: "Products", href: "#products" },
    { label: "Technology", href: "#technology" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
    { label: "Waitlist", href: "#waitlist" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-[#00539D] text-white h-32 flex items-end">
        <Container className="w-full flex items-end justify-between py-4">
          <a href="#" className="flex items-end gap-10 font-semibold">
            <img src="https://github.com/SmartDucksWorks/test/blob/main/CyclingBatteriesLogo_Hi-res1A.png?raw=true" alt="Cycling Batteries Logo" className="h-28 w-auto" />
          </a>
          <nav className="hidden md:flex items-end gap-10 text-2xl">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => onAnchorClick(e, n.href)} className="hover:opacity-80">{n.label}</a>
            ))}
            <CTAButton href="#contact">Talk to us</CTAButton>
          </nav>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden rounded-xl border border-white/20 p-2" aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </Container>
        {mobileOpen && (
          <div className="md:hidden border-t bg-[#00539D]">
            <Container className="py-3 flex flex-col gap-3">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} className="py-1" onClick={(e) => onAnchorClick(e, n.href)}>{n.label}</a>
              ))}
              <CTAButton href="#contact">Talk to us</CTAButton>
            </Container>
          </div>
        )}
      </header>

      {/* Full-width Hero Image */}
      <div className="w-full">
        <img src="https://github.com/SmartDucksWorks/test/blob/main/hero.WEBP?raw=true" alt="Cycling Batteries Hero" className="w-full object-cover max-h-[600px]" />
      </div>

      {/* Hero */}
      <section>
        <Container className="py-16 sm:py-24">
          {/* Centered bubbles row (full-width) */}
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            <span className="inline-flex items-center rounded-xl border border-gray-200 px-5 h-11 text-sm font-semibold text-gray-800 bg-white shadow-sm">Fast-swap ecosystem</span>
            <span className="inline-flex items-center rounded-xl border border-gray-200 px-5 h-11 text-sm font-semibold text-gray-800 bg-white shadow-sm">Smart battery pack</span>
            <span className="inline-flex items-center rounded-xl border border-gray-200 px-5 h-11 text-sm font-semibold text-gray-800 bg-white shadow-sm">For e-bikes & beyond</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
            {/* Left: logo + copy */}
            <div className="text-center lg:text-left">
              <div className="bg-[#00539D] rounded-2xl p-6 inline-block mb-6">
                <img
                  src="https://github.com/SmartDucksWorks/test/blob/main/FaZtBatts2_green.png?raw=true"
                  alt="Fazt Batts Logo"
                  className="h-48 sm:h-64 w-auto mx-auto"
                />
              </div>
              <p className="text-2xl font-semibold">Fastest charging bike battery on Earth.</p>
              <p className="mt-4 text-lg text-gray-600">0–100% in 12 minutes from any electrical plug, anywhere. Fire-proof casing for both battery and charger.</p>
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
                <a href="#waitlist" className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-[#80D535] text-white hover:bg-[#6fbf2d] shadow">Get early access</a>
                <a href="#technology" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
                </a>
              </div>
            </div>

            {/* Right: large crossfading carousel */}
            <div className="mt-6 lg:mt-10 flex justify-center lg:justify-end">
              <div className="relative h-[32rem] sm:h-[36rem] lg:h-[44rem]">
                <img
                  src={slideshowImages[slideIdx]}
                  alt="Fazt Batts Product"
                  className="h-full w-auto rounded-2xl object-contain border transition-opacity duration-500"
                  style={{ opacity: fading ? 0 : 1 }}
                />
                <img
                  src={slideshowImages[prevIdx]}
                  alt="Fazt Batts Product previous"
                  className="h-full w-auto rounded-2xl object-contain border absolute left-0 top-0 transition-opacity duration-500"
                  style={{ opacity: fading ? 1 : 0 }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="py-20">
        <Container>
          <SectionTitle
            eyebrow="Products"
            title={
              <span aria-label="COMBO" className="inline-flex items-baseline gap-0 text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
                <span className="text-[#00539D]">CO</span>
                <span className="text-[#80D535]">M</span>
                <span className="text-[#00539D]">BO</span>
              </span>
            }
            subtitle="The COMBO is our first product: FaZt Batts + FaZt Charger. Snap together, plug into any outlet, and get 0–100% in 12 minutes or less."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <FeatureCard title="Modular packs">Hot-swap in seconds so riders spend more time moving and less time waiting.</FeatureCard>
            <FeatureCard title="Smart dock">Balanced charging, safety diagnostics, and health tracking built in.</FeatureCard>
            <FeatureCard title="Ecosystem ready">Attach points and connectors designed for e-bikes, cargo, and micromobility.</FeatureCard>
          </div>

          {/* Full-width product image */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow border">
            <img src="https://github.com/SmartDucksWorks/test/blob/main/COMBO.PNG?raw=true" alt="The Combo" className="w-full h-auto object-contain" />
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section id="technology" className="py-20 bg-white">
        <Container>
          <SectionTitle eyebrow="Technology" title="Safety first. Performance always." subtitle="In certification for UL and fire-proof testing." />
          <div className="mt-10 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto">At Cycling Batteries, we revolutionize urban mobility with sustainable, fast-charging battery tech designed to meet the highest safety standards.</p>
          </div>

          {/* Technology Video (autoplay on scroll) */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border">
            <video
              ref={videoRef}
              src="https://cyclingbatteriesvideotest.tor1.cdn.digitaloceanspaces.com/file.mp4"
              poster="https://cyclingbatteriesvideotest.tor1.cdn.digitaloceanspaces.com/VideoPoster.png"
              className="w-full h-auto object-contain"
              muted
              playsInline
              loop
              controls
            />
          </div>
        </Container>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <Container>
          <SectionTitle eyebrow="Team" title="Meet the team behind FaZt Batts" />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TeamCard name="Adam Black" role="Founder, CEO and Co-Inventor" blurb="Adam Black is a pioneering founder and CEO leading Cycling Batteries Corp., where he invented FaZtBatts. His mission is to drive global sustainable transport innovation and deliver climate-forward solutions for millions of riders worldwide." imgSrc="https://static.wixstatic.com/media/4c4b2c_b0991058875946818081d44a5a368ae8~mv2.jpeg/v1/crop/x_42,y_0,w_315,h_400/fill/w_278,h_353,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Adam%20Black.jpeg" imgAlt="Adam Black" />
            <TeamCard name="Darren Miles" role="Co-Inventor, Head of Solar Engineering" blurb="Experienced technician with a demonstrated history in the automotive industry. Skilled in automotive engineering, metal fabrication, and repair. Brighton College of Technology graduate in Mechanical Engineering." imgSrc="https://static.wixstatic.com/media/4c4b2c_7099014b19de48f08daab3fc995ecdff~mv2.jpeg/v1/fill/w_278,h_353,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Darren%20Miles.jpeg" imgAlt="Darren Miles" />
            <TeamCard name="Vadym Karpenko" role="Lead Web & Mobile Developer" blurb="17 years in mobile development with a focus on startups and integrated technology. Led development of 100+ mobile apps; CTO and founder roles." imgSrc="https://static.wixstatic.com/media/4c4b2c_f61df6da45474451981fc61866d0bb35~mv2.jpeg/v1/fill/w_278,h_353,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vadym%20Karpenko.jpeg" imgAlt="Vadym Karpenko" />
            <TeamCard name="Olha Holota" role="Project Manager" blurb="PMP, PMI-ACP, PSM I. 4+ years optimizing processes and leading cross-functional teams across digital health, eLearning, and fintech." imgSrc="https://static.wixstatic.com/media/4c4b2c_f33f7608fe5448b7a00674d74ee2228c~mv2.jpeg/v1/fill/w_278,h_353,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Olha%20Holota.jpeg" imgAlt="Olha Holota" />
            <TeamCard name="Frank Mieles" role="Head of Technical Development" blurb="Process engineering, advanced manufacturing, chemistry, materials science, and data analytics. Formerly at FREYR, Duracell, Unilever, Procter & Gamble." imgSrc="https://static.wixstatic.com/media/4c4b2c_9dc03fbe75ae4194884e69a2cea74aaf~mv2.jpeg/v1/fill/w_278,h_353,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Frank%20Mieles.jpeg" imgAlt="Frank Mieles" />
            <TeamCard name="Jason Belec" role="Lead Product Developer" blurb="Built the business model, proved feasibility, developed prototypes, wrote code, connected to the cloud, designed CAD iterations, and tested—from materials partnerships to micro-manufacturing design." imgSrc="https://static.wixstatic.com/media/4c4b2c_cf8efa38990d4f3ab342d02220ad6a80~mv2.jpeg/v1/fill/w_278,h_353,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jason%20Belec.jpeg" imgAlt="Jason Belec" />
            <TeamCard name="Jeff Levenberg" role="Emerging Markets Team" blurb="Management consultant focused on project/change management, global communications, and cultural economics. Harvard/Princeton/Zicklin alum; founder of Levenberg & Wang Consultancy." imgSrc="https://static.wixstatic.com/media/4c4b2c_9a6caf2f586e4dc38449b06295d02cbd~mv2.jpeg/v1/fill/w_278,h_353,fp_0.59_0.41,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Jeff%20Levenberg.jpeg" imgAlt="Jeff Levenberg" />
            <TeamCard name="Khalid Mayanja" role="Emerging Markets Team" blurb="Seasoned business development executive and CEO with two decades leading international ventures across finance, trade, and emerging markets. CEO of Mukas Capital and MuKAS Group." />
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <Container>
          <SectionTitle eyebrow="Contact" title="Talk to the team" subtitle="Drop us a note—partnerships, pilots, press, or general questions." />
          <div className="mt-10 grid lg:grid-cols-2 gap-8">
            <form method="POST" action="https://formspree.io/f/your-form-id" className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input name="name" required className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" name="email" required className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="you@company.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea name="message" rows={5} className="mt-1 w-full rounded-xl border px-3 py-2" placeholder="How can we help?"></textarea>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-xs text-gray-500">This is a static form—no server needed.</div>
                <button type="submit" className="rounded-2xl bg-[#80D535] px-5 py-2 text-sm font-semibold text-white hover:bg-[#6fbf2d]">Send</button>
              </div>
            </form>
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Where to find us</h3>
              <p className="mt-2 text-gray-600">Chatham, New York U.S.A.</p>
              <div className="mt-4 text-sm">
                <div>Email: info@cyclingbatteries.com</div>
                <div>Phone: +1-646-508-2975</div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold">Press kit</h4>
                <p className="text-gray-600 text-sm">Add logos, product renders, and brand guidelines here.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20">
        <Container>
          <SectionTitle eyebrow="Waitlist" title="Stay in the loop" subtitle="Choose your role and join our early access list." />
          <form method="POST" action="https://formspree.io/f/your-form-id" className="mt-8 rounded-2xl border bg-white p-6 shadow-sm max-w-xl mx-auto">
            <div className="grid gap-3">
              <label className="text-sm font-medium text-gray-700">I’m interested as a:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="userType" value="Consumer" required /> Consumer</label>
                <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="userType" value="Fleet or OEM" /> Fleet or OEM</label>
              </div>
              <input name="email" type="email" required placeholder="you@company.com" className="rounded-xl border px-3 py-2" />
              <button type="submit" className="rounded-xl bg-[#80D535] px-5 py-2 text-white font-semibold hover:bg-[#6fbf2d]">Join Waitlist</button>
            </div>
          </form>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t bg-[#00539D] text-white">
        <Container className="py-10 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-6 text-sm">
            <img src="https://github.com/SmartDucksWorks/test/blob/main/CyclingBatteriesLogo_Hi-res1A.png?raw=true" alt="Cycling Batteries Logo" className="h-24 w-auto" />
            <span>© {new Date().getFullYear()} Cycling Batteries — E-mobility Revolution. Safer, Faster, Smarter E-Bike Batteries.</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#waitlist" onClick={(e) => onAnchorClick(e, "#waitlist")} className="hover:underline">Waitlist</a>
          </div>
        </Container>
      </footer>
    </div>
  );
}
