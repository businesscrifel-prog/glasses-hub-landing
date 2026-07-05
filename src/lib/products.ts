import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export type Product = {
  id: string;
  img: string;
  tag?: "PREMIUM" | "NEW ARRIVAL" | "SALE";
  title: string;
  price: number;
  original: number;
  description: string;
};

export const products: Product[] = [
  { id: "aster-matte-black", img: p1, tag: "PREMIUM", title: "Rayline · Aster · Matte Black · Acetate · Square · Eyeglasses", price: 4990, original: 7990, description: "Handcrafted matte black acetate frame with a modern square silhouette. Lightweight, prescription-ready, and built for long-day comfort." },
  { id: "aeron-gold-smoke", img: p2, tag: "PREMIUM", title: "Aeron · Pilot · Gold-Smoke · Metal · Aviator · Sunglasses", price: 5490, original: 8990, description: "Classic aviator sunglasses in gold metal with smoke gradient lenses. UV400 protection with a polished, timeless silhouette." },
  { id: "nova-tortoise", img: p3, tag: "NEW ARRIVAL", title: "Nova · Circa · Tortoise · Acetate · Round · Eyeglasses", price: 3990, original: 6490, description: "Warm tortoise acetate in a soft round shape. Flatters angular face shapes and pairs with clear or blue-light lenses." },
  { id: "orbit-silver-mirror", img: p4, tag: "NEW ARRIVAL", title: "Orbit · Skyline · Silver-Mirror · Metal · Wayfarer · Sunglasses", price: 5990, original: 9490, description: "Wayfarer-inspired metal frame with silver mirror lenses. Bold, contemporary, and fully polarized." },
];

export function fmt(n: number) {
  return "Rs. " + n.toLocaleString("en-PK");
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}
