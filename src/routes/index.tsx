import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Phone, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-model.jpg";
import logoAsset from "@/assets/logo-black.png.asset.json";
import cClipon from "@/assets/collection-clipon.jpg";
import cScreen from "@/assets/collection-screen.jpg";
import cMetal from "@/assets/collection-metal.jpg";
import cSun from "@/assets/collection-sunglasses.jpg";
import ed1 from "@/assets/editorial-1.jpg";
import ed2 from "@/assets/editorial-2.jpg";
import { products, fmt, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  "Transition Eyeglasses",
  "Polarized Sunglasses",
  "Sunglasses",
  "Eyeglasses",
  "New Arrival",
  "Screen Protection",
  "Premium",
];

const bestSellers = products;
const clearance: Product[] = products.map((p) => ({ ...p, tag: "SALE", price: Math.round(p.price * 0.55) }));
const newArrivals: Product[] = products.map((p) => ({ ...p, tag: "NEW ARRIVAL" }));

const collections = [
  { img: cClipon, label: "Attachment Clip On Glasses" },
  { img: cScreen, label: "Screen Protection Glasses" },
  { img: cMetal, label: "Metal Frames" },
  { img: cSun, label: "Sunglasses" },
];

function ProductCard({ p }: { p: Product }) {
  const saving = p.original - p.price;
  return (
    <Link
      to="/product/$id"
      params={{ id: p.id }}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square bg-white p-6">
        {p.tag && (
          <span className="absolute left-3 top-3 rounded-sm bg-brand-red px-2 py-1 text-[10px] font-bold tracking-wider text-white">
            {p.tag}
          </span>
        )}
        <img
          src={p.img}
          alt={p.title}
          width={800}
          height={800}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-neutral-100 p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-ink">{p.title}</h3>
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-ink">{fmt(p.price)}</span>
          <span className="text-sm text-neutral-400 line-through">{fmt(p.original)}</span>
        </div>
        <p className="text-xs font-semibold text-brand-red">Saving: {fmt(saving)}</p>
      </div>
    </Link>
  );
}

function ProductGrid({ title, kicker, products }: { title: string; kicker?: string; products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {kicker && <p className="mb-1 text-sm font-semibold text-brand-red">{kicker}</p>}
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
        </div>
        <a href="#" className="group inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-brand-red">
          View all <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((p, i) => <ProductCard key={p.id + i} p={p} />)}
      </div>
    </section>
  );
}

