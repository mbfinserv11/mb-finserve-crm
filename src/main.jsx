import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  FileText,
  Plug,
  Settings,
  Plus,
  Search,
  Menu,
  ChevronRight,
  MessageCircle,
  Facebook,
  CheckCircle2,
  Clock3,
  AlertCircle,
  X
} from "lucide-react";
import "./styles.css";

const demoLeads = [
  {
    id: 1,
    name: "Rakesh Kumar",
    phone: "98XXXXXX21",
    whatsapp: "",
    product: "Personal Loan",
    source: "Facebook",
    status: "New",
    priority: "Hot",
    followup: "Today",
    income: "₹32,000",
    notes: ""
  },
  {
    id: 2,
    name: "Sunita Devi",
    phone: "97XXXXXX42",
    whatsapp: "",
    product: "Credit Card",
    source: "WhatsApp",
    status: "Follow-up",
    priority: "Warm",
    followup: "Tomorrow",
    income: "₹25,000",
    notes: ""
  },
  {
    id: 3,
    name: "Mohan Singh",
    phone: "96XXXXXX18",
    whatsapp: "",
    product: "Business Loan",
    source: "Website",
    status: "Documents",
    priority: "Hot",
    followup: "Today",
    income: "₹48,000",
    notes: ""
  },
  {
    id: 4,
    name: "Pooja Sharma",
    phone: "95XXXXXX73",
    whatsapp: "",
    product: "Insurance",
    source: "Facebook",
    status: "Converted",
    priority: "Warm",
    followup: "—",
    income: "₹41,000",
    notes: ""
  }
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [mobile, setMobile] = useState(false);
  const [q, setQ] = useState("");
  const [leads, setLeads] = useState(demoLeads);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const nav = [
    ["Dashboard", LayoutDashboard],
    ["Leads", Users],
    ["Follow-ups", CalendarClock],
    ["Applications", FileText],
    ["Integrations", Plug],
    ["Settings", Settings]
  ];

  const filtered = useMemo(
    () =>
      leads.filter((x) =>
        Object.values(x)
          .join(" ")
          .toLowerCase()
          .includes(q.toLowerCase())
      ),
    [leads, q]
  );

  function saveLead(form) {
    const newLead = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      whatsapp: form.whatsapp,
      product: form.product,
      source: form.source,
      status: form.status,
      priority: form.priority,
      followup: form.followup,
      income: form.income,
      notes: form.notes
    };

    setLeads((prev) => [newLead, ...prev]);
    setShowLeadForm(false);
  }

  return (
    <div className="app">
      <aside className={mobile ? "side open" : "side"}>
        <div className="brand">
          <div className="logo">MB</div>

          <div>
            <b>MB FinServe</b>
            <small>CRM Workspace</small>
          </div>
        </div>

        {nav.map(([name, Icon]) => (
          <button
            key={name}
            className={page === name ? "nav active" : "nav"}
            onClick={() => {
              setPage(name);
              setMobile(false);
            }}
          >
            <Icon size={19} />
            <span>{name}</span>
          </button>
        ))}

        <div className="sideBottom">
          <div className="secure">
            ● Secure workspace
            <br />
            <span>Supabase-ready</span>
          </div>
        </div>
      </aside>

      <main>
        <header>
          <button
            className="menu"
            onClick={() => setMobile(!mobile)}
          >
            <Menu />
          </button>

          <div>
            <h1>{page}</h1>
            <p>MB FinServe • Finance Lead Management</p>
          </div>

          <div className="headerActions">
            <button className="icon">
              <MessageCircle size={19} />
            </button>

            <div className="avatar">MF</div>
          </div>
        </header>

        {page === "Dashboard" && (
          <Dashboard
            leads={leads}
            setPage={setPage}
            openAddLead={() => {
              setPage("Leads");
              setShowLeadForm(true);
            }}
          />
        )}

        {page === "Leads" && (
          <Leads
            leads={filtered}
            q={q}
            setQ={setQ}
            openAddLead={() => setShowLeadForm(true)}
          />
        )}

        {page === "Follow-ups" && <Followups leads={leads} />}

        {page === "Applications" && <Applications />}

        {page === "Integrations" && <Integrations />}

        {page === "Settings" && <SettingsPage />}
      </main>

      {showLeadForm && (
        <AddLeadModal
          onClose={() => setShowLeadForm(false)}
          onSave={saveLead}
        />
      )}
    </div>
  );
}


