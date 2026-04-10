'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StockEntry {
  name: string;
  stock: number;
}

const getBarColor = (stock: number) => {
  if (stock === 0) return 'hsl(0, 84%, 60%)';
  if (stock < 10)  return 'hsl(38, 92%, 50%)';
  return 'hsl(142, 71%, 45%)';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const val: number = payload[0].value;
  return (
    <div className="rounded-xl border bg-background px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold mb-1">{label}</p>
      <p style={{ color: getBarColor(val) }}>
        {val === 0 ? 'Out of stock' : val < 10 ? `${val} units – Low` : `${val} units`}
      </p>
    </div>
  );
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const name: string = payload.value ?? '';
  const short = name.length > 10 ? name.slice(0, 10) + '…' : name;
  return (
    <text x={x} y={y + 10} textAnchor="middle" fontSize={10} fill="currentColor" className="fill-muted-foreground">
      {short}
    </text>
  );
};

export function StockChart({ data }: { data: StockEntry[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Stock Levels</CardTitle>
        <CardDescription>
          Current inventory per product —{' '}
          <span className="text-destructive font-medium">red = out</span>,{' '}
          <span className="text-amber-500 font-medium">amber = low (&lt;10)</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-16">No products found.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" tick={<CustomXAxisTick />} interval={0} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="stock" radius={[4, 4, 0, 0]} name="Units">
                {data.map((entry, i) => (
                  <Cell key={i} fill={getBarColor(entry.stock)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
