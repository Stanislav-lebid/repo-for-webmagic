import React, { useState, useEffect } from "react";

const TIER_PRICING = {
  basic: 10,
  pro: 20,
  enterprise: 50,
};

const ADDON_PRICING = {
  support: 100,
  storage: 50,
};

const styles = {
  container: {
    maxWidth: 420,
    margin: "40px auto",
    padding: 32,
    borderRadius: 18,
    boxShadow: "0 6px 32px rgba(30,60,90,0.13)",
    background: "#fff",
    fontFamily: "Segoe UI, Arial, sans-serif",
    border: "1.5px solid #e3e8ee",
    transition: "box-shadow 0.3s cubic-bezier(.4,2,.6,1), max-width 0.3s, padding 0.3s",
    width: "95vw",
    minWidth: 0,
  },
  label: { display: "block", margin: "18px 0 6px 0", fontWeight: 600, fontSize: 19, color: "#2d3748", cursor: "pointer" },
  input: { width: "100%", padding: 16, fontSize: 20, borderRadius: 8, border: "1.5px solid #cbd5e1", marginBottom: 4, transition: "border 0.2s, box-shadow 0.2s" },
  radioGroup: { display: "flex", gap: 18, margin: "10px 0" },
  radio: (active: boolean, color: string) => ({
    background: active ? color : "#f1f5f9",
    color: active ? "#fff" : "#2d3748",
    border: `2.5px solid ${active ? color : '#cbd5e1'}`,
    borderRadius: 12,
    padding: "14px 24px",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
    boxShadow: active ? "0 2px 8px rgba(0,0,0,0.07)" : undefined,
    display: "flex",
    alignItems: "center",
    gap: 10,
  }),
  checkboxGroup: { display: "flex", flexDirection: "column" as const, gap: 14, margin: "10px 0" },
  toggle: { display: "flex", alignItems: "center", gap: 14, margin: "20px 0" },
  total: { marginTop: 36, fontSize: 26, fontWeight: 700, color: "#1a7f37", letterSpacing: 0.5, transition: "color 0.2s, font-size 0.2s" },
};

const App: React.FC = () => {
  const [users, setUsers] = useState(1);
  const [tier, setTier] = useState<"basic" | "pro" | "enterprise">("basic");
  const [addons, setAddons] = useState<{ support: boolean; storage: boolean }>({ support: false, storage: false });
  const [annual, setAnnual] = useState(false);

  // Load config from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const u = Number(params.get('users'));
    const t = params.get('tier');
    const s = params.get('support');
    const st = params.get('storage');
    const a = params.get('annual');
    if (u && ['basic','pro','enterprise'].includes(t || '')) {
      setUsers(Math.max(1, Math.min(1000, u)));
      setTier(t as 'basic'|'pro'|'enterprise');
      setAddons({ support: s === 'true', storage: st === 'true' });
      setAnnual(a === 'true');
    }
  }, []);

  const handleShare = () => {
    const params = new URLSearchParams({
      users: String(users),
      tier,
      support: String(addons.support),
      storage: String(addons.storage),
      annual: String(annual),
    });
    const url = window.location.origin + window.location.pathname + '?' + params.toString();
    navigator.clipboard.writeText(url);
    alert('Shareable link copied to clipboard!');
  };
import React, { useState } from "react";

const TIER_PRICING = {
  basic: 10,
  pro: 20,
  enterprise: 50,
};

const ADDON_PRICING = {
  support: 100,
  storage: 50,
};

