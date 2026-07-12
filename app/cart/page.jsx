import { redirect } from "next/navigation";

export default function CartRedirect() {
  // server-side redirect to the actual cart page
  redirect("/dashboard/cart");
}
