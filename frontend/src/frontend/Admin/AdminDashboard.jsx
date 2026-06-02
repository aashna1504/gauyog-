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
  FileText,
  Plus,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";

const TABS = ["Overview", "Orders", "Products", "Users", "Contacts", "Blog"];

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
            <div className="w-full rounded-t-md bg-[#4a703f]/80 transition-all"
              style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value > 0 ? 4 : 2 }} />
            <span className="text-[8px] text-slate-500 font-bold">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Overview({ stats, loading }) {
  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading stats...</div>;
  if (!stats) return null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard label="Products" value={stats.totalProducts} icon={Package} />
        <StatCard label="Users" value={stats.totalUsers} icon={Users} />
        <StatCard label="Orders" value={stats.totalOrders} icon={ShoppingBag} />
        <StatCard label="Inventory" value={`₹${Math.round((stats.inventoryValue || 0) / 1000)}k`} icon={TrendingUp} />
        <StatCard label="Low Stock" value={stats.lowStock} icon={AlertTriangle} color="text-yellow-600" />
        <StatCard label="Out of Stock" value={stats.outOfStock} icon={XCircle} color="text-red-500" />
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
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" width={40} height={40} loading="lazy" decoding="async" />}
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

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data.orders || []);
    } catch { toast.error("Failed to load orders"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.patch(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Status updated");
    } catch { toast.error("Failed to update status"); }
    finally { setUpdatingId(null); }
  };

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading orders...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widerst text-slate-400">All Orders ({orders.length})</p>
        <button onClick={fetchOrders} className="text-slate-400 hover:text-[#4a703f] transition-colors"><RefreshCw size={14} /></button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>{["Order ID", "Customer", "Items", "Total", "Payment", "Status", "Date", "Action"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{order.id.slice(0, 8)}…</td>
                <td className="px-4 py-3"><p className="font-bold text-slate-800 text-xs">{order.user?.name || "—"}</p><p className="text-slate-400 text-[10px]">{order.user?.email}</p></td>
                <td className="px-4 py-3 text-slate-600 text-xs">{order.items?.length ?? 0}</td>
                <td className="px-4 py-3 font-black text-[#4a703f] text-xs">₹{order.total}</td>
                <td className="px-4 py-3 text-slate-600 text-xs">{order.paymentMethod}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-black ${STATUS_COLORS[order.status] || "bg-slate-100 text-slate-600"}`}>{order.status}</span></td>
                <td className="px-4 py-3 text-slate-400 text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="relative">
                    <select value={order.status} disabled={updatingId === order.id} onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-[10px] font-black border border-slate-200 rounded-lg px-2 py-1 pr-6 appearance-none bg-white cursor-pointer focus:outline-none focus:border-[#4a703f] disabled:opacity-50">
                      {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="text-center py-12 text-slate-400 font-bold text-sm">No orders found</div>}
      </div>
    </div>
  );
}

const CATEGORIES = ["Fertilizer", "Coco", "Garden", "Dairy", "Ghee", "Herbs", "Grains", "Wellness", "Pantry"];

function TextField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors" />
    </div>
  );
}

function EditProductModal({ product, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: product.name ?? "", description: product.description ?? "", price: product.price ?? "",
    discountPrice: product.discountPrice ?? "", stock: product.stock ?? "", category: product.category ?? "Fertilizer",
    inStock: product.inStock ?? true, imageUrl: product.imageUrl ?? "", image1kg: product.image1kg ?? "",
    price1kg: product.price1kg ?? "", image3kg: product.image3kg ?? "", price3kg: product.price3kg ?? "",
    image5kg: product.image5kg ?? "", price5kg: product.price5kg ?? "",
    weightOptions: (product.weightOptions ?? []).join(", "),
  });
  const [saving, setSaving] = useState(false);
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) { toast.error("Name and price are required"); return; }
    setSaving(true);
    try {
      const weightOpts = form.weightOptions.split(",").map((w) => w.trim().toLowerCase()).filter(Boolean);
      const payload = {
        name: form.name.trim(), description: form.description.trim(), price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0, category: form.category, inStock: form.inStock,
        weightOptions: weightOpts, imageUrl: form.imageUrl.trim() || null,
        image1kg: form.image1kg.trim() || null, price1kg: form.price1kg ? parseFloat(form.price1kg) : undefined,
        image3kg: form.image3kg.trim() || null, price3kg: form.price3kg ? parseFloat(form.price3kg) : undefined,
        image5kg: form.image5kg.trim() || null, price5kg: form.price5kg ? parseFloat(form.price5kg) : undefined,
        ...(form.discountPrice ? { discountPrice: parseFloat(form.discountPrice) } : {}),
      };
      await api.patch(`/products/${product.id}`, payload);
      toast.success("Product updated"); onSaved(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update product"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <p className="font-black text-slate-900">Edit Product</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Name *" value={form.name} onChange={(v) => set("name", v)} />
            <div>
              <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <TextField label="Price (₹) *" value={form.price} onChange={(v) => set("price", v)} type="number" />
            <TextField label="Discount Price (₹)" value={form.discountPrice} onChange={(v) => set("discountPrice", v)} type="number" />
            <TextField label="Stock" value={form.stock} onChange={(v) => set("stock", v)} type="number" />
            <div>
              <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Weight Options</label>
              <input type="text" value={form.weightOptions} onChange={(e) => set("weightOptions", e.target.value)} placeholder="1kg, 3kg, 5kg"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors resize-none" />
          </div>
          <div className="border border-slate-100 rounded-2xl p-4 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widerst text-slate-400">Images (paste Cloudinary URL)</p>
            <TextField label="Main Image URL" value={form.imageUrl} onChange={(v) => set("imageUrl", v)} placeholder="https://res.cloudinary.com/..." />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-16 rounded-xl object-contain border border-slate-100" />}
            <div className="grid grid-cols-3 gap-3">
              {[["1kg", "image1kg", "price1kg"], ["3kg", "image3kg", "price3kg"], ["5kg", "image5kg", "price5kg"]].map(([label, imgKey, priceKey]) => (
                <div key={label} className="space-y-2">
                  <TextField label={`${label} Image URL`} value={form[imgKey]} onChange={(v) => set(imgKey, v)} placeholder="https://..." />
                  <TextField label={`${label} Price (₹)`} value={form[priceKey]} onChange={(v) => set(priceKey, v)} type="number" />
                  {form[imgKey] && <img src={form[imgKey]} alt={label} className="h-12 rounded-xl object-contain border border-slate-100 w-full" />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400">In Stock</label>
            <button type="button" onClick={() => set("inStock", !form.inStock)}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.inStock ? "bg-[#4a703f]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.inStock ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 rounded-full bg-[#4a703f] text-white text-sm font-black hover:bg-[#3d5e34] disabled:opacity-60 transition-colors flex items-center gap-2">
            {saving ? "Saving..." : <><Check size={14} /> Save</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddProductModal({ onClose, onSaved }) {
  const EMPTY = { name: "", description: "", price: "", discountPrice: "", stock: "0", category: "Fertilizer", inStock: true, weightOptions: "", imageUrl: "", image1kg: "", price1kg: "", image3kg: "", price3kg: "", image5kg: "", price5kg: "" };
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.description.trim()) { toast.error("Name, price and description are required"); return; }
    setSaving(true);
    try {
      const weightOpts = form.weightOptions.split(",").map((w) => w.trim().toLowerCase()).filter(Boolean);
      const payload = {
        name: form.name.trim(), description: form.description.trim(), price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0, category: form.category, inStock: form.inStock, weightOptions: weightOpts,
        imageUrl: form.imageUrl.trim() || undefined, image1kg: form.image1kg.trim() || undefined,
        price1kg: form.price1kg ? parseFloat(form.price1kg) : undefined, image3kg: form.image3kg.trim() || undefined,
        price3kg: form.price3kg ? parseFloat(form.price3kg) : undefined, image5kg: form.image5kg.trim() || undefined,
        price5kg: form.price5kg ? parseFloat(form.price5kg) : undefined,
        ...(form.discountPrice ? { discountPrice: parseFloat(form.discountPrice) } : {}),
      };
      await api.post("/products", payload);
      toast.success("Product created"); onSaved(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to create product"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <p className="font-black text-slate-900">Add New Product</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <TextField label="Name *" value={form.name} onChange={(v) => set("name", v)} />
            <div>
              <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <TextField label="Price (₹) *" value={form.price} onChange={(v) => set("price", v)} type="number" />
            <TextField label="Discount Price (₹)" value={form.discountPrice} onChange={(v) => set("discountPrice", v)} type="number" />
            <TextField label="Stock *" value={form.stock} onChange={(v) => set("stock", v)} type="number" />
            <div>
              <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Weight Options</label>
              <input type="text" value={form.weightOptions} onChange={(e) => set("weightOptions", e.target.value)} placeholder="1kg, 3kg, 5kg"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Description *</label>
            <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors resize-none" />
          </div>
          <div className="border border-slate-100 rounded-2xl p-4 space-y-3">
            <p className="text-[10px] font-black uppercase tracking-widerst text-slate-400">Images (paste Cloudinary URL)</p>
            <TextField label="Main Image URL" value={form.imageUrl} onChange={(v) => set("imageUrl", v)} placeholder="https://res.cloudinary.com/..." />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="h-16 rounded-xl object-contain border border-slate-100" />}
            <div className="grid grid-cols-3 gap-3">
              {[["1kg", "image1kg", "price1kg"], ["3kg", "image3kg", "price3kg"], ["5kg", "image5kg", "price5kg"]].map(([label, imgKey, priceKey]) => (
                <div key={label} className="space-y-2">
                  <TextField label={`${label} Image URL`} value={form[imgKey]} onChange={(v) => set(imgKey, v)} placeholder="https://..." />
                  <TextField label={`${label} Price (₹)`} value={form[priceKey]} onChange={(v) => set(priceKey, v)} type="number" />
                  {form[imgKey] && <img src={form[imgKey]} alt={label} className="h-12 rounded-xl object-contain border border-slate-100 w-full" />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400">In Stock</label>
            <button type="button" onClick={() => set("inStock", !form.inStock)}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.inStock ? "bg-[#4a703f]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.inStock ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving}
            className="px-5 py-2 rounded-full bg-[#744926] text-white text-sm font-black hover:bg-[#5e3a1e] disabled:opacity-60 transition-colors flex items-center gap-2">
            {saving ? "Creating..." : <><Check size={14} /> Create Product</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ product, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/products/${product.id}`);
      toast.success("Product deleted"); onDeleted(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to delete product"); }
    finally { setDeleting(false); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-red-50 text-red-500"><Trash2 size={18} /></div>
          <p className="font-black text-slate-900">Delete Product</p>
        </div>
        <p className="text-sm text-slate-600 mb-6">Delete <span className="font-black text-slate-900">"{product.name}"</span>? This cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleDelete} disabled={deleting} className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-black hover:bg-red-600 disabled:opacity-60 transition-colors">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

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
      {showAdd && <AddProductModal onClose={() => setShowAdd(false)} onSaved={fetchProducts} />}
      {editTarget && <EditProductModal product={editTarget} onClose={() => setEditTarget(null)} onSaved={fetchProducts} />}
      {deleteTarget && <DeleteConfirmModal product={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={fetchProducts} />}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widerst text-slate-400">All Products ({products.length})</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowAdd(true)} className="px-4 py-1.5 rounded-full bg-[#744926] text-white text-[10px] font-black uppercase tracking-widerst hover:bg-[#5e3a1e] transition-colors flex items-center gap-1.5">
              + Add Product
            </button>
            <button onClick={fetchProducts} className="text-slate-400 hover:text-[#4a703f] transition-colors"><RefreshCw size={14} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{["Image", "Name", "Price", "Stock", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover" width={40} height={40} loading="lazy" decoding="async" />
                      : <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"><Package size={14} className="text-slate-300" /></div>}
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
                      <button onClick={() => setEditTarget(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#4a703f] hover:bg-[#4a703f]/10 transition-colors" title="Edit product"><Pencil size={13} /></button>
                      <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete product"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="text-center py-12 text-slate-400 font-bold text-sm">No products found</div>}
        </div>
      </div>
    </>
  );
}

function UsersTab() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data.data?.users || res.data.data || [])).catch(() => toast.error("Failed to load users")).finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading users...</div>;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100"><p className="text-xs font-black uppercase tracking-widerst text-slate-400">All Users ({users.length})</p></div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50"><tr>{["Name", "Email", "Role", "Joined"].map((h) => (<th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">{h}</th>))}</tr></thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3 font-bold text-slate-800 text-xs">{u.name || "—"}</td>
                <td className="px-4 py-3 text-slate-500 text-xs">{u.email}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-black ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>{u.role}</span></td>
                <td className="px-4 py-3 text-slate-400 text-[10px]">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="text-center py-12 text-slate-400 font-bold text-sm">No users found</div>}
      </div>
    </div>
  );
}

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get("/contact").then((res) => setContacts(res.data.data || [])).catch(() => toast.error("Failed to load contacts")).finally(() => setLoading(false));
  }, []);
  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading contacts...</div>;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100"><p className="text-xs font-black uppercase tracking-widerst text-slate-400">Contact Messages ({contacts.length})</p></div>
      <div className="divide-y divide-slate-50">
        {contacts.map((c) => (
          <div key={c.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-black text-slate-800 text-sm">{c.name}</p>
                  {c.interest && <span className="px-2 py-0.5 bg-[#4a703f]/10 text-[#4a703f] text-[10px] font-black rounded-full">{c.interest}</span>}
                </div>
                <p className="text-xs text-slate-400 mb-2">{c.email} {c.phone ? `· ${c.phone}` : ""}</p>
                <p className="text-sm text-slate-600">{c.message}</p>
              </div>
              <p className="text-[10px] text-slate-400 font-bold whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <div className="text-center py-12 text-slate-400 font-bold text-sm">No contact messages</div>}
      </div>
    </div>
  );
}

// ── Blog constants ─────────────────────────────────────────────────────────────
const BLOG_CATEGORIES = ["Organic Farming", "Natural Fertilizer", "Ayurvedic Benefits", "Cow-Based Products", "Sustainability", "Farming Tips"];
const BLOCK_TYPES = [
  { value: "intro", label: "Intro Paragraph" }, { value: "text", label: "Text Paragraph" },
  { value: "heading", label: "Section Heading" }, { value: "list", label: "Bullet List" },
  { value: "conclusion", label: "Conclusion Paragraph" },
];
const EMPTY_BLOCK = () => ({ type: "text", text: "", items: [""] });
const EMPTY_FAQ = () => ({ question: "", answer: "" });
const BLOG_EMPTY = {
  title: "", slug: "", excerpt: "", category: "Organic Farming", author: "Gauyog Kendr",
  date: new Date().toISOString().split("T")[0], readTime: "5 min read", image: "",
  metaDescription: "", published: true, content: [EMPTY_BLOCK()], tags: "", faq: [],
};

function BlockEditor({ blocks, onChange }) {
  const update = (i, patch) => onChange(blocks.map((b, idx) => (idx === i ? { ...b, ...patch } : b)));
  const remove = (i) => onChange(blocks.filter((_, idx) => idx !== i));
  const moveUp = (i) => { if (i === 0) return; const next = [...blocks]; [next[i - 1], next[i]] = [next[i], next[i - 1]]; onChange(next); };
  const moveDown = (i) => { if (i === blocks.length - 1) return; const next = [...blocks]; [next[i], next[i + 1]] = [next[i + 1], next[i]]; onChange(next); };
  const addItem = (i) => update(i, { items: [...(blocks[i].items || []), ""] });
  const updateItem = (bi, ii, val) => { const items = [...(blocks[bi].items || [])]; items[ii] = val; update(bi, { items }); };
  const removeItem = (bi, ii) => update(bi, { items: blocks[bi].items.filter((_, j) => j !== ii) });

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border-b border-slate-100">
            <select value={block.type} onChange={(e) => update(i, { type: e.target.value, text: block.text || "", items: block.items || [""] })}
              className="text-[10px] font-black uppercase tracking-widest border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-[#4a703f] text-slate-700">
              {BLOCK_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <div className="flex-1" />
            <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors"><ChevronUp size={13} /></button>
            <button onClick={() => moveDown(i)} disabled={i === blocks.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 transition-colors"><ChevronDown size={13} /></button>
            <button onClick={() => remove(i)} className="p-1 text-slate-400 hover:text-red-500 transition-colors"><X size={13} /></button>
          </div>
          <div className="px-3 py-3">
            {block.type === "list" ? (
              <div className="space-y-2">
                {(block.items || [""]).map((item, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="text-[#4a703f] font-black text-xs mt-0.5">•</span>
                    <input value={item} onChange={(e) => updateItem(i, j, e.target.value)} placeholder={`List item ${j + 1}`}
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors" />
                    <button onClick={() => removeItem(i, j)} className="p-1 text-slate-300 hover:text-red-400 transition-colors"><X size={12} /></button>
                  </div>
                ))}
                <button onClick={() => addItem(i)} className="flex items-center gap-1 text-[10px] font-black text-[#4a703f] hover:text-[#3d5e34] transition-colors mt-1"><Plus size={11} /> Add Item</button>
              </div>
            ) : (
              <textarea rows={block.type === "heading" ? 1 : 3} value={block.text || ""} onChange={(e) => update(i, { text: e.target.value })}
                placeholder={block.type === "heading" ? "Section heading..." : "Paragraph text..."}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors resize-none" />
            )}
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...blocks, EMPTY_BLOCK()])}
        className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 hover:border-[#4a703f] hover:text-[#4a703f] text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2">
        <Plus size={13} /> Add Block
      </button>
    </div>
  );
}

function FaqEditor({ items, onChange }) {
  const update = (i, patch) => onChange(items.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-3">
      {items.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">FAQ {i + 1}</span>
            <button onClick={() => remove(i)} className="p-1 text-slate-300 hover:text-red-400 transition-colors"><X size={13} /></button>
          </div>
          <input value={faq.question} onChange={(e) => update(i, { question: e.target.value })} placeholder="Question..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors" />
          <textarea rows={2} value={faq.answer} onChange={(e) => update(i, { answer: e.target.value })} placeholder="Answer..."
            className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors resize-none" />
        </div>
      ))}
      <button onClick={() => onChange([...items, EMPTY_FAQ()])}
        className="w-full py-2 rounded-xl border border-dashed border-slate-300 text-slate-400 hover:border-[#4a703f] hover:text-[#4a703f] text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2">
        <Plus size={13} /> Add FAQ
      </button>
    </div>
  );
}

function BlogForm({ form, set, isSaving, onSubmit, onClose, submitLabel }) {
  return (
    <>
      <div className="px-6 py-5 space-y-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 130px)" }}>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Basic Info</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><TextField label="Title *" value={form.title} onChange={(v) => set("title", v)} placeholder="Blog post title..." /></div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Category</label>
              <select value={form.category} onChange={(e) => set("category", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors">
                {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <TextField label="Author" value={form.author} onChange={(v) => set("author", v)} placeholder="Gauyog Kendr" />
            <TextField label="Date" value={form.date} onChange={(v) => set("date", v)} type="date" />
            <TextField label="Read Time" value={form.readTime} onChange={(v) => set("readTime", v)} placeholder="5 min read" />
            <div className="col-span-2"><TextField label="Custom Slug (auto-generated if blank)" value={form.slug} onChange={(v) => set("slug", v)} placeholder="my-blog-post-url" /></div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400 mb-1 block">Excerpt * <span className="normal-case font-semibold">(short preview on listing)</span></label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="A short summary..."
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#4a703f] transition-colors resize-none" />
          </div>
          <TextField label="Meta Description (SEO)" value={form.metaDescription} onChange={(v) => set("metaDescription", v)} placeholder="160-char SEO description..." />
          <TextField label="Tags (comma-separated)" value={form.tags} onChange={(v) => set("tags", v)} placeholder="organic, farming, panchgavya" />
        </div>
        <div className="border border-slate-100 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widerst text-slate-400">Cover Image</p>
          <TextField label="Image URL (Cloudinary)" value={form.image} onChange={(v) => set("image", v)} placeholder="https://res.cloudinary.com/..." />
          {form.image && <img src={form.image} alt="cover preview" className="h-32 w-full rounded-xl object-cover border border-slate-100" />}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">Article Content</p>
          <BlockEditor blocks={form.content} onChange={(v) => set("content", v)} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3">FAQ <span className="normal-case font-semibold">(optional)</span></p>
          <FaqEditor items={form.faq} onChange={(v) => set("faq", v)} />
        </div>
        <div className="flex items-center gap-3 pb-2">
          <label className="text-[10px] font-black uppercase tracking-widerst text-slate-400">Published</label>
          <button type="button" onClick={() => set("published", !form.published)}
            className={`relative w-10 h-5 rounded-full transition-colors ${form.published ? "bg-[#4a703f]" : "bg-slate-200"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className="text-xs font-bold text-slate-500">{form.published ? "Live on site" : "Draft (hidden)"}</span>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 flex-shrink-0">
        <button onClick={onClose} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
        <button onClick={onSubmit} disabled={isSaving}
          className="px-5 py-2 rounded-full bg-[#744926] text-white text-sm font-black hover:bg-[#5e3a1e] disabled:opacity-60 transition-colors flex items-center gap-2">
          {isSaving ? "Saving..." : <><Check size={14} /> {submitLabel}</>}
        </button>
      </div>
    </>
  );
}

function AddBlogModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ ...BLOG_EMPTY, content: [EMPTY_BLOCK()], faq: [] });
  const [saving, setSaving] = useState(false);
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim()) { toast.error("Title and excerpt are required"); return; }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(), slug: form.slug.trim() || undefined, excerpt: form.excerpt.trim(),
        metaDescription: form.metaDescription.trim() || undefined, category: form.category,
        author: form.author.trim() || "Gauyog Kendr", date: form.date,
        readTime: form.readTime.trim() || "5 min read", image: form.image.trim() || undefined,
        content: form.content, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        faq: form.faq.filter((f) => f.question.trim() && f.answer.trim()), published: form.published,
      };
      await api.post("/blog", payload);
      toast.success("Blog post created"); onSaved(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to create blog post"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ maxHeight: "90vh" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <p className="font-black text-slate-900">New Blog Post</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
        </div>
        <BlogForm form={form} set={set} isSaving={saving} onSubmit={handleSave} onClose={onClose} submitLabel="Publish Post" />
      </div>
    </div>
  );
}

function EditBlogModal({ post, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: post.title ?? "", slug: post.slug ?? "", excerpt: post.excerpt ?? "",
    metaDescription: post.metaDescription ?? "", category: post.category ?? "Organic Farming",
    author: post.author ?? "Gauyog Kendr", date: post.date ?? new Date().toISOString().split("T")[0],
    readTime: post.readTime ?? "5 min read", image: post.image ?? "",
    content: Array.isArray(post.content) && post.content.length > 0 ? post.content : [EMPTY_BLOCK()],
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    faq: Array.isArray(post.faq) ? post.faq : [], published: post.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim()) { toast.error("Title and excerpt are required"); return; }
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(), slug: form.slug.trim() || undefined, excerpt: form.excerpt.trim(),
        metaDescription: form.metaDescription.trim() || undefined, category: form.category,
        author: form.author.trim() || "Gauyog Kendr", date: form.date,
        readTime: form.readTime.trim() || "5 min read", image: form.image.trim() || null,
        content: form.content, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        faq: form.faq.filter((f) => f.question.trim() && f.answer.trim()), published: form.published,
      };
      await api.patch(`/blog/${post.id}`, payload);
      toast.success("Blog post updated"); onSaved(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to update blog post"); }
    finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ maxHeight: "90vh" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <p className="font-black text-slate-900">Edit Blog Post</p>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
        </div>
        <BlogForm form={form} set={set} isSaving={saving} onSubmit={handleSave} onClose={onClose} submitLabel="Save Changes" />
      </div>
    </div>
  );
}

function DeleteBlogModal({ post, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/blog/${post.id}`);
      toast.success("Blog post deleted"); onDeleted(); onClose();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to delete blog post"); }
    finally { setDeleting(false); }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-red-50 text-red-500"><Trash2 size={18} /></div>
          <p className="font-black text-slate-900">Delete Blog Post</p>
        </div>
        <p className="text-sm text-slate-600 mb-6">Delete <span className="font-black text-slate-900">"{post.title}"</span>? This removes it from the site immediately and cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 rounded-full border border-slate-200 text-sm font-black text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleDelete} disabled={deleting} className="px-5 py-2 rounded-full bg-red-500 text-white text-sm font-black hover:bg-red-600 disabled:opacity-60 transition-colors">
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchPosts = () => {
    setLoading(true);
    api.get("/blog/admin/all")
      .then((res) => setPosts(res.data.data?.blogs || []))
      .catch(() => toast.error("Failed to load blog posts"))
      .finally(() => setLoading(false));
  };
  useEffect(() => { fetchPosts(); }, []);

  if (loading) return <div className="text-center py-20 text-slate-400 font-bold">Loading blog posts...</div>;

  return (
    <>
      {showAdd && <AddBlogModal onClose={() => setShowAdd(false)} onSaved={fetchPosts} />}
      {editTarget && <EditBlogModal post={editTarget} onClose={() => setEditTarget(null)} onSaved={fetchPosts} />}
      {deleteTarget && <DeleteBlogModal post={deleteTarget} onClose={() => setDeleteTarget(null)} onDeleted={fetchPosts} />}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-widerst text-slate-400">Blog Posts ({posts.length})</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowAdd(true)} className="px-4 py-1.5 rounded-full bg-[#744926] text-white text-[10px] font-black uppercase tracking-widerst hover:bg-[#5e3a1e] transition-colors flex items-center gap-1.5">
              <Plus size={11} /> New Post
            </button>
            <button onClick={fetchPosts} className="text-slate-400 hover:text-[#4a703f] transition-colors"><RefreshCw size={14} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>{["Cover", "Title", "Category", "Date", "Read Time", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widerst text-slate-400">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    {p.image ? <img src={p.image} alt={p.title} className="w-12 h-10 rounded-lg object-cover" width={48} height={40} loading="lazy" decoding="async" />
                      : <div className="w-12 h-10 rounded-lg bg-[#f0f7ee] flex items-center justify-center"><FileText size={14} className="text-[#4a703f]/40" /></div>}
                  </td>
                  <td className="px-4 py-3 max-w-[220px]">
                    <p className="font-bold text-slate-800 text-xs truncate">{p.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">/blog/{p.slug}</p>
                  </td>
                  <td className="px-4 py-3"><span className="px-2 py-1 bg-[#4a703f]/10 text-[#4a703f] text-[10px] font-black rounded-full">{p.category}</span></td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.date}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.readTime}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 w-fit px-2 py-1 rounded-full text-[10px] font-black ${p.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {p.published ? <><Eye size={10} /> Live</> : <><EyeOff size={10} /> Draft</>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditTarget(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#4a703f] hover:bg-[#4a703f]/10 transition-colors" title="Edit post"><Pencil size={13} /></button>
                      <button onClick={() => setDeleteTarget(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete post"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {posts.length === 0 && (
            <div className="text-center py-16">
              <FileText size={32} className="text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 font-bold text-sm">No blog posts yet</p>
              <p className="text-slate-400 text-xs mt-1">Click "New Post" to create your first article.</p>
            </div>
          )}
        </div>
      </div>
    </>
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
    Overview: LayoutDashboard, Orders: ShoppingBag, Products: Package,
    Users: Users, Contacts: Mail, Blog: FileText,
  };

  const TAB_LABELS = {
    Overview: "Overview", Orders: "Orders", Products: "Products",
    Users: "Users", Contacts: "Contacts", Blog: "Blog",
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-52 flex-shrink-0 bg-white border-r border-slate-100 shadow-sm sticky top-0 h-screen overflow-y-auto">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#4a703f] flex items-center justify-center flex-shrink-0">
              <LayoutDashboard size={15} className="text-white" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900 tracking-wider leading-tight">Admin Panel</p>
              <p className="text-[9px] text-slate-400 font-bold tracking-wider">Gauyog Kendr</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            const isActive = activeTab === tab;
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all text-left ${isActive ? "bg-[#4a703f] text-white shadow-md" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}>
                <Icon size={14} className="flex-shrink-0" />
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">v1.0 · Admin</p>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top tab bar */}
        <div className="md:hidden flex gap-1.5 px-4 py-3 bg-white border-b border-slate-100 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {TABS.map((tab) => {
            const Icon = TAB_ICONS[tab];
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0 ${activeTab === tab ? "bg-[#4a703f] text-white" : "text-slate-500 bg-slate-50 hover:text-slate-800"}`}>
                <Icon size={12} />
                {TAB_LABELS[tab]}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-wider">{TAB_LABELS[activeTab]}</h1>
              <p className="text-sm text-slate-400 font-semibold mt-0.5">Gauyog Kendr · Admin Dashboard</p>
            </div>
            {activeTab === "Overview"  && <Overview stats={stats} loading={statsLoading} />}
            {activeTab === "Orders"    && <Orders />}
            {activeTab === "Products"  && <Products />}
            {activeTab === "Users"     && <UsersTab />}
            {activeTab === "Contacts"  && <Contacts />}
            {activeTab === "Blog"      && <BlogTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
