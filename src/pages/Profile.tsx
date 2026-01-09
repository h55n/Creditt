import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredentials } from '@/contexts/CredentialContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Share2, Copy, Download, QrCode, CheckCircle2, Award, TrendingUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Profile = () => {
  const { user } = useAuth();
  const { getCredentialsByUser } = useCredentials();
  const [showQR, setShowQR] = useState(false);

  if (!user) return null;

  const credentials = getCredentialsByUser(user.id);
  const verifiedCount = credentials.filter(c => c.status === 'verified').length;
  const employabilityScore = Math.min(100, Math.round((verifiedCount / Math.max(credentials.length, 1)) * 100));

  const profileUrl = `${window.location.origin}/public-profile/${user.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link Copied",
      description: "Profile link copied to clipboard",
    });
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `credeed-profile-${user.id}.png`;
      link.href = url;
      link.click();
    }
    toast({
      title: "QR Code Downloaded",
      description: "Your profile QR code has been saved",
    });
  };

  const nsqfDistribution = credentials.reduce((acc, cred) => {
    acc[cred.nsqfLevel] = (acc[cred.nsqfLevel] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Skills Passport</h1>
          <p className="text-muted-foreground">Share your verified credentials with employers</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="border-none shadow-card">
              <div className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="h-24 w-24 rounded-full bg-gradient-hero flex items-center justify-center text-white text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                    <p className="text-muted-foreground mb-4">{user.email}</p>
                    {user.aadhaarId && (
                      <Badge className="bg-success/10 text-success gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Aadhaar Verified: {user.aadhaarId}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold text-primary">{credentials.length}</div>
                    <div className="text-sm text-muted-foreground">Total Credentials</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-success/10">
                    <div className="text-2xl font-bold text-success">{verifiedCount}</div>
                    <div className="text-sm text-muted-foreground">Verified</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-warning/10">
                    <div className="text-2xl font-bold text-warning">{employabilityScore}</div>
                    <div className="text-sm text-muted-foreground">Score</div>
                  </div>
                </div>

                {/* Share Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 gap-2" onClick={() => setShowQR(true)}>
                    <QrCode className="h-4 w-4" />
                    Generate QR Code
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </Card>

            {/* Credentials List */}
            <Card className="border-none shadow-card">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold">Verified Credentials</h3>
                <p className="text-sm text-muted-foreground">Credentials displayed on your public profile</p>
              </div>
              <div className="divide-y">
                {credentials.filter(c => c.status === 'verified').map((cred) => (
                  <div key={cred.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{cred.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{cred.issuer}</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">NSQF Level {cred.nsqfLevel}</Badge>
                          <Badge className="bg-success/10 text-success gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(cred.issueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {cred.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {credentials.filter(c => c.status === 'verified').length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No verified credentials yet. Add and verify credentials to display them here.
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shareable Link */}
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Shareable Link
                </h3>
                <Input value={profileUrl} readOnly className="mb-3" />
                <Button variant="outline" className="w-full gap-2" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </Card>

            {/* NSQF Breakdown */}
            <Card className="border-none shadow-elevated bg-gradient-card">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  NSQF Level Distribution
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Your credentials mapped to qualification framework</p>
                <div className="space-y-5">
                  {Object.entries(nsqfDistribution)
                    .sort(([a], [b]) => Number(b) - Number(a))
                    .map(([level, count]) => (
                      <div key={level}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">Level {level}</span>
                          <span className="font-bold text-lg">{count} {count === 1 ? 'credential' : 'credentials'}</span>
                        </div>
                        <div className="h-3 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-hero transition-all duration-500"
                            style={{ width: `${(count / credentials.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* Skills Passport Ready */}
            <Card className="border-none shadow-elevated bg-gradient-hero text-white">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3">Skills Passport Ready</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Share your verified portfolio with employers
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90 gap-2 h-12 font-semibold">
                  <Share2 className="h-5 w-5" />
                  Get Shareable Link
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Profile QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="bg-white p-6 rounded-lg">
              <QRCodeSVG
                id="qr-code"
                value={profileUrl}
                size={256}
                level="H"
                includeMargin
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Employers can scan this to instantly verify your credentials
            </p>
            <div className="flex gap-3 mt-6 w-full">
              <Button variant="outline" className="flex-1 gap-2" onClick={handleDownloadQR}>
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button className="flex-1 gap-2" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