const styles = {
  container: {
    maxWidth: 420,
    margin: "40px auto",
    padding: 32,
    borderRadius: 18,
    boxShadow: "0 6px 32px rgba(30,60,90,0.13)",
    background: "#fff",
    fontFamily: "Segoe UI, Arial, sans-serif",
    border: "1.5px solid #e3e8ee",
    transition: "box-shadow 0.3s cubic-bezier(.4,2,.6,1), max-width 0.3s, padding 0.3s",
    width: "95vw",
    minWidth: 0,
  },
  label: { display: "block", margin: "18px 0 6px 0", fontWeight: 600, fontSize: 19, color: "#2d3748", cursor: "pointer" },
  input: { width: "100%", padding: 16, fontSize: 20, borderRadius: 8, border: "1.5px solid #cbd5e1", marginBottom: 4, transition: "border 0.2s, box-shadow 0.2s" },
  radioGroup: { display: "flex", gap: 18, margin: "10px 0" },
  radio: (active: boolean, color: string) => ({
    background: active ? color : "#f1f5f9",
    color: active ? "#fff" : "#2d3748",
    border: `2.5px solid ${active ? color : '#cbd5e1'}`,
    borderRadius: 12,
    padding: "14px 24px",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
    boxShadow: active ? "0 2px 8px rgba(0,0,0,0.07)" : undefined,
    display: "flex",
    alignItems: "center",
    gap: 10,
  }),
  checkboxGroup: { display: "flex", flexDirection: "column" as const, gap: 14, margin: "10px 0" },
  toggle: { display: "flex", alignItems: "center", gap: 14, margin: "20px 0" },
  total: { marginTop: 36, fontSize: 26, fontWeight: 700, color: "#1a7f37", letterSpacing: 0.5, transition: "color 0.2s, font-size 0.2s" },
};

