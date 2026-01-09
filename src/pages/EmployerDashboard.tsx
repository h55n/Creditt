import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, CheckCircle, TrendingUp, Filter } from 'lucide-react';
import { useCredentials, Credential } from '@/contexts/CredentialContext';
import Navbar from '@/components/Navbar';

const EmployerDashboard = () => {
  const { credentials } = useCredentials();
  const [searchQuery, setSearchQuery] = useState('');

  // Aggregate stats
  const totalLearners = new Set(credentials.map(c => c.userId)).size;
  const verifiedCredentials = credentials.filter(c => c.status === 'verified').length;
  const recentVerifications = credentials
    .filter(c => c.status === 'verified')
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 5);

  // Top skills
  const skillCounts = credentials
    .filter(c => c.status === 'verified')
    .flatMap(c => c.skills)
    .reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topSkills = Object.entries(skillCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-muted-foreground">Verify candidates and discover talent</p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 md:grid-cols-4">
          <Card className="border-none shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-gradient-hero p-3">
                <Users className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-success" />
            </div>
            <div className="text-3xl font-bold">{totalLearners}</div>
            <div className="text-sm text-muted-foreground">Total Learners</div>
          </Card>

          <Card className="border-none shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-gradient-success p-3">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{verifiedCredentials}</div>
            <div className="text-sm text-muted-foreground">Verified Credentials</div>
          </Card>

          <Card className="border-none shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-warning p-3">
                <Search className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">{topSkills.length}</div>
            <div className="text-sm text-muted-foreground">Unique Skills</div>
          </Card>

          <Card className="border-none shadow-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-primary p-3">
                <Filter className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">95%</div>
            <div className="text-sm text-muted-foreground">Verification Rate</div>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card className="border-none shadow-card p-6">
              <h2 className="text-xl font-bold mb-4">Search Candidates</h2>
              <div className="flex gap-3">
                <Input
                  placeholder="Search by skills, credentials, or NSQF level..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  className="gap-2"
                  onClick={() => window.location.href = '/employer-search'}
                >
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </Card>

            {/* Recent Verifications */}
            <Card className="border-none shadow-card">
              <div className="border-b p-6">
                <h2 className="text-xl font-bold">Recent Verifications</h2>
                <p className="text-sm text-muted-foreground">Latest verified credentials in the system</p>
              </div>
              <div className="divide-y">
                {recentVerifications.map((cred) => (
                  <div key={cred.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-success" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{cred.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{cred.issuer}</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">NSQF Level {cred.nsqfLevel}</Badge>
                          <Badge className="bg-success/10 text-success">Verified</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(cred.issueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {cred.skills.slice(0, 4).map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.location.href = `/employer-candidate/${cred.userId}`}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Skills */}
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Top Skills in Pool</h3>
                <div className="space-y-3">
                  {topSkills.map(([skill, count], idx) => (
                    <div key={skill}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{skill}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gradient-hero"
                          style={{
                            width: `${(count / topSkills[0][1]) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="border-none shadow-card bg-gradient-hero text-white">
              <div className="p-6">
                <h3 className="font-semibold mb-2">Bulk Verification</h3>
                <p className="text-sm text-white/80 mb-4">
                  Verify multiple candidates at once
                </p>
                <Button 
                  className="w-full bg-white text-primary hover:bg-white/90"
                  onClick={() => window.location.href = '/employer-bulk-verify'}
                >
                  Start Bulk Verify
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
