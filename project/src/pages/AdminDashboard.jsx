import React, { useState, useEffect } from 'react';
import { Users, Shield, Server, Activity, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch if backend not ready, or actual fetch
    const fetchAdminData = async () => {
        try {
            // Check if we have token stored
            // const token = localStorage.getItem("token"); // Use actual auth persistence method
            
            // For now, assume session cookie works or mock it
            // const resStats = await axios.get("http://localhost:5000/api/admin/stats", { withCredentials: true });
            // const resLogs = await axios.get("http://localhost:5000/api/admin/logs", { withCredentials: true });
            
            // setStats(resStats.data);
            // setLogs(resLogs.data);
            
            // Mock Data for Demo since I can't easily login as admin in this flow
            setTimeout(() => {
                setStats({
                    users: { total: 1250, active: 450, premium: 85 },
                    system: { status: "healthy", uptime: 12345 }
                });
                setLogs([
                   { action: "LOGIN", user: "john_doe", timestamp: new Date(), ip: "192.168.1.1" },
                   { action: "UPDATE_PROFILE", user: "jane_smith", timestamp: new Date(Date.now() - 3600000), ip: "10.0.0.5" },
                   { action: "LOGIN_FAIL", user: "unknown", timestamp: new Date(Date.now() - 7200000), ip: "45.33.22.11" },
                ]);
                setLoading(false);
            }, 1000);

        } catch (err) {
            console.error("Admin Access Failed", err);
            setLoading(false);
        }
    };
    fetchAdminData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Admin Panel...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-800 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3 animate-fade-in-up delay-100">
            <Shield className="w-8 h-8 text-emerald-600" /> 
            Admin Command Center
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in-up delay-200">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Total Users</div>
                <div className="text-3xl font-black text-slate-800">{stats?.users.total}</div>
                <Users className="w-6 h-6 text-emerald-500 absolute top-6 right-6 opacity-20" />
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Active Today</div>
                <div className="text-3xl font-black text-slate-800">{stats?.users.active}</div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">Premium Subs</div>
                <div className="text-3xl font-black text-slate-800">{stats?.users.premium}</div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">System Status</div>
                <div className="text-xl font-bold text-emerald-600 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    {stats?.system.status.toUpperCase()}
                </div>
            </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up delay-300">
            <div className="px-6 py-4 border-b border-slate-100 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                System Audit Logs
            </div>
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                    <tr>
                        <th className="px-6 py-3 font-semibold">Action</th>
                        <th className="px-6 py-3 font-semibold">User</th>
                        <th className="px-6 py-3 font-semibold">IP Address</th>
                        <th className="px-6 py-3 font-semibold">Timestamp</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {logs.map((log, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-3 font-medium">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${log.action.includes("FAIL") ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                                    {log.action}
                                </span>
                            </td>
                            <td className="px-6 py-3 text-slate-600">{log.user}</td>
                            <td className="px-6 py-3 text-slate-400 font-mono text-xs">{log.ip}</td>
                            <td className="px-6 py-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default AdminDashboard;
