import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Upload, Download, FileText } from 'lucide-react';
import { useCredentials } from '@/contexts/CredentialContext';
import Navbar from '@/components/Navbar';
import { toast } from '@/hooks/use-toast';

const EmployerBulkVerify = () => {
  const { credentials } = useCredentials();
  const [credentialIds, setCredentialIds] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleBulkVerify = async () => {
    if (!credentialIds.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter at least one credential ID",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const ids = credentialIds.split('\n').map(id => id.trim()).filter(id => id);
    const verificationResults = ids.map(id => {
      const credential = credentials.find(c => c.id === id);
      return {
        id,
        isValid: credential && credential.status === 'verified',
        credential: credential || null,
      };
    });

    setResults(verificationResults);
    setIsVerifying(false);

    const validCount = verificationResults.filter(r => r.isValid).length;
    toast({
      title: "Bulk Verification Complete",
      description: `${validCount} out of ${ids.length} credentials verified`,
    });
  };

  const handleExport = () => {
    const csv = [
      ['Credential ID', 'Status', 'Name', 'Issuer', 'NSQF Level'].join(','),
      ...results.map(r => [
        r.id,
        r.isValid ? 'Verified' : 'Not Found',
        r.credential?.name || '-',
        r.credential?.issuer || '-',
        r.credential?.nsqfLevel || '-',
      ].join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-verification-results.csv';
    a.click();

    toast({
      title: "Export Successful",
      description: "Results exported to CSV",
    });
  };

  const validCount = results.filter(r => r.isValid).length;
  const invalidCount = results.length - validCount;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Bulk Verification</h1>
          <p className="text-muted-foreground">Verify multiple credentials at once</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Enter Credential IDs
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter one credential ID per line. You can paste up to 100 IDs at once.
                </p>
                <Textarea
                  placeholder="CRED001&#10;CRED002&#10;CRED003"
                  value={credentialIds}
                  onChange={(e) => setCredentialIds(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-muted-foreground">
                    {credentialIds.split('\n').filter(id => id.trim()).length} IDs entered
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload CSV
                    </Button>
                    <Button onClick={handleBulkVerify} disabled={isVerifying} className="gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      {isVerifying ? 'Verifying...' : 'Verify All'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            {results.length > 0 && (
              <Card className="border-none shadow-card">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Verification Results</h2>
                    <Button variant="outline" onClick={handleExport} className="gap-2">
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-success" />
                      <span className="text-sm">Verified: {validCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-sm">Not Found: {invalidCount}</span>
                    </div>
                  </div>
                </div>
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {results.map((result, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${result.isValid ? 'bg-success/10' : 'bg-destructive/10'}`}>
                          {result.isValid ? (
                            <CheckCircle2 className="h-5 w-5 text-success" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">
                              {result.id}
                            </code>
                            <Badge variant={result.isValid ? 'default' : 'destructive'}>
                              {result.isValid ? 'Verified' : 'Not Found'}
                            </Badge>
                          </div>
                          {result.credential && (
                            <div className="text-sm space-y-1">
                              <p className="font-medium">{result.credential.name}</p>
                              <p className="text-muted-foreground">
                                {result.credential.issuer} • Level {result.credential.nsqfLevel}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">How It Works</h3>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      1
                    </span>
                    <span>Enter credential IDs (one per line) or upload a CSV file</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      2
                    </span>
                    <span>Click "Verify All" to start bulk verification</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                      3
                    </span>
                    <span>Review results and export to CSV for your records</span>
                  </li>
                </ol>
              </div>
            </Card>

            <Card className="border-none shadow-card bg-gradient-secondary text-white">
              <div className="p-6">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-sm text-white/80 mb-4">
                  Contact our support team for assistance with bulk verification
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerBulkVerify;
