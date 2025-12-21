import { toast } from "sonner";

export interface Member {
  id: number;
  name: string;
  niat: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

const baseUrl = "/api/members";

// GET : Function getMembers
export async function getMembers(): Promise<Member[]> {
  const res = await fetch(baseUrl, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data member");
  }
  const json = await res.json();

  return json.data;
}

// POST: function createMember

export async function createMember(
  data: Omit<Member, "id" | "createdAt" | "updatedAt">
): Promise<Member> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Gagal membuat member baru");
  }

  return json.data;
}

// GET : function getMemberById
export async function getMemberById(id: number): Promise<Member> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Gagal mengambil data member");
  }

  const json = await res.json();
  return json.data;
}

// PUT : function updateMember

export async function updateMember(data: {
  id: number;
  name: string;
  niat: string;
  address: string;
  phone: string;
}): Promise<Member> {
  const res = await fetch(`${baseUrl}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.message || "Gagal mengupdate member");
  }
  // toast.success("Member berhasil diupdate");
  return json.data;
}

// DELETE : function deleteMember

export async function deleteMember(id: number) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.message || "Gagal menghapus member");
  }
}
