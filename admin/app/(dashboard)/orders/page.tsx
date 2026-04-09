import { OrdersTable } from './_components/OrdersTable';

export const metadata = { title: 'Orders | Gauyog Admin' };

export default function OrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and manage all customer orders.
        </p>
      </div>
      <OrdersTable />
    </div>
  );
}
