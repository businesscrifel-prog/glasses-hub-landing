import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, ChevronLeft } from "lucide-react";
import { useCart } from "@/lib/cart";
import { fmt } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove, count } = useCart();

  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-brand-red">
          <ChevronLeft className="h-4 w-4" /> Continue shopping
        </Link>
        <h1 className="mt-4 font-display text-3xl font-extrabold">Your Cart ({count})</h1>

        {detailed.length === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-neutral-300 p-10 text-center">
            <p className="text-neutral-600">Your cart is empty.</p>
            <Link to="/" className="mt-4 inline-block rounded-full bg-brand-red px-6 py-2 text-sm font-bold uppercase tracking-wider text-white">Shop now</Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
              {detailed.map((i) => (
                <li key={i.id} className="flex gap-4 p-4">
                  <img src={i.product.img} alt={i.product.title} className="h-24 w-24 rounded object-contain bg-neutral-50 p-2" />
                  <div className="flex-1">
                    <Link to="/product/$id" params={{ id: i.id }} className="line-clamp-2 text-sm font-medium hover:text-brand-red">
                      {i.product.title}
                    </Link>
                    <p className="mt-1 text-sm font-bold">{fmt(i.product.price)}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-md border border-neutral-300">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="px-2 py-1">−</button>
                        <span className="w-8 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="px-2 py-1">+</button>
                      </div>
                      <button onClick={() => remove(i.id)} className="text-neutral-500 hover:text-brand-red">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm font-bold">{fmt(i.product.price * i.qty)}</div>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-lg border border-neutral-200 p-6">
              <h2 className="font-display text-lg font-bold">Order Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className="flex justify-between text-neutral-600"><span>Shipping</span><span>Calculated at checkout</span></div>
              </div>
              <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 text-base font-bold">
                <span>Total</span><span>{fmt(subtotal)}</span>
              </div>
              <Link
                to="/checkout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-red-dark"
              >
                Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
