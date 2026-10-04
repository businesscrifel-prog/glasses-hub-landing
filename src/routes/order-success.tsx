import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Order Placed | SHD Optical" }, { name: "description", content: "Thank you for ordering from SHD Optical." }, { property: "og:title", content: "Order Placed | SHD Optical" }, { property: "og:description", content: "Thank you for ordering from SHD Optical." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  validateSearch: z.object({ id: z.string().optional() }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id } = Route.useSearch();
  return (
    <div className="grid min-h-screen place-items-center bg-white px-4 text-center text-ink">
      <div className="max-w-md">
        <CheckCircle2 className="mx-auto h-16 w-16 text-brand-red" />
        <h1 className="mt-4 font-display text-3xl font-extrabold">Order Placed!</h1>
        <p className="mt-2 text-neutral-600">
          Thanks for shopping with SHD Optical. We'll contact you shortly on your provided phone number to confirm delivery.
        </p>
        {id && <p className="mt-4 text-sm">Your order reference: <span className="font-mono font-bold">{id}</span></p>}
        <Link to="/" className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-brand-on-gold hover:bg-brand-red-dark">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
