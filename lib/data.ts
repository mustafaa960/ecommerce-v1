import { supabase } from "./supabase";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  thumbnails?: string[];
  isNew?: boolean;
  discount?: number;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Brand {
  id: string;
  name: string;
  icon: string;
}

export interface ProductOptions {
  search?: string;
  category?: string;
  brand?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export interface Order {
  id: string;
  created_at: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total_amount: number;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
}

export async function getProducts(
  options: ProductOptions = {},
): Promise<Product[]> {
  let query = supabase.from("products").select("*");

  if (options.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  if (options.category) {
    query = query.eq("category_name", options.category);
  }

  if (options.brand) {
    query = query.eq("brand", options.brand);
  }

  // Sorting
  switch (options.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query
        .order("is_new", { ascending: false })
        .order("created_at", { ascending: false });
      break;
    case "relevant":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  // Pagination
  if (options.page && options.pageSize) {
    const from = (options.page - 1) * options.pageSize;
    const to = from + options.pageSize - 1;
    query = query.range(from, to);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data as any[]).map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    description: p.description,
    price: Number.parseFloat(p.price),
    originalPrice: p.original_price
      ? Number.parseFloat(p.original_price)
      : undefined,
    rating: Number.parseFloat(p.rating),
    reviews: p.reviews,
    image: p.image,
    thumbnails: p.thumbnails,
    isNew: p.is_new,
    discount: p.discount,
    category: p.category_name,
  })) as Product[];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, icon")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
}

export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("id, name, icon")
    .order("name");

  if (error) {
    console.error("Error fetching brands:", error);
    return [];
  }

  return data as Brand[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching product by id:", error);
    return null;
  }

  const p = data as any;
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    description: p.description,
    price: Number.parseFloat(p.price),
    originalPrice: p.original_price
      ? Number.parseFloat(p.original_price)
      : undefined,
    rating: Number.parseFloat(p.rating),
    reviews: p.reviews,
    image: p.image,
    thumbnails: p.thumbnails,
    isNew: p.is_new,
    discount: p.discount,
    category: p.category_name,
  } as Product;
}

export async function getProductsCount(
  options: ProductOptions = {},
): Promise<number> {
  let query = supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  if (options.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  if (options.category) {
    query = query.eq("category_name", options.category);
  }

  if (options.brand) {
    query = query.eq("brand", options.brand);
  }

  const { count, error } = await query;

  if (error) {
    console.error("Error fetching products count:", error);
    return 0;
  }

  return count || 0;
}

// Order Management
