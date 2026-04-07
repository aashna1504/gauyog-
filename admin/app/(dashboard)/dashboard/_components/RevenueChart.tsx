'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';

const DUMMY_DATA = [
  { name: 'Jan', value: 42000 },
  { name: 'Feb', value: 58000 },
  { name: 'Mar', value: 51000 },
  { name: 'Apr', value: 74000 },
  { name: 'May', value: 89000 },
  { name: 'Jun', value: 67000 },
  { name: 'Jul', value: 95000 },
  { name: 'Aug', value: 112000 },
  { name: 'Sep', value: 98000 },
  { name: 'Oct', value: 134000 },
  { name: 'Nov', value: 121000 },
  { name: 'Dec', value: 158000 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue for 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={DUMMY_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v: number) => [formatCurrency(v), 'Revenue']}
              contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(142, 71%, 45%)"
              strokeWidth={2}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
