"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns = (
  onDeleted: (id: number) => void
): ColumnDef<Member>[] => [
  {
    id: "no",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "niat",
    header: "No Niat",
    cell: ({ row }) => <div className="font-medium">{row.original.niat}</div>,
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.address}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "No HP",
    cell: ({ row }) => <div className="font-medium">{row.original.phone}</div>,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="inline-flex gap-3 whitespace-nowrap">
          <Link href={`/dashboard/members/edit/${member.id}`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <FormDelete
            id={member.id}
            onDeleted={() => onDeleted(member.id)} // 🔥
          />
        </div>
      );
    },
  },
];
