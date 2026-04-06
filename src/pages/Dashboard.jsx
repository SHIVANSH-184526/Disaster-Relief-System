import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Users, AlertTriangle, CheckCircle, Package, TrendingUp, TrendingDown 
} from 'lucide-react';

import Card from '../components/Card/Card';
import Badge from '../components/Badge/Badge';
import Button from '../components/Button/Button';
import styles from './Dashboard.module.css';
import { 
  dashboardMetrics, 
  priorityDistribution, 
  requestsOverTime, 
  mockRequests 
} from '../data/mockData';

export default function Dashboard() {
  const getChangeIcon = (change) => {
    if (change.startsWith('+')) return <TrendingUp size={16} />;
    return <TrendingDown size={16} />;
  };

  const isPositive = (change) => change.startsWith('+');

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Real-time situation awareness and resource tracking.</p>
      </div>

      <div className={styles.metricsGrid}>
        <Card title="Total Requests" icon={<Users size={20} />}>
          <div className={styles.metricValue}>{dashboardMetrics.totalRequests.value.toLocaleString()}</div>
          <div className={`${styles.metricChange} ${isPositive(dashboardMetrics.totalRequests.change) ? styles.positive : styles.negative}`}>
            {getChangeIcon(dashboardMetrics.totalRequests.change)}
            {dashboardMetrics.totalRequests.change} from yesterday
          </div>
        </Card>

        <Card title="Pending Urgent" icon={<AlertTriangle size={20} color="var(--priority-high)" />}>
          <div className={styles.metricValue}>{dashboardMetrics.pendingRequests.value.toLocaleString()}</div>
          <div className={`${styles.metricChange} ${!isPositive(dashboardMetrics.pendingRequests.change) ? styles.positive : styles.negative}`}>
            {getChangeIcon(dashboardMetrics.pendingRequests.change)}
            {dashboardMetrics.pendingRequests.change} from yesterday
          </div>
        </Card>

        <Card title="Delivered Resources" icon={<CheckCircle size={20} color="var(--priority-low)" />}>
          <div className={styles.metricValue}>{dashboardMetrics.deliveredRequests.value.toLocaleString()}</div>
          <div className={`${styles.metricChange} ${isPositive(dashboardMetrics.deliveredRequests.change) ? styles.positive : styles.negative}`}>
            {getChangeIcon(dashboardMetrics.deliveredRequests.change)}
            {dashboardMetrics.deliveredRequests.change} from yesterday
          </div>
        </Card>

        <Card title="Available Supplies" icon={<Package size={20} color="var(--accent-blue)" />}>
          <div className={styles.metricValue}>{dashboardMetrics.availableSupplies.value.toLocaleString()}</div>
          <div className={`${styles.metricChange} ${isPositive(dashboardMetrics.availableSupplies.change) ? styles.positive : styles.negative}`}>
            {getChangeIcon(dashboardMetrics.availableSupplies.change)}
            {dashboardMetrics.availableSupplies.change} from yesterday
          </div>
        </Card>
      </div>

      <div className={styles.chartsGrid}>
        <Card title="Requests Over Time (Last 7 Days)">
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="requests" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Priority Distribution">
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {priorityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Recent Urgent Requests">
        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {mockRequests.slice(0, 4).map((req) => (
                <tr key={req.id}>
                  <td>{req.location}</td>
                  <td>{req.type}</td>
                  <td>{req.count}</td>
                  <td><Badge type={req.urgency} /></td>
                  <td><Badge type={req.status} /></td>
                  <td>{req.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
