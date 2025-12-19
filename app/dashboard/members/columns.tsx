"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Member>[] = [
  {
    id: "No",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      const name = row.original;
      return <div className="font-medium">{name.name}</div>;
    },
  },
  {
    accessorKey: "niat",
    header: "No Niat",
    cell: ({ row }) => {
      const noNiat = row.original;
      return <div className="font-medium">{noNiat.niat}</div>;
    },
  },
  {
    accessorKey: "address",
    header: "Alamat",
    cell: ({ row }) => {
      const address = row.original;
      return <div className="font-medium">{address.address}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "No HP",
    cell: ({ row }) => {
      const phone = row.original;
      return <div className="font-medium">{phone.phone}</div>;
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link href={`/dashboard/members/edit/${member.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" /> Edit
            </Button>
          </Link>
          <FormDelete id={member.id} />
        </div>
      );
    },
  },
];
