import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Mail,
  TrendingUp,
  AlertTriangle,
  XCircle,
  RefreshCw,
  ChevronDown,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";

const TABS = ["Overview", "Orders", "Products", "Users", "Contacts"];

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PROCESSING: "bg-purple-100 text-purple-800",
  SHIPPED: "bg-indigo-100 text-indigo-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const ORDER_STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

function StatCard({ label, value, icon: Icon, sub, color = "text-[#4a703f]" }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-slate-50 ${color}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widerst text-slate-400">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value ?? "—"}</p>
        {sub && <p className="text-[11px] text-slate-500 font-semibold">{sub}</p>}
      </div>
    </div>
  );
}

// Simple bar chart using divs
function BarChart({ data }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <p className="text-xs font-black uppercase tracking-widerst text-slate-400 mb-4">Monthly Revenue (₹)</p>
      <div className="flex items-end gap-1 h-32">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-1">
            <span className="text-[8px] text-slate-400 font-bold">
              {d.value > 0 ? `₹${Math.round(d.value / 1000)}k` : ""}
            </span>
            <div
              className="w-full rounded-t-md bg-[#4a703f]/80 transition-all"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value > 0 ? 4 : 2 }}
            />
            <span className="text-[8px] text-slate-500 font-bold">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Overview tab
function Overview({ stats, loading }) {
  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading stats...</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Products" value={stats.totalProducts} icon={Package} />
        <StatCard label="Users" value={stats.totalUsers} icon={Users} />
        <StatCard label="Orders" value={stats.totalOrders} icon={ShoppingBag} />
        <StatCard
          label="Inventory"
          value={`₹${Math.round((stats.inventoryValue || 0) / 1000)}k`}
          icon={TrendingUp}
        />
        <StatCard
          label="Low Stock"
          value={stats.lowStock}
          icon={AlertTriangle}
          color="text-yellow-600"
        />
        <StatCard
          label="Out of Stock"
          value={stats.outOfStock}
          icon={XCircle}
          color="text-red-500"
        />
      </div>
      <BarChart data={stats.monthlyRevenue} />
      {stats.recentProducts && stats.recentProducts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <p className="text-xs font-black uppercase tracking-widerst text-slate-400">Recent Products</p>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.recentProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3">
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{p.name}</p>
                  <p className="text-xs text-slate-400">Stock: {p.stock}</p>
                </div>
                <p className="font-black text-[#4a703f] text-sm">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Orders tab
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.patch(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading orders...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widerst text-slate-400">All Orders ({orders.length})</p>
        <button onClick={fetchOrders} className="text-slate-400 hover:text-[#4a703f] transition-colors">
          <RefreshCw size={14} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Order ID", "Customer", "Items", "Total", "Payment", "Status", "Date", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{order.id.slice(0, 8)}…</td>
                <td className="px-4 py-3">
                  <p className="font-bold text-slate-800 text-xs">{order.user?.name || "—"}</p>
                  <p className="text-slate-400 text-[10px]">{order.user?.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-600 text-xs">{order.items?.length ?? 0}</td>
                <td className="px-4 py-3 font-black text-[#4a703f] text-xs">₹{order.total}</td>
                <td className="px-4 py-3 text-slate-600 text-xs">{order.paymentMethod}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-600"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-[10px]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-[10px] font-black border border-slate-200 rounded-lg px-2 py-1 pr-6 appearance-none bg-white cursor-pointer focus:outline-none focus:border-[#4a703f] disabled:opacity-50"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-bold text-sm">No orders found</div>
        )}
      </div>
    </div>
  );
}

