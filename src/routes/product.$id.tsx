import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { getProduct, fmt } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  notFoundComponent: () => (
    <div className="p-10 text-center">Product not found. <Link to="/" className="text-brand-red underline">Go home</Link></div>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product not found. <Link to="/" className="text-brand-red underline">Go home</Link>
      </div>
    );
  }

  const saving = product.original - product.price;

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-brand-red">
          <ChevronLeft className="h-4 w-4" /> Back to shop
        </Link>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-8">
          <img src={product.img} alt={product.title} className="mx-auto aspect-square w-full max-w-lg object-contain" />
        </div>
        <div>
          {product.tag && (
            <span className="inline-block rounded-sm bg-brand-red px-2 py-1 text-[10px] font-bold tracking-wider text-white">
              {product.tag}
            </span>
          )}
          <h1 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">{product.title}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold">{fmt(product.price)}</span>
            <span className="text-lg text-neutral-400 line-through">{fmt(product.original)}</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-brand-red">You save {fmt(saving)}</p>

          <p className="mt-6 text-base leading-relaxed text-neutral-600">{product.description}</p>

          <ul className="mt-6 space-y-2 text-sm text-neutral-700">
            {["Prescription-ready lenses", "UV400 protection", "Lifetime frame warranty", "Free worldwide shipping"].map((f) => (
              <li key={f} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-red" /> {f}</li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-neutral-300">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-lg">−</button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-lg">+</button>
            </div>
            <button
              onClick={() => { add(product.id, qty); toast.success("Added to cart"); }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-bold uppercase tracking-wider text-ink hover:bg-ink hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Cart
            </button>
          </div>
          <button
            onClick={() => { add(product.id, qty); navigate({ to: "/checkout" }); }}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-red-dark"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
