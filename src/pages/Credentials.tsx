import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCredentials } from '@/contexts/CredentialContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Plus, CheckCircle2, Clock, AlertCircle, Download, Eye, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';

const Credentials = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { credentials, addCredential, deleteCredential, getCredentialsByUser } = useCredentials();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all');

  const userCredentials = user ? getCredentialsByUser(user.id) : [];
  const filteredCredentials = filter === 'all' 
    ? userCredentials 
    : userCredentials.filter(c => c.status === filter);

  const [newCredential, setNewCredential] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    nsqfLevel: 5,
    category: '',
    skills: '',
    description: '',
    status: 'pending' as const,
  });

  const handleAddCredential = () => {
    if (!newCredential.name || !newCredential.issuer) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addCredential({
      ...newCredential,
      skills: newCredential.skills.split(',').map(s => s.trim()),
    });

    toast({
      title: "Credential Added",
      description: "Your credential has been added for verification",
    });

    setNewCredential({
      name: '',
      issuer: '',
      issueDate: '',
      nsqfLevel: 5,
      category: '',
      skills: '',
      description: '',
      status: 'pending',
    });
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteCredential(id);
    toast({
      title: "Credential Deleted",
      description: "The credential has been removed from your profile",
    });
  };

  const handleImportFromDigiLocker = () => {
    toast({
      title: "DigiLocker Import",
      description: "DigiLocker integration coming soon! This will auto-fetch your certificates.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('nav.credentials')}</h1>
          <p className="text-muted-foreground">Manage and verify your professional credentials</p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex flex-wrap gap-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                {t('credentials.add')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('credentials.add')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">{t('credentials.name')} *</Label>
                  <Input
                    id="name"
                    value={newCredential.name}
                    onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                    placeholder="e.g., Machine Learning Specialization"
                  />
                </div>
                <div>
                  <Label htmlFor="issuer">{t('credentials.issuer')} *</Label>
                  <Input
                    id="issuer"
                    value={newCredential.issuer}
                    onChange={(e) => setNewCredential({ ...newCredential, issuer: e.target.value })}
                    placeholder="e.g., Coursera - Stanford University"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="issueDate">{t('credentials.issueDate')}</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={newCredential.issueDate}
                      onChange={(e) => setNewCredential({ ...newCredential, issueDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nsqfLevel">{t('credentials.nsqfLevel')}</Label>
                    <Select
                      value={String(newCredential.nsqfLevel)}
                      onValueChange={(value) => setNewCredential({ ...newCredential, nsqfLevel: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                          <SelectItem key={level} value={String(level)}>
                            Level {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newCredential.category}
                    onChange={(e) => setNewCredential({ ...newCredential, category: e.target.value })}
                    placeholder="e.g., Technology, Marketing, Healthcare"
                  />
                </div>
                <div>
                  <Label htmlFor="skills">{t('credentials.skills')} (comma-separated)</Label>
                  <Input
                    id="skills"
                    value={newCredential.skills}
                    onChange={(e) => setNewCredential({ ...newCredential, skills: e.target.value })}
                    placeholder="e.g., Python, Machine Learning, TensorFlow"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCredential.description}
                    onChange={(e) => setNewCredential({ ...newCredential, description: e.target.value })}
                    placeholder="Brief description of the credential"
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddCredential} className="w-full">
                  Add Credential
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2" onClick={handleImportFromDigiLocker}>
            <Download className="h-4 w-4" />
            {t('credentials.import')}
          </Button>

          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            {t('credentials.upload')}
          </Button>
        </div>

        {/* Filters */}
        <Tabs
          value={filter}
          onValueChange={(value) => {
            if (value === 'all' || value === 'verified' || value === 'pending') {
              setFilter(value);
            }
          }}
          className="mb-6"
        >
          <TabsList>
            <TabsTrigger value="all">All ({userCredentials.length})</TabsTrigger>
            <TabsTrigger value="verified">
              Verified ({userCredentials.filter(c => c.status === 'verified').length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({userCredentials.filter(c => c.status === 'pending').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Credentials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCredentials.map((credential) => (
            <Card key={credential.id} className="border-none shadow-card">
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {credential.status === 'verified' ? (
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    ) : credential.status === 'pending' ? (
                      <Clock className="h-6 w-6 text-warning" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    )}
                  </div>
                  <Badge
                    className={
                      credential.status === 'verified'
                        ? 'bg-success/10 text-success'
                        : credential.status === 'pending'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-destructive/10 text-destructive'
                    }
                  >
                    {credential.status}
                  </Badge>
                </div>

                <h3 className="font-semibold mb-1 line-clamp-2">{credential.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{credential.issuer}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">NSQF Level</span>
                    <Badge variant="secondary">Level {credential.nsqfLevel}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Issued</span>
                    <span className="font-medium">{new Date(credential.issueDate).toLocaleDateString()}</span>
                  </div>
                  {credential.blockchainHash && (
                    <div className="text-xs text-muted-foreground">
                      Hash: {credential.blockchainHash.substring(0, 20)}...
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {credential.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {credential.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{credential.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => handleDelete(credential.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCredentials.length === 0 && (
          <Card className="border-none shadow-card p-12 text-center">
            <p className="text-muted-foreground">No credentials found. Add your first credential to get started!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Credentials;
