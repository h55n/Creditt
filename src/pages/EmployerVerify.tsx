import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, Scan, Search, Shield, Award } from 'lucide-react';
import { useCredentials } from '@/contexts/CredentialContext';
import type { Credential } from '@/contexts/CredentialContext';
import Navbar from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';

type VerificationResult =
  | { isValid: true; credential: Credential }
  | { isValid: false };

const EmployerVerify = () => {
  const { credentials } = useCredentials();
  const [credentialId, setCredentialId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    if (!credentialId.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a credential ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const credential = credentials.find(c => c.id === credentialId.trim());
    
    if (credential && credential.status === 'verified') {
      setVerificationResult({
        isValid: true,
        credential,
      });
      toast({
        title: "Verification Successful",
        description: "Credential is authentic and verified",
      });
    } else {
      setVerificationResult({
        isValid: false,
      });
      toast({
        title: "Verification Failed",
        description: "Credential not found or not verified",
        variant: "destructive",
      });
    }

    setIsVerifying(false);
  };

  const handleScanQR = () => {
    toast({
      title: "QR Scanner",
      description: "QR code scanning will be available in mobile app",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Credentials</h1>
          <p className="text-muted-foreground">Instantly verify candidate credentials and authenticity</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Verification Interface */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-card">
              <div className="p-6">
                <Tabs defaultValue="manual">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                    <TabsTrigger value="qr">QR Code</TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual">
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Enter Credential ID or Blockchain Hash
                        </label>
                        <div className="flex gap-3">
                          <Input
                            placeholder="e.g., CRED001 or 0x7f83b1657..."
                            value={credentialId}
                            onChange={(e) => setCredentialId(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={handleVerify} disabled={isVerifying} className="gap-2">
                            <Search className="h-4 w-4" />
                            {isVerifying ? 'Verifying...' : 'Verify'}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Try: CRED001, CRED002, or CRED004 for demo
                        </p>
                      </div>

                      {/* Verification Result */}
                      {verificationResult && (
                        <div className="mt-8">
                          {verificationResult.isValid ? (
                            <div className="space-y-6">
                              <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/20">
                                <div className="rounded-full bg-success/20 p-2">
                                  <CheckCircle2 className="h-6 w-6 text-success" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-success">Credential Verified</h3>
                                  <p className="text-sm text-muted-foreground">
                                    This credential is authentic and verified on blockchain
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm text-muted-foreground">Credential Name</label>
                                  <p className="font-semibold">{verificationResult.credential.name}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm text-muted-foreground">Issuer</label>
                                    <p className="font-medium">{verificationResult.credential.issuer}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm text-muted-foreground">NSQF Level</label>
                                    <Badge variant="secondary">
                                      Level {verificationResult.credential.nsqfLevel}
                                    </Badge>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm text-muted-foreground">Issue Date</label>
                                  <p className="font-medium">
                                    {new Date(verificationResult.credential.issueDate).toLocaleDateString('en-IN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </p>
                                </div>

                                <div>
                                  <label className="text-sm text-muted-foreground">Skills Covered</label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {verificationResult.credential.skills.map((skill: string, idx: number) => (
                                      <Badge key={idx} variant="outline">{skill}</Badge>
                                    ))}
                                  </div>
                                </div>

                                {verificationResult.credential.blockchainHash && (
                                  <div>
                                    <label className="text-sm text-muted-foreground">Blockchain Hash</label>
                                    <div className="flex items-center gap-2 mt-1">
                                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 overflow-x-auto">
                                        {verificationResult.credential.blockchainHash}
                                      </code>
                                      <Badge className="bg-success/10 text-success gap-1">
                                        <Shield className="h-3 w-3" />
                                        Verified
                                      </Badge>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                              <div className="rounded-full bg-destructive/20 p-2">
                                <XCircle className="h-6 w-6 text-destructive" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-destructive">Verification Failed</h3>
                                <p className="text-sm text-muted-foreground">
                                  Credential not found or not verified in the system
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="qr">
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Scan className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">QR Code Scanner</h3>
                      <p className="text-muted-foreground mb-6">
                        Scan candidate's QR code to instantly verify their credentials
                      </p>
                      <Button onClick={handleScanQR} className="gap-2">
                        <Scan className="h-4 w-4" />
                        Open Scanner
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Available in mobile app
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Verification Features
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Blockchain-backed authenticity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Instant verification results</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>NSQF level mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                    <span>Fraud detection system</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="border-none shadow-card bg-gradient-hero text-white">
              <div className="p-6">
                <Award className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Bulk Verification</h3>
                <p className="text-sm text-white/80 mb-4">
                  Verify multiple credentials at once with our bulk verification tool
                </p>
                <Button 
                  className="w-full bg-white text-primary hover:bg-white/90"
                  onClick={() => window.location.href = '/employer-bulk-verify'}
                >
                  Try Bulk Verify
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerVerify;
