import { TransactionType } from "@prisma/client";

export interface Transaction {
  [x: string]: any;
  id: number;
  memberId: number | null;
  amount: number;
  description?: string | null;
  type: TransactionType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const baseUrl = "/api/transactions";

// GET : Function getTransactions List All Transactions
export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(baseUrl, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }
  const json = await res.json();
  return json.data;
}

// GET : function getTransactionById
export async function getTransactionById(id: number): Promise<Transaction> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  const json = await res.json();
  return json.data;
}

// POST: function createTransaction
export async function createTransaction(data: {
  memberId?: number | null;
  amount: number;
  description?: string | null;
  type: TransactionType;
  date?: Date;
}): Promise<Transaction> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Gagal membuat transaksi");
  }

  const json = await res.json();

  return json.data;
}

// PUT: function updateTransaction
export async function updateTransaction(data: {
  id: number;
  memberId?: number | null;
  amount: number;
  description?: string | null;
  type?: TransactionType;
  date?: Date;
}): Promise<Transaction> {
  const res = await fetch(`${baseUrl}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Gagal memperbarui transaksi");
  }
  const json = await res.json();
  return json.data;
}

/**
 * DELETE : Delete transaction
 */
export async function deleteTransaction(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal menghapus transaksi");
  }
}
