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
  const words = name.split(' ');
  // split into max two lines of ~12 chars each
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > 12 && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current);

  return (
    <text x={x} textAnchor="middle" fontSize={10} fill="#6b7280">
      {lines.map((line, i) => (
        <tspan key={i} x={x} y={y + 14 + i * 13}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

export function StockChart({ data }: { data: StockEntry[] }) {
  // enough bottom margin for up to 2 label lines
  const bottomMargin = 52;

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
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: bottomMargin }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                tick={<CustomXAxisTick />}
                interval={0}
                tickLine={false}
              />
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
