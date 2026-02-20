import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/lib/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: "No items provided" });
  }

  try {
    const { data, error } = await supabase
      .from("requisition_table")
      .insert(
        items.map((item: any) => ({
          department_id: item.department_id,
          requisition_type_id: item.requisition_type_id,
          items: item.item_name,
          current_stock: item.current_stock,
          reorder_level: item.reorder_level,
          requested_qty: item.requested_qty,
          order_level: item.order_level,
          notes: item.notes,
        }))
      );

    if (error) throw error;

    return res.status(201).json({ message: "Requisition submitted successfully", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Database error" });
  }
}
