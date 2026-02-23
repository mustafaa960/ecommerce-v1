"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  // Verify admin status
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category_name = formData.get("category_name") as string;
  const price = parseFloat(formData.get("price") as string);
  const original_price = formData.get("original_price")
    ? parseFloat(formData.get("original_price") as string)
    : null;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const is_new = formData.get("is_new") === "on";

  const productData = {
    name,
    brand,
    category_name,
    price,
    original_price,
    description,
    image,
    is_new,
    rating: 0,
    reviews: 0,
  };

  const { error } = await supabase.from("products").insert([productData]);

  if (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  // Verify admin status
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const category_name = formData.get("category_name") as string;
  const price = parseFloat(formData.get("price") as string);
  const original_price = formData.get("original_price")
    ? parseFloat(formData.get("original_price") as string)
    : null;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const is_new = formData.get("is_new") === "on";

  const productData = {
    name,
    brand,
    category_name,
    price,
    original_price,
    description,
    image,
    is_new,
  };

  const { error } = await supabase
    .from("products")
    .update(productData)
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/products/${id}`);
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();

  // Verify admin status
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  if (!profile?.is_admin) return { success: false, error: "Unauthorized" };

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/products");
  return { success: true };
}
