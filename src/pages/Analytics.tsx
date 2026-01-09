import { useAuth } from '@/contexts/AuthContext';
import { useCredentials } from '@/contexts/CredentialContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const Analytics = () => {
  const { user } = useAuth();
  const { getCredentialsByUser } = useCredentials();

  if (!user) return null;

  const credentials = getCredentialsByUser(user.id);

  // NSQF Distribution Data
  const nsqfData = Array.from({ length: 10 }, (_, i) => ({
    level: `L${i + 1}`,
    count: credentials.filter(c => c.nsqfLevel === i + 1).length,
  })).filter(d => d.count > 0);

  // Category Distribution
  const categoryData = credentials.reduce((acc, cred) => {
    const cat = cred.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  // Skills Frequency
  const skillsData = credentials
    .flatMap(c => c.skills)
    .reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topSkillsData = Object.entries(skillsData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // Timeline Data (mock growth)
  const timelineData = [
    { month: 'Jan', credentials: 8 },
    { month: 'Feb', credentials: 12 },
    { month: 'Mar', credentials: 18 },
    { month: 'Apr', credentials: 25 },
    { month: 'May', credentials: 35 },
    { month: 'Jun', credentials: credentials.length },
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const verifiedCount = credentials.filter(c => c.status === 'verified').length;
  const employabilityScore = Math.min(100, Math.round((verifiedCount / Math.max(credentials.length, 1)) * 100));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your skills growth and credential performance</p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card className="border-none shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-gradient-success p-2">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <Badge className="bg-success/10 text-success">+15%</Badge>
            </div>
            <div className="text-3xl font-bold">{employabilityScore}</div>
            <div className="text-sm text-muted-foreground">Employability Score</div>
          </Card>

          <Card className="border-none shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-gradient-hero p-2">
                <Award className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{credentials.length}</div>
            <div className="text-sm text-muted-foreground">Total Credentials</div>
          </Card>

          <Card className="border-none shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-success p-2">
                <Target className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{Object.keys(skillsData).length}</div>
            <div className="text-sm text-muted-foreground">Unique Skills</div>
          </Card>

          <Card className="border-none shadow-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-lg bg-warning p-2">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">6</div>
            <div className="text-sm text-muted-foreground">Months Active</div>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* NSQF Level Distribution */}
          <Card className="border-none shadow-card">
            <div className="p-6 border-b">
              <h3 className="font-semibold">NSQF Level Distribution</h3>
              <p className="text-sm text-muted-foreground">Your credentials across qualification levels</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nsqfData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="level" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card className="border-none shadow-card">
            <div className="p-6 border-b">
              <h3 className="font-semibold">Credentials by Category</h3>
              <p className="text-sm text-muted-foreground">Distribution across different domains</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Top Skills */}
          <Card className="border-none shadow-card">
            <div className="p-6 border-b">
              <h3 className="font-semibold">Top Skills</h3>
              <p className="text-sm text-muted-foreground">Most frequent skills in your credentials</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topSkillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Growth Timeline */}
          <Card className="border-none shadow-card">
            <div className="p-6 border-b">
              <h3 className="font-semibold">Credential Growth</h3>
              <p className="text-sm text-muted-foreground">Your learning journey over time</p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="credentials"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: '#4F46E5', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
