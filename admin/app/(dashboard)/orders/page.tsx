import { OrdersTable } from './_components/OrdersTable';

export const metadata = { title: 'Orders | Gauyog Admin' };

export default function OrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-wider">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">
          All orders placed by customers through the storefront. Update statuses to keep customers informed.
        </p>
      </div>
      <OrdersTable />
    </div>
  );
}
