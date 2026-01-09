import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Users, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'learner' | 'employer'>('learner');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    aadhaarId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password, role);
        if (success) {
          toast({
            title: "Login Successful",
            description: `Welcome back to Credeed!`,
          });
          navigate(role === 'learner' ? '/dashboard' : '/employer-dashboard');
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid credentials. Try: rahul@example.com / demo123",
            variant: "destructive",
          });
        }
      } else {
        const success = await signup(
          formData.name,
          formData.email,
          formData.password,
          role,
          formData.aadhaarId
        );
        if (success) {
          toast({
            title: "Signup Successful",
            description: "Your account has been created!",
          });
          navigate(role === 'learner' ? '/dashboard' : '/employer-dashboard');
        } else {
          toast({
            title: "Signup Failed",
            description: "Email already exists or invalid data",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden md:block text-white">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-5xl font-bold">Credeed</h1>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4 leading-tight">
                  India's Digital<br />Skills Passport
                </h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Consolidate credentials, verify authenticity, and unlock career opportunities with blockchain-powered verification.
                </p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-success/20 backdrop-blur-sm p-3 border border-success/30">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Blockchain Verified</h3>
                    <p className="text-white/80 leading-relaxed">Immutable credential records</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/20 backdrop-blur-sm p-3 border border-primary/30">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">NSQF Aligned</h3>
                    <p className="text-white/80 leading-relaxed">National Skills Framework mapping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <Card className="p-10 border-none shadow-elevated bg-card">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">Sign in to access your skills passport</p>
            </div>

          <Tabs value={isLogin ? 'login' : 'signup'} onValueChange={(v) => setIsLogin(v === 'login')}>
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="login" className="text-base font-medium">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="signup" className="text-base font-medium">{t('auth.signup')}</TabsTrigger>
            </TabsList>

            {/* Role Selection */}
            <div className="mb-8">
              <Label className="mb-4 block text-base font-medium">{t('auth.loginAs')}</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={role === 'learner' ? 'default' : 'outline'}
                  onClick={() => setRole('learner')}
                  className="gap-2 h-12 text-base"
                >
                  <Users className="h-5 w-5" />
                  {t('auth.learner')}
                </Button>
                <Button
                  type="button"
                  variant={role === 'employer' ? 'default' : 'outline'}
                  onClick={() => setRole('employer')}
                  className="gap-2 h-12 text-base"
                >
                  <Building2 className="h-5 w-5" />
                  {t('auth.employer')}
                </Button>
              </div>
            </div>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">{t('auth.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base">{t('auth.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-12 text-base"
                    placeholder="Enter your password"
                  />
                </div>

                <Alert className="bg-muted/50">
                  <AlertDescription className="text-sm">
                    <strong className="font-semibold">Demo Credentials:</strong><br />
                    Learner: <code className="bg-background px-2 py-0.5 rounded">rahul@example.com</code> / <code className="bg-background px-2 py-0.5 rounded">demo123</code><br />
                    Employer: <code className="bg-background px-2 py-0.5 rounded">recruiter@tcs.com</code> / <code className="bg-background px-2 py-0.5 rounded">demo123</code>
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
                  {loading ? 'Logging in...' : t('auth.login')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">{t('auth.name')}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 text-base"
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-base">{t('auth.email')}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-12 text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-base">{t('auth.password')}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-12 text-base"
                    placeholder="Create a password"
                  />
                </div>
                {role === 'learner' && (
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar" className="text-base">{t('auth.aadhaar')} <span className="text-muted-foreground">(Optional)</span></Label>
                    <Input
                      id="aadhaar"
                      type="text"
                      placeholder="1234-5678-9012"
                      value={formData.aadhaarId}
                      onChange={(e) => setFormData({ ...formData, aadhaarId: e.target.value })}
                      className="h-12 text-base"
                    />
                  </div>
                )}
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
                  {loading ? 'Creating Account...' : t('auth.signup')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
