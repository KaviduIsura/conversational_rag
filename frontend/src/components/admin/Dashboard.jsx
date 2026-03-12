import React from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, Divider, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Avatar
} from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

import FlightIcon from '@mui/icons-material/Flight';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArticleIcon from '@mui/icons-material/Article';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// --- MOCK DATA ---
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 8780 },
  { name: 'May', revenue: 5890 },
  { name: 'Jun', revenue: 11390 },
  { name: 'Jul', revenue: 14490 },
];

const destinationData = [
  { name: 'Bali', bookings: 120 },
  { name: 'Swiss Alps', bookings: 85 },
  { name: 'Kyoto', bookings: 65 },
  { name: 'Maldives', bookings: 50 },
];
const COLORS = ['#0B76FF', '#16A34A', '#FF8A00', '#E91E63'];

const recentBookings = [
  { id: 'BK-7829', user: 'Emma Watson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50', tour: '7 Days Bali Escape', amount: '$1,798', status: 'Completed', date: 'Oct 24, 2026' },
  { id: 'BK-7830', user: 'James Bond', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50', tour: '14 Days Europe', amount: '$4,900', status: 'Pending', date: 'Oct 25, 2026' },
  { id: 'BK-7831', user: 'Lara Croft', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50', tour: 'Swiss Alps Trek', amount: '$2,100', status: 'Completed', date: 'Oct 25, 2026' },
  { id: 'BK-7832', user: 'Peter Parker', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50', tour: 'Kyoto Cultural', amount: '$1,800', status: 'Cancelled', date: 'Oct 26, 2026' },
];

export const Dashboard = () => {
  const statCards = [
    { title: 'Total Bookings', value: '1,482', icon: <FlightIcon color="primary" />, change: '+12.5%', isUp: true },
    { title: 'Active Users', value: '12,840', icon: <PersonIcon color="secondary" />, change: '+5.2%', isUp: true },
    { title: 'Monthly Revenue', value: '$144k', icon: <AttachMoneyIcon color="success" />, change: '+18.1%', isUp: true },
    { title: 'RAG Documents', value: '45', icon: <ArticleIcon sx={{ color: '#E91E63' }} />, change: '-2.0%', isUp: false },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom color="text.primary">
            Overview Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time insights and analytics for LuminaTravel bookings and interactions.
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ bgcolor: 'rgba(0,0,0,0.04)', px: 2, py: 1, borderRadius: 2 }}>
          Last updated: Just now
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 1, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="overline" color="text.secondary" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                    {stat.title}
                  </Typography>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'background.default' }}>
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="h3" fontWeight={700} color="text.primary" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {stat.isUp ? <TrendingUpIcon color="success" fontSize="small" sx={{ mr: 0.5 }} /> : <TrendingDownIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />}
                  <Typography variant="body2" color={stat.isUp ? 'success.main' : 'error.main'} fontWeight={600}>
                    {stat.change}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.03)', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Revenue Growth
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Booking revenue processed over the last 7 months.
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0B76FF" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0B76FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6c757d' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6c757d' }} tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`$${value}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#0B76FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, boxShadow: '0 4px 15px rgba(0,0,0,0.03)', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Top Destinations
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Booking volume by location (current month).
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={destinationData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: 12, fill: '#333', fontWeight: 500 }} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Bar dataKey="bookings" radius={[0, 4, 4, 0]} barSize={24}>
                      {destinationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tables Row */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <CardContent sx={{ p: 3 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                 <Typography variant="h6" fontWeight={600}>
                   Recent Bookings
                 </Typography>
                 <Typography variant="body2" color="primary" sx={{ cursor: 'pointer', fontWeight: 500 }}>
                   View All
                 </Typography>
               </Box>
               
               <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.05)' }}>
                 <Table sx={{ minWidth: 650 }}>
                   <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
                     <TableRow>
                       <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Booking ID</TableCell>
                       <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Customer</TableCell>
                       <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Package</TableCell>
                       <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Date</TableCell>
                       <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Amount</TableCell>
                       <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Status</TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {recentBookings.map((row) => (
                       <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                         <TableCell sx={{ fontWeight: 500 }}>{row.id}</TableCell>
                         <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar src={row.avatar} sx={{ width: 32, height: 32, mr: 2 }} />
                              <Typography variant="body2" fontWeight={500}>{row.user}</Typography>
                            </Box>
                         </TableCell>
                         <TableCell>{row.tour}</TableCell>
                         <TableCell>{row.date}</TableCell>
                         <TableCell sx={{ fontWeight: 600 }}>{row.amount}</TableCell>
                         <TableCell>
                            <Chip 
                              label={row.status} 
                              size="small"
                              sx={{ 
                                bgcolor: row.status === 'Completed' ? 'rgba(22, 163, 74, 0.1)' : 
                                         row.status === 'Pending' ? 'rgba(255, 138, 0, 0.1)' : 'rgba(233, 30, 99, 0.1)',
                                color: row.status === 'Completed' ? '#16A34A' : 
                                       row.status === 'Pending' ? '#FF8A00' : '#E91E63',
                                fontWeight: 600,
                                borderRadius: 1.5
                              }} 
                            />
                         </TableCell>
                       </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
