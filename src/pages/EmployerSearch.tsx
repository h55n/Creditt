import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, Briefcase, Award } from 'lucide-react';
import { useCredentials } from '@/contexts/CredentialContext';
import Navbar from '@/components/Navbar';

const EmployerSearch = () => {
  const { credentials } = useCredentials();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  // Get unique skills and learners
  const allSkills = Array.from(new Set(credentials.flatMap(c => c.skills)));
  const learnerGroups = credentials.reduce((acc, cred) => {
    if (!acc[cred.userId]) {
      acc[cred.userId] = {
        userId: cred.userId,
        name: `Candidate ${cred.userId.slice(0, 4)}`,
        credentials: [],
        skills: new Set<string>(),
        maxLevel: 0,
      };
    }
    acc[cred.userId].credentials.push(cred);
    cred.skills.forEach(skill => acc[cred.userId].skills.add(skill));
    acc[cred.userId].maxLevel = Math.max(acc[cred.userId].maxLevel, cred.nsqfLevel);
    return acc;
  }, {} as Record<string, any>);

  const learners = Object.values(learnerGroups);

  // Filter learners
  const filteredLearners = learners.filter(learner => {
    const matchesSearch = searchQuery === '' || 
      Array.from(learner.skills).some((skill: unknown) => 
        (skill as string).toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesLevel = selectedLevel === 'all' || learner.maxLevel === parseInt(selectedLevel);
    const matchesSkill = selectedSkill === 'all' || learner.skills.has(selectedSkill);
    return matchesSearch && matchesLevel && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Talent</h1>
          <p className="text-muted-foreground">Find qualified candidates based on skills and credentials</p>
        </div>

        {/* Search Filters */}
        <Card className="border-none shadow-card p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Search Skills</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">NSQF Level</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                    <SelectItem key={level} value={level.toString()}>
                      Level {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Skill Filter</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  {allSkills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Found {filteredLearners.length} candidates
          </p>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLearners.map((learner) => (
            <Card key={learner.userId} className="border-none shadow-card hover:shadow-elevated transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-semibold text-lg">
                      {learner.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{learner.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {learner.userId.slice(0, 8)}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    Level {learner.maxLevel}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>{learner.credentials.length} Credentials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{learner.skills.size} Skills</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-muted-foreground mb-2 block">Top Skills</label>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(learner.skills).slice(0, 4).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {String(skill)}
                      </Badge>
                    ))}
                    {learner.skills.size > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{learner.skills.size - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/employer-candidate/${learner.userId}`)}
                >
                  View Full Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredLearners.length === 0 && (
          <Card className="border-none shadow-card p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmployerSearch;
