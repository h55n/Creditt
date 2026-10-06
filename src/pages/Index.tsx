import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, TrendingUp, Award, CheckCircle2, Sparkles, Upload, Share2, Users } from "lucide-react";
import { useNavigate } from "react-router";
const Index = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[40px_40px]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">India's First Digital Skills Passport -
Credeed</Badge>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Your Skills,
              <br />
              One Trusted Passport
            </h1>
            <p className="mb-8 text-xl text-white/90 md:text-2xl">Consolidate credentials from DigiLocker, Coursera &amp; more. Get instant NSQF mapping. Share with employers in one click with Credeed.</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="group bg-white text-primary hover:bg-white/90" onClick={() => navigate('/auth')}>
                Start Building Your Passport
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20" onClick={() => navigate('/auth?role=employer')}>
                For Employers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto -mt-16 px-4 relative z-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none bg-card p-8 shadow-elevated hover:shadow-card transition-all">
            <div className="rounded-xl bg-gradient-success p-4 w-fit mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Blockchain Verified</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every credential authenticated via DigiLocker & blockchain for maximum trust
            </p>
          </Card>

          <Card className="border-none bg-card p-8 shadow-elevated hover:shadow-card transition-all">
            <div className="rounded-xl bg-gradient-hero p-4 w-fit mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">NSQF Aligned</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI-powered mapping to National Skills Qualifications Framework levels
            </p>
          </Card>

          <Card className="border-none bg-card p-8 shadow-elevated hover:shadow-card transition-all">
            <div className="rounded-xl bg-warning p-4 w-fit mb-6">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Career Growth</h3>
            <p className="text-muted-foreground leading-relaxed">
              Track your employability score and discover credential stacking pathways
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4 bg-primary/10 text-primary">How Credeed Works</Badge>
          <h2 className="mb-4 text-4xl font-bold">Three Simple Steps</h2>
          <p className="mb-12 text-xl text-muted-foreground">
            From scattered credentials to verified portfolio in minutes
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-white">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Import Credentials</h3>
            <p className="text-muted-foreground">
              Connect DigiLocker, Coursera & other platforms. We fetch all your certifications automatically.
            </p>
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-success text-2xl font-bold text-white">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Verification</h3>
            <p className="text-muted-foreground">
              Our AI maps each credential to NSQF levels, calculates your employability score & verifies authenticity.
            </p>
          </div>

          <div className="relative">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-warning text-2xl font-bold text-white">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Share & Succeed</h3>
            <p className="text-muted-foreground">
              Get your unique Skills Passport link. Share with employers for instant, trusted verification.
            </p>
          </div>
        </div>
      </section>

      {/* For Learners Section */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 bg-success/10 text-success">For Learners</Badge>
              <h2 className="mb-6 text-4xl font-bold">
                Your Complete Skills Portfolio
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-success" />
                  <div>
                    <h4 className="font-semibold">Consolidated Dashboard</h4>
                    <p className="text-muted-foreground">All credentials in one place with financial analytics-style metrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-success" />
                  <div>
                    <h4 className="font-semibold">Employability Score</h4>
                    <p className="text-muted-foreground">Track your career readiness with AI-powered insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-success" />
                  <div>
                    <h4 className="font-semibold">Career Pathways</h4>
                    <p className="text-muted-foreground">Discover credential stacking opportunities for growth</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-success" />
                  <div>
                    <h4 className="font-semibold">One-Click Sharing</h4>
                    <p className="text-muted-foreground">Share your verified portfolio with employers instantly</p>
                  </div>
                </div>
              </div>
              <Button className="mt-8" size="lg" onClick={() => navigate('/auth')}>
                Get Started Free
              </Button>
            </div>
            <div className="relative">
              <Card className="border-none bg-gradient-card p-8 shadow-elevated">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Skills Portfolio</h3>
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">Employability Score</span>
                      <span className="font-bold text-success">+15%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full w-3/4 rounded-full bg-gradient-success" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-background p-4">
                      <div className="text-3xl font-bold">47</div>
                      <div className="text-sm text-muted-foreground">Total Credentials</div>
                    </div>
                    <div className="rounded-lg bg-background p-4">
                      <div className="text-3xl font-bold">95%</div>
                      <div className="text-sm text-muted-foreground">Verified</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg bg-background p-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10" />
                        <div>
                          <div className="font-medium">Machine Learning Specialization</div>
                          <div className="text-sm text-muted-foreground">NSQF Level 7</div>
                        </div>
                      </div>
                      <Badge className="bg-success/10 text-success">Verified</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="border-none bg-gradient-hero p-12 text-center shadow-elevated">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Ready to Build Your Digital Skills Passport?
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Join thousands of learners consolidating their credentials and unlocking career opportunities
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/auth')}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              Watch Demo
            </Button>
          </div>
        </Card>
      </section>
    </div>;
};
export default Index;