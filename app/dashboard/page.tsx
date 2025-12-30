import prisma from "@/lib/prisma";
import { ArrowUpCircle, Wallet, ArrowDownCircle } from "lucide-react";

export default async function DashboardPage() {
  // const incomeAgg
  const incomeAgg = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "INCOME",
    },
  });

  // const totalExpense
  const expenseAgg = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "EXPENSE",
    },
  });

  // const totalIncome
  const totalIncome = incomeAgg._sum.amount ?? 0;
  // const totalExpense
  const totalExpense = expenseAgg._sum.amount ?? 0;
  // const totalBalance
  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col space-y-3">
          <p className="text-sm text-muted-foreground">Total Income</p>
          <ArrowUpCircle className="h-6 w-6 text-green-600" />
          <p className="text-2xl font-semibold text-green-600">
            Rp. {totalIncome.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col space-y-3">
          <p className="text-sm text-muted-foreground">Total Expense</p>
          <ArrowDownCircle className="h-6 w-6 text-red-600" />
          <p className="text-2xl font-semibold text-red-600">
            Rp. {totalExpense.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col space-y-3">
          <p className="text-sm text-muted-foreground">Saldo</p>
          <Wallet className="h-6 w-6 text-blue-600" />
          <p
            className={`text-2xl font-semibold ${
              totalBalance >= 0 ? "text-blue-600" : "text-red-600"
            }`}
          >
            Rp. {totalBalance.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