const App: React.FC = () => {
  const [users, setUsers] = useState(1);
  const [tier, setTier] = useState<"basic" | "pro" | "enterprise">("basic");
  const [addons, setAddons] = useState<{ support: boolean; storage: boolean }>({ support: false, storage: false });
  const [annual, setAnnual] = useState(false);

  const handleUsersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Math.min(1000, Number(e.target.value)));
    setUsers(val);
  };

  const handleTierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTier(e.target.value as "basic" | "pro" | "enterprise");
  };

  const handleAddonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddons((prev: { support: boolean; storage: boolean }) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnual(e.target.checked);
  };

  const tierPrice = users * TIER_PRICING[tier as keyof typeof TIER_PRICING];
  const supportPrice = addons.support ? ADDON_PRICING["support"] : 0;
  const storagePrice = addons.storage ? ADDON_PRICING["storage"] : 0;
  let subtotal = tierPrice + supportPrice + storagePrice;
  const discount = annual ? 0.2 * subtotal : 0;
  let total = subtotal - discount;
  total = Math.round(total * 100) / 100;


  // Save/Load functionality
  const handleSave = () => {
    const config = { users, tier, addons, annual };
    localStorage.setItem('pricingConfig', JSON.stringify(config));
  };
  const handleLoad = () => {
    const raw = localStorage.getItem('pricingConfig');
    if (raw) {
      try {
        const config = JSON.parse(raw);
        if (typeof config.users === 'number' && ['basic','pro','enterprise'].includes(config.tier) && typeof config.addons === 'object' && typeof config.annual === 'boolean') {
          setUsers(config.users);
          setTier(config.tier);
          setAddons(config.addons);
          setAnnual(config.annual);
        }
      } catch {}
    }
  };

  return (
    <div style={{...styles.container, maxWidth: window.innerWidth < 500 ? '98vw' : 420, padding: window.innerWidth < 500 ? 12 : 32}}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>SaaS Pricing Calculator</h2>
      <label htmlFor="users" style={styles.label}>Number of users</label>
      <input
        id="users"
        type="number"
        min={1}
        max={1000}
        value={users}
        onChange={handleUsersChange}
        style={styles.input}
        data-testid="users-input"
      />

      <div style={styles.label}>Tier</div>
      <div style={styles.radioGroup}>
        <label style={styles.radio(tier === "basic", "#2563eb") as React.CSSProperties}>
          <input
            type="radio"
            name="tier"
            value="basic"
            checked={tier === "basic"}
            onChange={handleTierChange}
            data-testid="tier-basic"
            style={{ marginRight: 6 }}
          />
          Basic ($10/user)
        </label>
        <label style={styles.radio(tier === "pro", "#f59e42") as React.CSSProperties}>
          <input
            type="radio"
            name="tier"
            value="pro"
            checked={tier === "pro"}
            onChange={handleTierChange}
            data-testid="tier-pro"
            style={{ marginRight: 6 }}
          />
          Pro ($20/user)
        </label>
        <label style={styles.radio(tier === "enterprise", "#e11d48") as React.CSSProperties}>
          <input
            type="radio"
            name="tier"
            value="enterprise"
            checked={tier === "enterprise"}
            onChange={handleTierChange}
            data-testid="tier-enterprise"
            style={{ marginRight: 6 }}
          />
          Enterprise ($50/user)
        </label>
      </div>

      <div style={styles.label}>Add-ons</div>
      <div style={styles.checkboxGroup}>
        <label style={{fontSize:18,display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
          <input
            type="checkbox"
            name="support"
            checked={addons.support}
            onChange={handleAddonChange}
            data-testid="addon-support"
            style={{width:22,height:22}}
          />
          Dedicated Support (+$100/mo)
        </label>
        <label style={{fontSize:18,display:'flex',alignItems:'center',gap:10,cursor:'pointer'}}>
          <input
            type="checkbox"
            name="storage"
            checked={addons.storage}
            onChange={handleAddonChange}
            data-testid="addon-storage"
            style={{width:22,height:22}}
          />
          Extra Storage (+$50/mo)
        </label>
      </div>

      <div style={styles.toggle}>
        <input
          type="checkbox"
          id="billing-annual"
          checked={annual}
          onChange={handleBillingChange}
          data-testid="billing-annual-toggle"
          style={{width:26,height:26,accentColor:'#2563eb'}}
        />
        <label htmlFor="billing-annual" style={{fontSize:18,cursor:'pointer'}}>Annual billing (20% off)</label>
      </div>

      <div style={{display:'flex',gap:12,marginTop:18,marginBottom:10,flexWrap:'wrap'}}>
        <button
          type="button"
          onClick={handleShare}
          style={{
            background: '#f59e42',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            transition: 'background 0.2s',
          }}
          data-testid="share-btn"
        >
          Share Link
        </button>
        </button>
        <button
          type="button"
          onClick={handleSave}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            transition: 'background 0.2s',
          }}
          data-testid="save-btn"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleLoad}
          style={{
            background: '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            transition: 'background 0.2s',
          }}
          data-testid="load-btn"
        >
          Load
        </button>
      </div>
      <div style={styles.total} data-testid="total-price">
        Total: ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / month
      </div>
      <div style={{marginTop:12,background:'#f8fafc',borderRadius:10,padding:'16px 18px',fontSize:16,color:'#334155',boxShadow:'0 1px 4px rgba(0,0,0,0.03)'}}>
        <div><b>Breakdown:</b></div>
        <div style={{marginTop:6}}>
          <span>Tier ({tier.charAt(0).toUpperCase()+tier.slice(1)}): </span>
          <span>${TIER_PRICING[tier as keyof typeof TIER_PRICING].toLocaleString()} x {users} = <b>${tierPrice.toLocaleString()}</b></span>
        </div>
        <div>Dedicated Support: <b>{addons.support ? `$${ADDON_PRICING.support}` : '$0'}</b></div>
        <div>Extra Storage: <b>{addons.storage ? `$${ADDON_PRICING.storage}` : '$0'}</b></div>
        <div>Subtotal: <b>${subtotal.toLocaleString()}</b></div>
        {annual && <div style={{color:'#2563eb'}}>Annual Discount (20%): -${discount.toLocaleString()}</div>}
      </div>
    </div>
  );
};

export default App;
