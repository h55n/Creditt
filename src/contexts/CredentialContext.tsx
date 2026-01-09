import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface Credential {
  id: string;
  userId: string;
  name: string;
  issuer: string;
  issueDate: string;
  nsqfLevel: number;
  status: 'verified' | 'pending' | 'rejected';
  category: string;
  skills: string[];
  blockchainHash?: string;
  certificateUrl?: string;
  description?: string;
}

interface CredentialContextType {
  credentials: Credential[];
  addCredential: (credential: Omit<Credential, 'id' | 'userId' | 'blockchainHash'>) => void;
  updateCredential: (id: string, updates: Partial<Credential>) => void;
  deleteCredential: (id: string) => void;
  getCredentialsByUser: (userId: string) => Credential[];
  verifyCredential: (id: string) => Promise<boolean>;
}

const CredentialContext = createContext<CredentialContextType | undefined>(undefined);

// Dummy credentials data
const INITIAL_CREDENTIALS: Credential[] = [
  {
    id: 'CRED001',
    userId: 'L001',
    name: 'Machine Learning Specialization',
    issuer: 'Coursera - Stanford University',
    issueDate: '2024-02-15',
    nsqfLevel: 7,
    status: 'verified',
    category: 'Technology',
    skills: ['Machine Learning', 'Python', 'TensorFlow', 'Deep Learning'],
    blockchainHash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    description: 'Advanced machine learning techniques and algorithms'
  },
  {
    id: 'CRED002',
    userId: 'L001',
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    issueDate: '2024-01-28',
    nsqfLevel: 6,
    status: 'verified',
    category: 'Cloud Computing',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Infrastructure'],
    blockchainHash: '0x3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    description: 'Cloud architecture and AWS services expertise'
  },
  {
    id: 'CRED003',
    userId: 'L001',
    name: 'Digital Marketing Professional Certificate',
    issuer: 'Google',
    issueDate: '2024-01-10',
    nsqfLevel: 5,
    status: 'pending',
    category: 'Marketing',
    skills: ['SEO', 'Social Media Marketing', 'Analytics', 'Content Strategy'],
    description: 'Comprehensive digital marketing fundamentals'
  },
  {
    id: 'CRED004',
    userId: 'L001',
    name: 'Data Science with Python',
    issuer: 'NPTEL',
    issueDate: '2023-12-05',
    nsqfLevel: 6,
    status: 'verified',
    category: 'Data Science',
    skills: ['Python', 'Data Analysis', 'Statistics', 'Pandas', 'NumPy'],
    blockchainHash: '0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
    description: 'Python programming for data science applications'
  },
  {
    id: 'CRED005',
    userId: 'L001',
    name: 'Full Stack Web Development',
    issuer: 'freeCodeCamp',
    issueDate: '2023-11-20',
    nsqfLevel: 6,
    status: 'verified',
    category: 'Web Development',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'HTML/CSS'],
    blockchainHash: '0x9b74c9897bac770ffc029102a200c5de8d03e03b4ab9ceb0cb8c8b4c1f29e476',
    description: 'Full stack development with modern frameworks'
  },
];

export const CredentialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>(() => {
    const stored = localStorage.getItem('credeed_credentials');
    return stored ? JSON.parse(stored) : INITIAL_CREDENTIALS;
  });

  useEffect(() => {
    localStorage.setItem('credeed_credentials', JSON.stringify(credentials));
  }, [credentials]);

  const generateBlockchainHash = (credential: Partial<Credential>): string => {
    const data = JSON.stringify(credential);
    // Simple hash simulation (in production, use actual blockchain)
    return '0x' + Array.from(data)
      .reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0)
      .toString(16)
      .padStart(64, '0');
  };

  const addCredential = (credential: Omit<Credential, 'id' | 'userId' | 'blockchainHash'>) => {
    if (!user) return;

    const newCredential: Credential = {
      ...credential,
      id: `CRED${Date.now()}`,
      userId: user.id,
      blockchainHash: credential.status === 'verified' ? generateBlockchainHash(credential) : undefined,
    };

    setCredentials(prev => [...prev, newCredential]);
  };

  const updateCredential = (id: string, updates: Partial<Credential>) => {
    setCredentials(prev => prev.map(cred => {
      if (cred.id === id) {
        const updated = { ...cred, ...updates };
        if (updates.status === 'verified' && !updated.blockchainHash) {
          updated.blockchainHash = generateBlockchainHash(updated);
        }
        return updated;
      }
      return cred;
    }));
  };

  const deleteCredential = (id: string) => {
    setCredentials(prev => prev.filter(cred => cred.id !== id));
  };

  const getCredentialsByUser = (userId: string) => {
    return credentials.filter(cred => cred.userId === userId);
  };

  const verifyCredential = async (id: string): Promise<boolean> => {
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const credential = credentials.find(c => c.id === id);
    if (credential) {
      updateCredential(id, { 
        status: 'verified',
        blockchainHash: generateBlockchainHash(credential)
      });
      return true;
    }
    return false;
  };

  return (
    <CredentialContext.Provider value={{
      credentials,
      addCredential,
      updateCredential,
      deleteCredential,
      getCredentialsByUser,
      verifyCredential,
    }}>
      {children}
    </CredentialContext.Provider>
  );
};

export const useCredentials = () => {
  const context = useContext(CredentialContext);
  if (context === undefined) {
    throw new Error('useCredentials must be used within a CredentialProvider');
  }
  return context;
};
