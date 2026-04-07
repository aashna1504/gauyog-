'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DUMMY_DATA = [
  { name: 'A2 Ghee',      stock: 142 },
  { name: 'Cow Milk',     stock: 8 },
  { name: 'Paneer',       stock: 56 },
  { name: 'Buttermilk',   stock: 0 },
  { name: 'Curd',         stock: 23 },
  { name: 'Butter',       stock: 5 },
  { name: 'Cheese',       stock: 89 },
  { name: 'Cream',        stock: 34 },
];

const getBarColor = (stock: number) => {
  if (stock === 0) return 'hsl(0, 84%, 60%)';
  if (stock < 10) return 'hsl(38, 92%, 50%)';
  return 'hsl(142, 71%, 45%)';
};

export function StockChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Stock Levels</CardTitle>
        <CardDescription>Current inventory per product</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={DUMMY_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
            />
            <Bar dataKey="stock" radius={[4, 4, 0, 0]} name="Units">
              {DUMMY_DATA.map((entry, i) => (
                <Cell key={i} fill={getBarColor(entry.stock)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
