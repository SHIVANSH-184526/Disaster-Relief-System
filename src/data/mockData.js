export const dashboardMetrics = {
  totalRequests: { value: 2450, change: "+12%" },
  pendingRequests: { value: 345, change: "-5%" },
  deliveredRequests: { value: 1890, change: "+15%" },
  availableSupplies: { value: 15400, change: "+8%" }
};

export const priorityDistribution = [
  { name: 'High', value: 45, color: '#ef4444' },
  { name: 'Medium', value: 35, color: '#eab308' },
  { name: 'Low', value: 20, color: '#22c55e' }
];

export const requestsOverTime = [
  { name: 'Mon', requests: 120 },
  { name: 'Tue', requests: 200 },
  { name: 'Wed', requests: 150 },
  { name: 'Thu', requests: 280 },
  { name: 'Fri', requests: 310 },
  { name: 'Sat', requests: 220 },
  { name: 'Sun', requests: 180 },
];

export const mockRequests = [
  { id: 'REQ-001', location: 'Downtown Shelter', type: 'Food', count: 500, urgency: 'High', status: 'Pending', time: '10 min ago' },
  { id: 'REQ-002', location: 'Westside Clinic', type: 'Medicine', count: 50, urgency: 'High', status: 'Assigned', time: '1 hour ago' },
  { id: 'REQ-003', location: 'North Res Camp', type: 'Water', count: 1200, urgency: 'Medium', status: 'In Transit', time: '2 hours ago' },
  { id: 'REQ-004', location: 'East High School', type: 'Food', count: 300, urgency: 'Low', status: 'Delivered', time: '5 hours ago' },
  { id: 'REQ-005', location: 'South Arena', type: 'Medicine', count: 100, urgency: 'Medium', status: 'Pending', time: '6 hours ago' }
];

export const mockSupplies = [
  { id: 'SUP-001', source: 'Red Cross Central', type: 'Medicine', quantity: 5000, location: 'City Center', lastUpdated: 'Today, 08:00 AM' },
  { id: 'SUP-002', source: 'FoodBank DB', type: 'Food', quantity: 12000, location: 'North Warehouse', lastUpdated: 'Today, 09:30 AM' },
  { id: 'SUP-003', source: 'WaterAid DB', type: 'Water', quantity: 8000, location: 'South Depot', lastUpdated: 'Yesterday, 04:00 PM' },
  { id: 'SUP-004', source: 'Global Med', type: 'Medicine', quantity: 1500, location: 'West Medical Hub', lastUpdated: 'Today, 11:15 AM' },
];

export const mockAllocations = [
  { id: 'ALC-001', requestId: 'REQ-002', location: 'Westside Clinic', priority: 'High', assignedTo: 'Local Med Vol 1', status: 'Assigned' },
  { id: 'ALC-002', requestId: 'REQ-003', location: 'North Res Camp', priority: 'Medium', assignedTo: 'WaterAid Transport', status: 'In Transit' },
];