function Index() {
  const { count } = useCart();
  return (
    <div className="min-h-screen bg-white font-sans text-ink antialiased">
      {/* Announcement bar */}
      <div className="bg-brand-red text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 text-[11px] font-medium tracking-wide sm:px-6 lg:px-8">
          <p className="truncate">
            GET FLAT 10% DISCOUNT BY PAYING VIA CARD · NOW DELIVERING WORLDWIDE
          </p>
          <div className="hidden shrink-0 items-center gap-4 md:flex">
            <a href="tel:+923208664099" className="inline-flex items-center gap-1 hover:underline"><Phone className="h-3 w-3" /> +92 320 8664099</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Track Order</a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img src={logoAsset.url} alt="The Glasses Hub" width={1152} height={576} className="h-14 w-auto sm:h-16" />
          </Link>
          <nav className="hidden justify-center xl:flex">
            <ul className="flex items-center gap-6">
              {navLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-ink transition-colors hover:text-brand-red">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4 text-ink">
            <button aria-label="Search" className="transition-colors hover:text-brand-red"><Search className="h-5 w-5" /></button>
            <button aria-label="Account" className="transition-colors hover:text-brand-red"><User className="h-5 w-5" /></button>
            <button aria-label="Wishlist" className="relative transition-colors hover:text-brand-red">
              <Heart className="h-5 w-5" />
            </button>
            <Link to="/cart" aria-label="Cart" className="relative transition-colors hover:text-brand-red">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-brand-red px-1 text-[9px] font-bold text-white">{count}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={heroImg}
          alt="Model wearing stylish black sunglasses"
          width={1600}
          height={900}
          className="h-[520px] w-full object-cover object-[20%_center] sm:h-[600px] lg:h-[680px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/40 to-black/70" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl text-right">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-brand-red">
              New Collection · 2026
            </p>
            <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              Buy Glasses Online — Eyeglasses, Sunglasses & Blue Light Protection
            </h1>
            <p className="mt-4 text-sm text-white/85 sm:text-base">
              Premium frames engineered for everyday clarity. Free lenses on select styles.
            </p>
            <div className="mt-8 flex justify-end">
              <a
                href="#best-sellers"
                className="inline-flex items-center gap-2 rounded-full bg-brand-red px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-brand-red-dark"
              >
                Shop Now <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="best-sellers">
        <ProductGrid title="Best Selling Glasses" products={bestSellers} />
      </div>

      <section className="bg-neutral-50 py-4">
        <ProductGrid
          title="Clearance Sale — Limited Stock, Best Prices"
          kicker="Grab Discounted Eyewear Before It's Gone."
          products={clearance}
        />
      </section>

      <ProductGrid title="New Arrivals" products={newArrivals} />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold text-brand-red">Curated Categories</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Shop by Collection
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {collections.map((c) => (
            <a key={c.label} href="#" className="group block">
              <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={c.img}
                  alt={c.label}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[5/4]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{c.label}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink transition-colors group-hover:bg-brand-red group-hover:text-white">
                      Shop <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-brand-red">Our Promise</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Why Choose The Glasses Hub
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              We obsess over quality, keep prices honest, and stock a range wide enough for men, women and
              kids. Every frame is inspected before it leaves our studio, and worldwide delivery means your
              next pair is only a few days away — not weeks.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {["Free worldwide shipping", "30-day easy returns", "Lifetime frame warranty", "Prescription ready"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img src={ed1} alt="Model wearing clear metal-frame glasses" width={1000} height={1100} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="order-2 overflow-hidden rounded-lg lg:order-1">
            <img src={ed2} alt="Portrait of a man wearing dark acetate eyeglasses" width={1000} height={1100} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="mb-2 text-sm font-semibold text-brand-red">Fit & Finish</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Pick A Frame That Actually Feels Like You
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              A great frame does more than sit on your nose. It looks polished in meetings, holds lenses
              securely through long days, and flatters the shape of your face.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-ink text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          <div className="col-span-2 md:col-span-1">
            <img src={logoAsset.url} alt="The Glasses Hub" width={1152} height={576} loading="lazy" className="h-14 w-auto invert" />
            <p className="mt-3 text-sm text-white/60">Premium eyewear, honest pricing, delivered worldwide.</p>
            <a href="tel:+923208664099" className="mt-3 inline-flex items-center gap-1 text-sm text-white hover:text-brand-red">
              <Phone className="h-3.5 w-3.5" /> +92 320 8664099
            </a>
          </div>
          {[
            { h: "Shop", l: ["Eyeglasses", "Sunglasses", "Blue Light", "Clearance"] },
            { h: "Support", l: ["Contact", "Help Center", "Track Order", "Returns"] },
            { h: "Company", l: ["About", "Stores", "Careers", "Press"] },
          ].map((c) => (
            <div key={c.h}>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">{c.h}</h4>
              <ul className="space-y-2 text-sm text-white/60">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-brand-red">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
          © {new Date().getFullYear()} The Glasses Hub. All rights reserved.
        </div>
      </footer>

      <a
        href="https://wa.me/923208664099"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M19.11 17.2c-.28-.14-1.64-.81-1.89-.9-.25-.09-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.63-1.54-1.91-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.54-.45-.47-.62-.48h-.53c-.18 0-.48.07-.73.34-.25.28-.96.94-.96 2.3 0 1.36.99 2.66 1.13 2.84.14.18 1.95 2.97 4.72 4.16.66.29 1.18.46 1.58.59.66.21 1.27.18 1.75.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33zM16.03 5C9.94 5 5 9.94 5 16.03c0 1.97.52 3.9 1.5 5.6L5 27l5.55-1.45c1.63.89 3.48 1.36 5.48 1.36 6.09 0 11.02-4.94 11.02-11.02C27.05 9.94 22.12 5 16.03 5z"/>
        </svg>
      </a>
    </div>
  );
}
