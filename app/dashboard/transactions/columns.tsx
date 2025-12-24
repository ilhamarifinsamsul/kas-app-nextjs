"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

// TColumn
export type TColumn = {
  id: number;
  member_name: string;
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

// helper function to format currency
const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

// helper format date
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export const columns = (
  onDeleted: (id: number) => void
): ColumnDef<TColumn>[] => [
  {
    id: "no",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "member_name",
    header: "Nama Anggota",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.member_name || "-"}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Jumlah",
    cell: ({ row }) => (
      <div className="font-medium">{formatRupiah(row.original.amount)}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.description || "-"}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => (
      <div className="font-medium">{formatDate(row.original.date)}</div>
    ),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="inline-flex gap-3">
          <Link href={`/dashboard/transactions/edit/${transaction.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <FormDelete
            id={transaction.id}
            onDeleted={() => onDeleted(transaction.id)}
          />
        </div>
      );
    },
  },
];