// ── Edit Product Modal ───────────────────────────────────────────────────────
function EditProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: product.name ?? "",
    description: product.description ?? "",
    price: product.price ?? "",
    discountPrice: product.discountPrice ?? "",
    stock: product.stock ?? "",
    category: product.category ?? "Dairy",
    inStock: product.inStock ?? true,
    imageUrl: product.imageUrl ?? "",
  });
  const [saving, setSaving] = useState(false);

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
        category: form.category,
        inStock: form.inStock,
        imageUrl: form.imageUrl.trim() || undefined,
        ...(form.discountPrice ? { discountPrice: parseFloat(form.discountPrice) } : {}),
      };
      await api.patch(`/products/${product.id}`, payload);
      toast.success("Product updated");
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <p className="font-black text-slate-900">Edit Product</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {[
            { label: "Name *", key: "name", type: "text" },
            { label: "Image URL", key: "imageUrl", type: "text" },
            { label: "Price (₹) *", key: "price", type: "number" },
            { label: "Discount Price (₹)", key: "discountPrice", type: "number" },
            { label: "Stock", key: "stock", type: "number" },
          ].map(({ label, key, type }) => (
            <div key={key}>
              <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors"
            >
              {["Dairy", "Ghee", "Herbs", "Grains", "Wellness", "Garden", "Pantry"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400">In Stock</label>
            <button
              type="button"
              onClick={() => set("inStock", !form.inStock)}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.inStock ? "bg-[#4a703f]" : "bg-slate-200"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.inStock ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-full bg-[#4a703f] text-white text-sm font-black hover:bg-[#3d5e34] disabled:opacity-60 transition-colors flex items-center gap-2"
          >
            {saving ? "Saving..." : <><Check size={14} /> Save</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({ product, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/products/${product.id}`);
      toast.success("Product deleted");
      onDeleted();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-red-50 text-red-500"><Trash2 size={18} /></div>
          <p className="font-black text-slate-900">Delete Product</p>
        </div>
        <p className="text-sm text-slate-600 mb-6">
          Delete <span className="font-black text-slate-900">"{product.name}"</span>? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-black hover:bg-red-600 disabled:opacity-60 transition-colors"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Products Tab ─────────────────────────────────────────────────────────────
function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    api.get("/products?limit=100")
      .then((res) => setProducts(res.data.data?.products || res.data.data || []))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading products...</div>;

  return (
    <>
      {editTarget && (
        <EditProductModal
          product={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={fetchProducts}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={fetchProducts}
        />
      )}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widerst text-slate-400">All Products ({products.length})</p>
          <button onClick={fetchProducts} className="text-slate-400 hover:text-[#4a703f] transition-colors">
            <RefreshCw size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Image", "Name", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <Package size={14} className="text-slate-300" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-800 text-xs max-w-[180px] truncate">{p.name}</td>
                  <td className="px-4 py-3 font-black text-[#4a703f] text-xs">₹{p.price}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-black ${p.inStock && p.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {p.inStock && p.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditTarget(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#4a703f] hover:bg-[#4a703f]/10 transition-colors"
                        title="Edit product"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="text-center py-12 text-slate-400 font-bold text-sm">No products found</div>
          )}
        </div>
      </div>
    </>
  );
}

// Users tab
function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data.data?.users || res.data.data || []))
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading users...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-xs font-black uppercase tracking-widerst text-slate-400">All Users ({users.length})</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {["Name", "Email", "Role", "Joined"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-800 text-xs">{u.name || "—"}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-400 text-[10px]">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-bold text-sm">No users found</div>
        )}
      </div>
    </div>
  );
}

// Contacts tab
function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/contact")
      .then((res) => setContacts(res.data.data || []))
      .catch(() => toast.error("Failed to load contacts"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading contacts...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <p className="text-xs font-black uppercase tracking-widerst text-slate-400">Contact Messages ({contacts.length})</p>
      </div>
      <div className="divide-y divide-slate-50">
        {contacts.map((c) => (
          <div key={c.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-slate-800 text-sm">{c.name}</p>
                  {c.interest && (
                    <span className="px-2 py-0.5 bg-[#4a703f]/10 text-[#4a703f] text-[10px] font-black rounded-full">
                      {c.interest}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mb-2">{c.email} {c.phone ? `· ${c.phone}` : ""}</p>
                <p className="text-sm text-slate-600">{c.message}</p>
              </div>
              <p className="text-[10px] text-slate-400 font-bold whitespace-nowrap">
                {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="text-center py-12 text-slate-400 font-bold text-sm">No contact messages</div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/stats")
      .then((res) => setStats(res.data.data))
      .catch(() => toast.error("Failed to load dashboard stats"))
      .finally(() => setStatsLoading(false));
  }, []);

  const TAB_ICONS = {
    Overview: LayoutDashboard,
    Orders: ShoppingBag,
    Products: Package,
    Users: Users,
    Contacts: Mail,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-wider">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 font-semibold mt-1">Manage your store</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit flex-wrap">
          {TABS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widerst transition-all ${
                  activeTab === tab
                    ? "bg-[#4a703f] text-white shadow-md"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon size={13} />
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "Overview" && <Overview stats={stats} loading={statsLoading} />}
        {activeTab === "Orders" && <Orders />}
        {activeTab === "Products" && <Products />}
        {activeTab === "Users" && <UsersTab />}
        {activeTab === "Contacts" && <Contacts />}
      </div>
    </div>
  );
}
