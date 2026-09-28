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
  AlertCircle
} from "lucide-react";
import "./styles.css";

const demoLeads = [
  {
    id: 1,
    name: "Rakesh Kumar",
    phone: "98XXXXXX21",
    product: "Personal Loan",
    source: "Facebook",
    status: "New",
    priority: "Hot",
    followup: "Today",
    income: "₹32,000"
  },
  {
    id: 2,
    name: "Sunita Devi",
    phone: "97XXXXXX42",
    product: "Credit Card",
    source: "WhatsApp",
    status: "Follow-up",
    priority: "Warm",
    followup: "Tomorrow",
    income: "₹25,000"
  },
  {
    id: 3,
    name: "Mohan Singh",
    phone: "96XXXXXX18",
    product: "Business Loan",
    source: "Website",
    status: "Documents",
    priority: "Hot",
    followup: "Today",
    income: "₹48,000"
  },
  {
    id: 4,
    name: "Pooja Sharma",
    phone: "95XXXXXX73",
    product: "Insurance",
    source: "Facebook",
    status: "Converted",
    priority: "Warm",
    followup: "—",
    income: "₹41,000"
  }
];

function App() {
  const [page, setPage] = useState("Dashboard");
  const [mobile, setMobile] = useState(false);
  const [q, setQ] = useState("");
  const [leads, setLeads] = useState(demoLeads);

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
          />
        )}

        {page === "Leads" && (
          <Leads
            leads={filtered}
            q={q}
            setQ={setQ}
            addLead={() =>
              setLeads([
                {
                  id: Date.now(),
                  name: "New Lead",
                  phone: "",
                  product: "Personal Loan",
                  source: "Manual",
                  status: "New",
                  priority: "Warm",
                  followup: "Today",
                  income: ""
                },
                ...leads
              ])
            }
          />
        )}

        {page === "Follow-ups" && <Followups leads={leads} />}

        {page === "Applications" && <Applications />}

        {page === "Integrations" && <Integrations />}

        {page === "Settings" && <SettingsPage />}
      </main>
    </div>
  );
}

function Dashboard({ leads, setPage }) {
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
          onClick={() => setPage("Leads")}
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

function Leads({ leads, q, setQ, addLead }) {
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

        <button className="primary" onClick={addLead}>
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
                  "pill " + lead.priority.toLowerCase()
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

function Followups({ leads }) {
  return (
    <section className="content">
      <div className="panel">
        <div className="panelHead">
          <div>
            <h3>Follow-up Queue</h3>
            <p>Today and upcoming customer callbacks</p>
          </div>
        </div>

        <div className="followList">
          {leads
            .filter((x) => x.followup !== "—")
            .map((lead) => (
              <div className="follow" key={lead.id}>
                <div className="date">
                  CALL
                  <br />
                  <b>{lead.followup}</b>
                </div>

                <div>
                  <b>{lead.name}</b>
                  <p>
                    {lead.product} • {lead.phone}
                  </p>
                </div>

                <button className="secondary">
                  Open
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section className="content">
      <div className="panel empty">
        <FileText size={40} />

        <h3>Applications</h3>

        <p>
          Application pipeline will connect to your
          leads and document checklist.
        </p>

        <button className="primary">
          Create Application
        </button>
      </div>
    </section>
  );
}

function Integrations() {
  return (
    <section className="content">
      <div className="integrationGrid">
        <Integration
          icon={<MessageCircle />}
          title="WhatsApp"
          desc="Incoming messages → automatic CRM lead creation. API/webhook ready."
        />

        <Integration
          icon={<Facebook />}
          title="Facebook Lead Ads"
          desc="Lead forms → automatic lead capture, source tracking and assignment."
        />

        <Integration
          icon={<FileText />}
          title="Google Drive"
          desc="Customer documents can be stored in organised Drive folders."
        />

        <Integration
          icon={<Plug />}
          title="Webhooks"
          desc="Secure endpoints for Meta events and future providers."
        />
      </div>
    </section>
  );
}

function Integration({ icon, title, desc }) {
  return (
    <div className="panel integration">
      <div className="intIcon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="ready">
          Architecture ready
        </span>
      </div>

      <button className="secondary">
        Configure
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <section className="content">
      <div className="panel">
        <h3>Workspace Settings</h3>

        <p>Business: MB FinServe</p>

        <p>
          Products: Loans • Credit Cards • Insurance • Banking
        </p>

        <p>Stack: Vercel + Supabase</p>
      </div>
    </section>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
