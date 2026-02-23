"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addBrand(formData: FormData) {
  const supabase = await createClient();

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
  const icon = formData.get("icon") as string;

  if (!name || !icon)
    return { success: false, error: "Name and icon are required." };

  const { error } = await supabase.from("brands").insert([{ name, icon }]);

  if (error) {
    console.error("Error adding brand:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/brands");
  return { success: true };
}

export async function deleteBrand(id: string) {
  const supabase = await createClient();

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

  const { error } = await supabase.from("brands").delete().eq("id", id);

  if (error) {
    console.error("Error deleting brand:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/brands");
  return { success: true };
}
