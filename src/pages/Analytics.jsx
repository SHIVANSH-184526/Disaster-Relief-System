import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area 
} from 'recharts';
import { BarChart3, TrendingUp, Filter } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { requestsOverTime } from '../data/mockData';
import styles from './Requests.module.css'; 

const supplyUsageData = [
  { name: 'Food', initial: 15000, used: 3000 },
  { name: 'Water', initial: 8000, used: 4500 },
  { name: 'Medicine', initial: 6500, used: 2500 },
];

const riskZonesData = [
  { name: 'Downtown', incidents: 85 },
  { name: 'Westside', incidents: 60 },
  { name: 'North Camp', incidents: 120 },
  { name: 'East Hills', incidents: 30 },
];

export default function Analytics() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1>Analytics & Insights</h1>
          <p>Data-driven insights to manage disaster relief efficiency.</p>
        </div>
        <Button variant="secondary" icon={<Filter size={18} />}>Data Filters</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <Card title="Crisis Demand Trends (Last 7 Days)">
          <div style={{ height: '300px', width: '100%', marginTop: '1rem', fontSize: '0.85rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={requestsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-blue)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent-blue)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="var(--accent-blue)" fillOpacity={1} fill="url(#colorRequests)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Supply Availability vs Usage">
          <div style={{ height: '300px', width: '100%', marginTop: '1rem', fontSize: '0.85rem' }}>
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplyUsageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Bar dataKey="initial" stackId="a" fill="var(--glass-border)" />
                <Bar dataKey="used" stackId="a" fill="var(--priority-high)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
         <Card title="High-Risk Zone Analysis">
            <div style={{ height: '300px', width: '100%', marginTop: '1rem', fontSize: '0.85rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskZonesData} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                  <XAxis type="number" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="incidents" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </Card>
       </div>
    </div>
  );
}
