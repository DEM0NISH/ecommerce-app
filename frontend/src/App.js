import { useEffect, useState } from 'react';

const API = 'http://localhost:5001/api';

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts]   = useState([]);
  const [orders, setOrders]       = useState([]);
  const [tab, setTab]             = useState('customers');
  const [name, setName]           = useState('');
  const [pTitle, setPTitle]       = useState('');
  const [pPrice, setPPrice]       = useState('');
  const [selCustomer, setSelCustomer] = useState('');
  const [selProducts, setSelProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/customers`).then(r=>r.json()).then(setCustomers);
    fetch(`${API}/products`).then(r=>r.json()).then(setProducts);
    fetch(`${API}/orders`).then(r=>r.json()).then(setOrders);
  }, []);

  const addCustomer = async () => {
    const c = await fetch(`${API}/customers`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name }) }).then(r=>r.json());
    setCustomers([...customers, c]); setName('');
  };

  const delCustomer = async (id) => {
    await fetch(`${API}/customers/${id}`, { method:'DELETE' });
    setCustomers(customers.filter(c=>c._id!==id));
  };

  const addProduct = async () => {
    const p = await fetch(`${API}/products`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: pTitle, price: Number(pPrice) }) }).then(r=>r.json());
    setProducts([...products, p]); setPTitle(''); setPPrice('');
  };

  const delProduct = async (id) => {
    await fetch(`${API}/products/${id}`, { method:'DELETE' });
    setProducts(products.filter(p=>p._id!==id));
  };

  const addOrder = async () => {
    const o = await fetch(`${API}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ customerId: selCustomer, products: selProducts }) }).then(r=>r.json());
    setOrders([...orders, o]); setSelCustomer(''); setSelProducts([]);
  };

  const delOrder = async (id) => {
    await fetch(`${API}/orders/${id}`, { method:'DELETE' });
    setOrders(orders.filter(o=>o._id!==id));
  };

  const btn = (active) => ({ padding:'6px 14px', background: active ? '#0066cc' : '#eee', color: active ? '#fff' : '#333', border:'none', borderRadius:6, cursor:'pointer' });
  const card = { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px', border:'1px solid #eee', borderRadius:8, marginBottom:6 };
  const del = { padding:'4px 10px', background:'#fee', color:'#c00', border:'1px solid #fcc', borderRadius:6, cursor:'pointer' };
  const inp = { flex:1, padding:'6px 10px', border:'1px solid #ddd', borderRadius:6 };

  return (
    <div style={{ maxWidth:700, margin:'2rem auto', fontFamily:'sans-serif', padding:'0 1rem' }}>
      <h2>🛒 E-Commerce App</h2>
      <div style={{ display:'flex', gap:8, margin:'1rem 0' }}>
        {['customers','products','orders'].map(t => (
          <button key={t} onClick={()=>setTab(t)} style={btn(tab===t)}>{t}</button>
        ))}
      </div>

      {tab==='customers' && (
        <div>
          <p style={{color:'#888',fontSize:13}}>One-to-Many: one customer → many orders</p>
          <div style={{display:'flex',gap:8,margin:'8px 0'}}>
            <input placeholder="Customer name" value={name} onChange={e=>setName(e.target.value)} style={inp}/>
            <button onClick={addCustomer} style={btn(true)}>Add</button>
          </div>
          {customers.map(c=>(
            <div key={c._id} style={card}>
              <div>
                <strong>{c.name}</strong>
                <div style={{fontSize:12,color:'#888'}}>id: {c._id}</div>
                <div style={{fontSize:12,color:'#0066cc'}}>{orders.filter(o=>o.customerId===c._id||o.customerId?._id===c._id).length} orders</div>
              </div>
              <button onClick={()=>delCustomer(c._id)} style={del}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab==='products' && (
        <div>
          <p style={{color:'#888',fontSize:13}}>Many-to-Many: products appear in many orders</p>
          <div style={{display:'flex',gap:8,margin:'8px 0'}}>
            <input placeholder="Title" value={pTitle} onChange={e=>setPTitle(e.target.value)} style={inp}/>
            <input placeholder="Price" type="number" value={pPrice} onChange={e=>setPPrice(e.target.value)} style={{...inp,flex:'0 0 80px'}}/>
            <button onClick={addProduct} style={btn(true)}>Add</button>
          </div>
          {products.map(p=>(
            <div key={p._id} style={card}>
              <div><strong>{p.title}</strong> — ${p.price}<div style={{fontSize:12,color:'#888'}}>id: {p._id}</div></div>
              <button onClick={()=>delProduct(p._id)} style={del}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab==='orders' && (
        <div>
          <p style={{color:'#888',fontSize:13}}>Many-to-Many: orders ↔ products</p>
          <div style={{display:'flex',gap:8,margin:'8px 0',flexWrap:'wrap'}}>
            <select value={selCustomer} onChange={e=>setSelCustomer(e.target.value)} style={{flex:1,padding:'6px',border:'1px solid #ddd',borderRadius:6}}>
              <option value="">Select customer</option>
              {customers.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select multiple value={selProducts} onChange={e=>setSelProducts(Array.from(e.target.selectedOptions).map(o=>o.value))} style={{flex:2,padding:'6px',border:'1px solid #ddd',borderRadius:6,minHeight:60}}>
              {products.map(p=><option key={p._id} value={p._id}>{p.title} (${p.price})</option>)}
            </select>
            <button onClick={addOrder} style={btn(true)}>Add</button>
          </div>
          {orders.map(o=>(
            <div key={o._id} style={{...card, alignItems:'flex-start'}}>
              <div>
                <strong>{o._id}</strong> — {o.status}
                <div style={{fontSize:12,color:'#888'}}>Customer: {o.customerId?.name||o.customerId}</div>
                <div style={{fontSize:12,color:'#0066cc'}}>Products: {(o.products||[]).map(p=>p.title||p).join(', ')}</div>
              </div>
              <button onClick={()=>delOrder(o._id)} style={del}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}