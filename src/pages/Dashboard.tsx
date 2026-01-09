import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCredentials } from '@/contexts/CredentialContext';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from '@/components/Navbar';
import { 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Upload,
  Share2,
  Eye,
  ArrowUpRight,
  Target
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getCredentialsByUser } = useCredentials();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  const credentials = getCredentialsByUser(user.id);
  const employabilityScore = 78;
  const scoreChange = 15;
  const totalCredentials = credentials.length;
  const verifiedCount = credentials.filter(c => c.status === 'verified').length;
  const pendingCount = credentials.filter(c => c.status === 'pending').length;
  const profileCompleteness = 85;
  const employerViews = 134;

  const recentCredentials = credentials
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 3);

  const nsqfProgress = [
    { level: 5, count: 12, color: "bg-primary" },
    { level: 6, count: 18, color: "bg-success" },
    { level: 7, count: 15, color: "bg-warning" },
    { level: 8, count: 2, color: "bg-destructive" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      {/* Header */}
      <div className="border-b bg-card/80 backdrop-blur-xl shadow-soft">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Skills Dashboard</h1>
              <p className="text-muted-foreground text-lg">Welcome back, {user.name}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 h-11">
                <Upload className="h-4 w-4" />
                Import Credentials
              </Button>
              <Button className="gap-2 h-11 shadow-glow shadow-primary/30">
                <Share2 className="h-4 w-4" />
                Share Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* KPI Cards */}
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          <Card className="group border-0 bg-gradient-success p-7 shadow-elevated hover:shadow-glow hover:shadow-success/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl bg-white/25 backdrop-blur-sm p-3.5 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-white/25 backdrop-blur-sm text-white border-0 rounded-xl px-3 py-1.5 font-bold">
                +{scoreChange}%
              </Badge>
            </div>
            <div className="text-5xl font-bold text-white mb-2">{employabilityScore}</div>
            <div className="text-sm text-white/90 font-semibold tracking-wide">Employability Score</div>
          </Card>

          <Card className="group border-0 bg-gradient-hero p-7 shadow-elevated hover:shadow-glow hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl bg-white/25 backdrop-blur-sm p-3.5 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-white/25 backdrop-blur-sm text-white border-0 rounded-xl px-3 py-1.5 font-bold">
                {verifiedCount}/{totalCredentials}
              </Badge>
            </div>
            <div className="text-5xl font-bold text-white mb-2">{totalCredentials}</div>
            <div className="text-sm text-white/90 font-semibold tracking-wide">Total Credentials</div>
          </Card>

          <Card className="group border-0 bg-gradient-secondary p-7 shadow-elevated hover:shadow-glow hover:shadow-secondary/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl bg-white/25 backdrop-blur-sm p-3.5 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="h-7 w-7 text-white" />
              </div>
              <Badge className="bg-white/25 backdrop-blur-sm text-white border-0 rounded-xl px-3 py-1.5 font-bold">
                {Math.round((verifiedCount / totalCredentials) * 100)}%
              </Badge>
            </div>
            <div className="text-5xl font-bold text-white mb-2">{verifiedCount}</div>
            <div className="text-sm text-white/90 font-semibold tracking-wide">Verified</div>
          </Card>

          <Card className="group border-0 bg-gradient-accent p-7 shadow-elevated hover:shadow-glow hover:shadow-accent/30 transition-all duration-300 hover:scale-[1.02]">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl bg-white/25 backdrop-blur-sm p-3.5 group-hover:scale-110 transition-transform duration-300">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-white group-hover:translate-x-0.5 group-hover:translate-y-[-2px] transition-transform duration-300" />
            </div>
            <div className="text-5xl font-bold text-white mb-2">{employerViews}</div>
            <div className="text-sm text-white/90 font-semibold tracking-wide">Employer Views</div>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Recent Credentials */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-elevated overflow-hidden">
              <div className="border-b p-8 bg-gradient-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Recent Credentials</h2>
                    <p className="text-muted-foreground">Your latest additions</p>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary/10">View All</Button>
                </div>
              </div>
              <div className="divide-y divide-border/50">
                {recentCredentials.map((cred) => (
                  <div key={cred.id} className="p-7 transition-all duration-200 hover:bg-muted/30 group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-5">
                        <div className="h-14 w-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-card group-hover:shadow-elevated transition-shadow duration-200">
                          <Award className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1">{cred.name}</h3>
                          <p className="text-muted-foreground mb-3">{cred.issuer}</p>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs font-semibold px-3 py-1">
                              NSQF Level {cred.nsqfLevel}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-medium">{new Date(cred.issueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      {cred.status === "verified" ? (
                        <Badge className="bg-success/15 text-success border-success/20 border font-semibold">
                          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                          Verified
                        </Badge>
                      ) : cred.status === "pending" ? (
                        <Badge className="bg-warning/15 text-warning border-warning/20 border font-semibold">
                          <Clock className="mr-1.5 h-3.5 w-3.5" />
                          Pending
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive/15 text-destructive border-destructive/20 border font-semibold">
                          <AlertCircle className="mr-1.5 h-3.5 w-3.5" />
                          Action Needed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* NSQF Distribution */}
            <Card className="border-0 bg-card/60 backdrop-blur-sm shadow-elevated overflow-hidden">
              <div className="border-b p-8 bg-gradient-card">
                <h2 className="text-2xl font-bold mb-1">NSQF Level Distribution</h2>
                <p className="text-muted-foreground">Your credentials mapped to qualification framework</p>
              </div>
              <div className="p-8">
                <div className="space-y-7">
                  {nsqfProgress.map((item) => (
                    <div key={item.level}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-bold text-base">Level {item.level}</span>
                        <span className="font-bold text-xl">{item.count} credentials</span>
                      </div>
                      <div className="h-4 rounded-full bg-muted/50 overflow-hidden shadow-inner">
                        <div 
                          className={`h-full rounded-full ${item.color} transition-all duration-500 shadow-glow`}
                          style={{ width: `${(item.count / totalCredentials) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completeness */}
            <Card className="border-0 shadow-elevated p-8 bg-gradient-card backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-7">Profile Completeness</h3>
              <div className="space-y-7">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Profile Strength</span>
                    <span className="text-3xl font-bold text-primary">78%</span>
                  </div>
                  <div className="h-4 rounded-full bg-muted/50 overflow-hidden shadow-inner">
                    <div className="h-full rounded-full bg-gradient-hero w-[78%] transition-all duration-500 shadow-glow shadow-primary/50" />
                  </div>
                </div>
                <div className="space-y-4 pt-6 border-t">
                  <p className="font-semibold text-muted-foreground mb-4">Next Steps:</p>
                  <div className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <div className="h-3 w-3 rounded-full bg-success shadow-glow shadow-success/50" />
                    </div>
                    <span className="text-sm font-medium">Add 5 more credentials</span>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-full bg-warning/15 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <div className="h-3 w-3 rounded-full bg-warning shadow-glow shadow-warning/50" />
                    </div>
                    <span className="text-sm font-medium">Complete Aadhaar verification</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommended Next Steps */}
            <Card className="border-0 shadow-elevated p-8 bg-gradient-card backdrop-blur-sm">
              <h3 className="font-bold text-xl mb-7">Recommended Next Steps</h3>
              <div className="space-y-4">
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-background/50 border-2 border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 hover:shadow-card cursor-pointer">
                  <div className="rounded-xl bg-primary/15 p-3 group-hover:scale-110 transition-transform duration-200">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1.5">Add AWS Certification</h4>
                    <p className="text-sm text-muted-foreground">Boost to NSQF Level 8</p>
                  </div>
                </div>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-background/50 border-2 border-border/50 hover:border-success/40 hover:bg-success/5 transition-all duration-200 hover:shadow-card cursor-pointer">
                  <div className="rounded-xl bg-success/15 p-3 group-hover:scale-110 transition-transform duration-200">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1.5">Verify Pending Items</h4>
                    <p className="text-sm text-muted-foreground">Increase score by 15%</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Skills Passport Ready */}
            <Card className="border-0 shadow-elevated bg-gradient-hero p-9 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="relative">
                <h3 className="text-2xl font-bold mb-3">Skills Passport Ready</h3>
                <p className="text-white/95 mb-7 leading-relaxed text-base">
                  Share your verified portfolio with employers
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/95 gap-2 h-12 font-bold shadow-elevated hover:shadow-glow hover:shadow-white/20" onClick={() => navigate('/profile')}>
                  <Share2 className="h-5 w-5" />
                  Get Shareable Link
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
