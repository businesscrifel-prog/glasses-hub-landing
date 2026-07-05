import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Copy } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { fmt } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

type Payment = "cod" | "jazzcash";

const JAZZCASH_NUMBER = "0320 8664099";
const JAZZCASH_NAME = "Noshad Aslam";

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<Payment>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
    postal: "",
    notes: "",
    txnId: "",
  });

  const shipping = subtotal > 0 ? 250 : 0;
  const total = subtotal + shipping;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (detailed.length === 0) { toast.error("Your cart is empty"); return; }
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in all required fields"); return;
    }
    if (payment === "jazzcash" && !form.txnId) {
      toast.error("Please enter the JazzCash transaction ID"); return;
    }
    setSubmitting(true);
    const orderId = "TGH-" + Date.now().toString().slice(-8);
    try {
      const order = { orderId, items: detailed, total, form, payment, createdAt: new Date().toISOString() };
      const prev = JSON.parse(localStorage.getItem("tgh_orders") || "[]");
      localStorage.setItem("tgh_orders", JSON.stringify([order, ...prev]));
      localStorage.setItem("tgh_last_order", JSON.stringify(order));
    } catch {}
    clear();
    navigate({ to: "/order-success", search: { id: orderId } });
  };

  const copyNumber = async () => {
    try { await navigator.clipboard.writeText(JAZZCASH_NUMBER.replace(/\s/g, "")); toast.success("JazzCash number copied"); } catch {}
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-ink">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-brand-red">
          <ChevronLeft className="h-4 w-4" /> Back to cart
        </Link>
        <h1 className="mt-4 font-display text-3xl font-extrabold">Checkout</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            {/* Address */}
            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold">Shipping Address</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name *"><input required value={form.name} onChange={update("name")} className={inputCls} /></Field>
                <Field label="Phone *"><input required type="tel" value={form.phone} onChange={update("phone")} className={inputCls} placeholder="03XX-XXXXXXX" /></Field>
                <Field label="Email" className="sm:col-span-2"><input type="email" value={form.email} onChange={update("email")} className={inputCls} /></Field>
                <Field label="Street address *" className="sm:col-span-2"><textarea required value={form.address} onChange={update("address")} rows={2} className={inputCls} /></Field>
                <Field label="City *"><input required value={form.city} onChange={update("city")} className={inputCls} /></Field>
                <Field label="Province / State"><input value={form.province} onChange={update("province")} className={inputCls} /></Field>
                <Field label="Postal code"><input value={form.postal} onChange={update("postal")} className={inputCls} /></Field>
                <Field label="Order notes (optional)" className="sm:col-span-2"><textarea value={form.notes} onChange={update("notes")} rows={2} className={inputCls} /></Field>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-lg border border-neutral-200 bg-white p-6">
              <h2 className="font-display text-lg font-bold">Payment Method</h2>
              <div className="mt-4 space-y-3">
                <PaymentOption
                  active={payment === "cod"}
                  onClick={() => setPayment("cod")}
                  title="Cash on Delivery (COD)"
                  desc="Pay in cash when your order is delivered to your doorstep."
                />
                <PaymentOption
                  active={payment === "jazzcash"}
                  onClick={() => setPayment("jazzcash")}
                  title="JazzCash — Pay Upfront"
                  desc="Send payment to our JazzCash account, then enter the transaction ID below."
                />

                {payment === "jazzcash" && (
                  <div className="rounded-md border border-brand-red/30 bg-brand-red/5 p-4 text-sm">
                    <p className="font-semibold">Send {fmt(total)} to:</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="font-mono text-base font-bold">{JAZZCASH_NUMBER}</span>
                      <button type="button" onClick={copyNumber} className="rounded p-1 hover:bg-white">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-neutral-700">Account title: <span className="font-semibold">{JAZZCASH_NAME}</span></p>
                    <div className="mt-3">
                      <Field label="JazzCash Transaction ID (TID) *">
                        <input required value={form.txnId} onChange={update("txnId")} className={inputCls} placeholder="e.g. 1234ABCD567" />
                      </Field>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-6">
            <h2 className="font-display text-lg font-bold">Your Order</h2>
            <ul className="mt-4 space-y-3">
              {detailed.map((i) => (
                <li key={i.id} className="flex gap-3">
                  <img src={i.product.img} alt="" className="h-14 w-14 rounded bg-neutral-50 object-contain p-1" />
                  <div className="flex-1 text-sm">
                    <p className="line-clamp-2">{i.product.title}</p>
                    <p className="text-neutral-500">Qty {i.qty}</p>
                  </div>
                  <span className="text-sm font-semibold">{fmt(i.product.price * i.qty)}</span>
                </li>
              ))}
              {detailed.length === 0 && <li className="text-sm text-neutral-500">Cart is empty.</li>}
            </ul>
            <div className="mt-4 space-y-2 border-t border-neutral-200 pt-4 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{fmt(shipping)}</span></div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold"><span>Total</span><span>{fmt(total)}</span></div>
            </div>
            <button
              type="submit"
              disabled={submitting || detailed.length === 0}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-red px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-red-dark disabled:opacity-60"
            >
              {payment === "cod" ? "Place Order (COD)" : "Confirm Order"}
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={"block " + className}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-600">{label}</span>
      {children}
    </label>
  );
}

function PaymentOption({ active, onClick, title, desc }: { active: boolean; onClick: () => void; title: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={"flex w-full items-start gap-3 rounded-md border p-4 text-left transition-colors " + (active ? "border-brand-red bg-brand-red/5" : "border-neutral-300 hover:border-neutral-400")}
    >
      <span className={"mt-0.5 grid h-4 w-4 place-items-center rounded-full border " + (active ? "border-brand-red" : "border-neutral-400")}>
        {active && <span className="h-2 w-2 rounded-full bg-brand-red" />}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="mt-0.5 block text-xs text-neutral-600">{desc}</span>
      </span>
    </button>
  );
}
