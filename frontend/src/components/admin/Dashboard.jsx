import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";

import FlightIcon from "@mui/icons-material/Flight";
import PersonIcon from "@mui/icons-material/Person";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArticleIcon from "@mui/icons-material/Article";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const revenueData = [
  { month: "Jan", revenue: 4000 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 7000 },
  { month: "Apr", revenue: 8800 },
  { month: "May", revenue: 9500 },
  { month: "Jun", revenue: 12000 }
];

const bookingsData = [
  { month: "Jan", bookings: 200 },
  { month: "Feb", bookings: 280 },
  { month: "Mar", bookings: 350 },
  { month: "Apr", bookings: 420 },
  { month: "May", bookings: 480 },
  { month: "Jun", bookings: 540 }
];

const destinationData = [
  { name: "Bali", bookings: 120 },
  { name: "Maldives", bookings: 90 },
  { name: "Kyoto", bookings: 75 },
  { name: "Swiss Alps", bookings: 60 }
];

const bookings = [
  { id: "BK-7821", name: "Emma Watson", tour: "Bali Escape", date: "Oct 21", amount: "$1200", status: "Completed" },
  { id: "BK-7822", name: "James Bond", tour: "Europe Tour", date: "Oct 22", amount: "$4200", status: "Pending" },
  { id: "BK-7823", name: "Lara Croft", tour: "Swiss Alps Trek", date: "Oct 23", amount: "$2300", status: "Completed" }
];

const customers = [
  { name: "Emma Watson", bookings: 8, spent: "$9200" },
  { name: "James Bond", bookings: 5, spent: "$6400" },
  { name: "Lara Croft", bookings: 4, spent: "$4800" }
];

/* ---------------- DASHBOARD ---------------- */

export const Dashboard = () => {

  const stats = [
    { title: "Total Bookings", value: "1,482", icon: <FlightIcon color="primary" />, change: "+12.5%", up: true },
    { title: "Active Users", value: "12,840", icon: <PersonIcon color="secondary" />, change: "+5.2%", up: true },
    { title: "Revenue", value: "$144k", icon: <AttachMoneyIcon color="success" />, change: "+18%", up: true },
    { title: "Documents", value: "45", icon: <ArticleIcon color="error" />, change: "-2%", up: false },
    { title: "Total Bookings", value: "1,482", icon: <FlightIcon color="primary" />, change: "+12.5%", up: true },
  ];

  return (
    <Box>

      {/* HEADER */}

      <Box mb={4}>
        <Typography variant="h4" fontWeight={700}>
          Dashboard Overview
        </Typography>

        <Typography color="text.secondary">
          Analytics and insights for the travel platform
        </Typography>
      </Box>

      {/* KPI CARDS */}

      <Grid container spacing={3} mb={4}>

        {stats.map((stat, i) => (

          <Grid item xs={12} sm={6} md={3} key={i}>

            <Card sx={{ height: "100%", borderRadius: 3 }}>

              <CardContent>

                <Box display="flex" justifyContent="space-between">

                  <Box>

                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={700}>
                      {stat.value}
                    </Typography>

                  </Box>

                  {stat.icon}

                </Box>

                <Box display="flex" alignItems="center" mt={2}>

                  {stat.up ? (
                    <TrendingUpIcon color="success" fontSize="small" />
                  ) : (
                    <TrendingDownIcon color="error" fontSize="small" />
                  )}

                  <Typography
                    ml={0.5}
                    fontWeight={600}
                    color={stat.up ? "success.main" : "error.main"}
                  >
                    {stat.change}
                  </Typography>

                  <Typography variant="caption" ml={1}>
                    vs last month
                  </Typography>

                </Box>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

      {/* CHARTS */}

      {/* <Grid container spacing={3} mb={4}> */}

        {/* Revenue Chart */}

        {/* <Grid item xs={12} lg={6}>

          <Card sx={{ borderRadius: 3 }}>

            <CardContent>

              <Typography fontWeight={600} mb={2}>
                Revenue Growth
              </Typography>

              <Box height={320}>

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart data={revenueData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1976d2"
                      fill="#1976d2"
                      fillOpacity={0.2}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </Box>

            </CardContent>

          </Card>

        </Grid> */}

        {/* Bookings Chart */}

        {/* <Grid item xs={12} lg={6}>

          <Card sx={{ borderRadius: 3 }}>

            <CardContent>

              <Typography fontWeight={600} mb={2}>
                Monthly Bookings
              </Typography>

              <Box height={320}>

                <ResponsiveContainer width="100%" height="100%">

                  <LineChart data={bookingsData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#4caf50"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </Box>

            </CardContent>

          </Card>

        </Grid> */}

        {/* Destinations */}

        {/* <Grid item xs={12}>

          <Card sx={{ borderRadius: 3 }}>

            <CardContent>

              <Typography fontWeight={600} mb={2}>
                Top Destinations
              </Typography>

              <Box height={320}>

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={destinationData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="bookings" fill="#ff9800" />

                  </BarChart>

                </ResponsiveContainer>

              </Box>

            </CardContent>

          </Card>

        </Grid> */}

      {/* </Grid> */}

      {/* TABLES */}

      <Grid container spacing={3}>

        {/* Recent Bookings */}

        <Grid item xs={12} lg={7}>

          <Card sx={{ borderRadius: 3 }}>

            <CardContent>

              <Typography fontWeight={600} mb={2}>
                Recent Bookings
              </Typography>

              <TableContainer component={Paper} elevation={0}>

                <Table>

                  <TableHead>

                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Tour</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>

                  </TableHead>

                  <TableBody>

                    {bookings.map((row) => (

                      <TableRow key={row.id}>

                        <TableCell>{row.id}</TableCell>

                        <TableCell>

                          <Box display="flex" alignItems="center">

                            <Avatar sx={{ mr: 1 }}>
                              {row.name[0]}
                            </Avatar>

                            {row.name}

                          </Box>

                        </TableCell>

                        <TableCell>{row.tour}</TableCell>

                        <TableCell>{row.date}</TableCell>

                        <TableCell>{row.amount}</TableCell>

                        <TableCell>

                          <Chip
                            label={row.status}
                            color={row.status === "Completed" ? "success" : "warning"}
                            size="small"
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

        {/* Top Customers */}

        <Grid item xs={12} lg={5}>

          <Card sx={{ borderRadius: 3 }}>

            <CardContent>

              <Typography fontWeight={600} mb={2}>
                Top Customers
              </Typography>

              <TableContainer component={Paper} elevation={0}>

                <Table>

                  <TableHead>

                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Bookings</TableCell>
                      <TableCell>Total Spent</TableCell>
                    </TableRow>

                  </TableHead>

                  <TableBody>

                    {customers.map((c, i) => (

                      <TableRow key={i}>

                        <TableCell>{c.name}</TableCell>
                        <TableCell>{c.bookings}</TableCell>
                        <TableCell>{c.spent}</TableCell>

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