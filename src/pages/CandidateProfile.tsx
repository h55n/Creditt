import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award, CheckCircle2, Calendar, Building, Mail, Phone } from 'lucide-react';
import { useCredentials } from '@/contexts/CredentialContext';
import Navbar from '@/components/Navbar';

const CandidateProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { credentials } = useCredentials();

  const candidateCredentials = credentials.filter(c => c.userId === userId);
  
  if (candidateCredentials.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="border-none shadow-card p-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Candidate not found</h3>
            <p className="text-muted-foreground mb-4">
              No credentials found for this candidate
            </p>
            <Button onClick={() => navigate('/employer-search')}>
              Back to Search
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const allSkills = Array.from(new Set(candidateCredentials.flatMap(c => c.skills)));
  const maxLevel = Math.max(...candidateCredentials.map(c => c.nsqfLevel));
  const verifiedCount = candidateCredentials.filter(c => c.status === 'verified').length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/employer-search')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="border-none shadow-card">
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="h-24 w-24 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-3xl">
                    C{userId?.slice(0, 1)}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">Candidate {userId?.slice(0, 8)}</h1>
                    <p className="text-muted-foreground mb-4">Professional Profile</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-success/10 text-success">
                        {verifiedCount} Verified
                      </Badge>
                      <Badge variant="secondary">
                        NSQF Level {maxLevel}
                      </Badge>
                      <Badge variant="outline">
                        {allSkills.length} Skills
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{candidateCredentials.length}</div>
                    <div className="text-sm text-muted-foreground">Credentials</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{verifiedCount}</div>
                    <div className="text-sm text-muted-foreground">Verified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{allSkills.length}</div>
                    <div className="text-sm text-muted-foreground">Skills</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Skills & Competencies</h2>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm py-1.5 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Credentials */}
            <Card className="border-none shadow-card">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Credentials & Certifications</h2>
                <p className="text-sm text-muted-foreground">Verified credentials on blockchain</p>
              </div>
              <div className="divide-y">
                {candidateCredentials.map((cred) => (
                  <div key={cred.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        cred.status === 'verified' ? 'bg-success/10' : 'bg-muted'
                      }`}>
                        {cred.status === 'verified' ? (
                          <CheckCircle2 className="h-6 w-6 text-success" />
                        ) : (
                          <Award className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{cred.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {cred.issuer}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(cred.issueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">NSQF Level {cred.nsqfLevel}</Badge>
                          {cred.status === 'verified' && (
                            <Badge className="bg-success/10 text-success">Verified</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
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
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-none shadow-card">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Contact Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full gap-2 justify-start">
                    <Mail className="h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full gap-2 justify-start">
                    <Phone className="h-4 w-4" />
                    Request Contact
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-card bg-gradient-hero text-white">
              <div className="p-6">
                <Award className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Verified Profile</h3>
                <p className="text-sm text-white/80 mb-4">
                  All credentials are verified on blockchain
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90">
                  Download Report
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