/* =========================
   DASHBOARD
========================= */

function Dashboard({ leads, setPage, openAddLead }) {
  const cards = [
    [
      "Total Leads",
      leads.length,
      "+12% this month",
      Users
    ],
    [
      "Hot Leads",
      leads.filter((x) => x.priority === "Hot").length,
      "Need attention",
      AlertCircle
    ],
    [
      "Today's Follow-ups",
      leads.filter((x) => x.followup === "Today").length,
      "Due today",
      Clock3
    ],
    [
      "Converted",
      leads.filter((x) => x.status === "Converted").length,
      "Closed leads",
      CheckCircle2
    ]
  ];

  return (
    <section className="content">
      <div className="welcome">
        <div>
          <span className="eyebrow">MB FINSERVE</span>

          <h2>Good morning. Control your pipeline.</h2>

          <p>
            Track leads from Facebook, WhatsApp and your website
            in one place.
          </p>
        </div>

        <button
          className="primary"
          onClick={openAddLead}
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      <div className="cards">
        {cards.map(([title, value, subtitle, Icon]) => (
          <div className="card" key={title}>
            <div className="cardTop">
              <span>{title}</span>
              <Icon size={18} />
            </div>

            <strong>{value}</strong>

            <small>{subtitle}</small>
          </div>
        ))}
      </div>

      <div className="grid2">
        <div className="panel">
          <div className="panelHead">
            <div>
              <h3>Recent Leads</h3>
              <p>Latest customer enquiries</p>
            </div>

            <button
              className="link"
              onClick={() => setPage("Leads")}
            >
              View all
              <ChevronRight size={15} />
            </button>
          </div>

          <LeadTable leads={leads.slice(0, 4)} />
        </div>

        <div className="panel">
          <div className="panelHead">
            <div>
              <h3>Lead Sources</h3>
              <p>Where enquiries are coming from</p>
            </div>
          </div>

          <div className="source">
            <div>
              <span>Facebook</span>

              <b>
                {leads.filter(
                  (x) => x.source === "Facebook"
                ).length}
              </b>
            </div>

            <div className="bar">
              <i style={{ width: "72%" }} />
            </div>

            <div>
              <span>WhatsApp</span>

              <b>
                {leads.filter(
                  (x) => x.source === "WhatsApp"
                ).length}
              </b>
            </div>

            <div className="bar">
              <i style={{ width: "54%" }} />
            </div>

            <div>
              <span>Website</span>

              <b>
                {leads.filter(
                  (x) => x.source === "Website"
                ).length}
              </b>
            </div>

            <div className="bar">
              <i style={{ width: "38%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* =========================
   LEADS
========================= */

function Leads({
  leads,
  q,
  setQ,
  openAddLead
}) {
  return (
    <section className="content">
      <div className="toolbar">
        <div className="search">
          <Search size={18} />

          <input
            placeholder="Search name, phone, product..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <button
          className="primary"
          onClick={openAddLead}
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      <div className="panel">
        <div className="tableWrap">
          <LeadTable leads={leads} />
        </div>
      </div>
    </section>
  );
}


/* =========================
   ADD LEAD FORM
========================= */

function AddLeadModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    product: "Personal Loan",
    source: "Manual",
    status: "New",
    priority: "Warm",
    followup: "Today",
    income: "",
    notes: ""
  });

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    onSave(form);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.60)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        zIndex: 9999,
        overflowY: "auto"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#ffffff",
          borderRadius: "18px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.20)",
          overflow: "hidden"
        }}
      >
        {/* FORM HEADER */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #e5e7eb"
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: "#111827"
              }}
            >
              Add New Lead
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#6b7280",
                fontSize: "14px"
              }}
            >
              Enter customer details to create a new lead.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "#f3f4f6",
              borderRadius: "10px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              padding: "24px",
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: "18px"
            }}
          >

            {/* NAME */}

            <div>
              <label style={labelStyle}>
                Customer Name *
              </label>

              <input
                type="text"
                placeholder="Enter customer name"
                value={form.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* PHONE */}

            <div>
              <label style={labelStyle}>
                Phone Number *
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={(e) =>
                  updateField("phone", e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* WHATSAPP */}

            <div>
              <label style={labelStyle}>
                WhatsApp Number
              </label>

              <input
                type="tel"
                placeholder="WhatsApp number"
                value={form.whatsapp}
                onChange={(e) =>
                  updateField("whatsapp", e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* INCOME */}

            <div>
              <label style={labelStyle}>
                Monthly Income
              </label>

              <input
                type="text"
                placeholder="₹ Monthly income"
                value={form.income}
                onChange={(e) =>
                  updateField("income", e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* PRODUCT */}

            <div>
              <label style={labelStyle}>
                Product
              </label>

              <select
                value={form.product}
                onChange={(e) =>
                  updateField("product", e.target.value)
                }
                style={inputStyle}
              >
                <option>Personal Loan</option>
                <option>Business Loan</option>
                <option>Home Loan</option>
                <option>Car Loan</option>
                <option>Credit Card</option>
                <option>Insurance</option>
                <option>Bank Account</option>
                <option>Demat Account</option>
              </select>
            </div>

            {/* SOURCE */}

            <div>
              <label style={labelStyle}>
                Lead Source
              </label>

              <select
                value={form.source}
                onChange={(e) =>
                  updateField("source", e.target.value)
                }
                style={inputStyle}
              >
                <option>Manual</option>
                <option>WhatsApp</option>
                <option>Facebook</option>
                <option>Website</option>
                <option>Instagram</option>
                <option>Referral</option>
                <option>Other</option>
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label style={labelStyle}>
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField("status", e.target.value)
                }
                style={inputStyle}
              >
                <option>New</option>
                <option>Follow-up</option>
                <option>Documents</option>
                <option>Processing</option>
                <option>Converted</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* PRIORITY */}

            <div>
              <label style={labelStyle}>
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  updateField("priority", e.target.value)
                }
                style={inputStyle}
              >
                <option>Hot</option>
                <option>Warm</option>
                <option>Cold</option>
              </select>
            </div>

            {/* FOLLOW UP */}

            <div>
              <label style={labelStyle}>
                Follow-up
              </label>

              <select
                value={form.followup}
                onChange={(e) =>
                  updateField("followup", e.target.value)
                }
                style={inputStyle}
              >
                <option>Today</option>
                <option>Tomorrow</option>
                <option>This Week</option>
                <option>Next Week</option>
                <option>—</option>
              </select>
            </div>

            {/* NOTES */}

            <div
              style={{
                gridColumn: "1 / -1"
              }}
            >
              <label style={labelStyle}>
                Notes
              </label>

              <textarea
                placeholder="Customer requirement, CIBIL details, documents, follow-up notes..."
                value={form.notes}
                onChange={(e) =>
                  updateField("notes", e.target.value)
                }
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "100px"
                }}
              />
            </div>
          </div>

          {/* FOOTER */}

          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px"
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "11px 20px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#374151",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary"
              style={{
                padding: "11px 22px"
              }}
            >
              <Plus size={18} />
              Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


/* =========================
   FORM STYLES
========================= */

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "9px",
  background: "#ffffff",
  color: "#111827",
  fontSize: "14px",
  outline: "none"
};


/* =========================
   LEAD TABLE
========================= */

function LeadTable({ leads }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Customer</th>
          <th>Product</th>
          <th>Source</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Follow-up</th>
        </tr>
      </thead>

      <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}>
            <td>
              <b>{lead.name}</b>
              <small>{lead.phone}</small>
            </td>

            <td>{lead.product}</td>

            <td>
              <span className="sourceTag">
                {lead.source}
              </span>
            </td>

            <td>
              <span className="status">
                {lead.status}
              </span>
            </td>

            <td>
              <span
                className={
                  "pill " +
                  lead.priority.toLowerCase()
                }
              >
                {lead.priority}
              </span>
            </td>

            <td>{lead.followup}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


/* =========================
   FOLLOW UPS
======================
