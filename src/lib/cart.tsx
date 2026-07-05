import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  detailed: (CartItem & { product: Product })[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "tgh_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add: CartCtx["add"] = (id, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });

  const remove: CartCtx["remove"] = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );

  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      return product ? { ...i, product } : null;
    })
    .filter(Boolean) as (CartItem & { product: Product })[];

  const count = detailed.reduce((n, i) => n + i.qty, 0);
  const subtotal = detailed.reduce((n, i) => n + i.qty * i.product.price, 0);

  return (
    <Ctx.Provider value={{ items, count, subtotal, add, remove, setQty, clear, detailed }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
