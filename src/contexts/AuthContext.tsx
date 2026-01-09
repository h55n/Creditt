import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'employer';
  aadhaarId?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'learner' | 'employer') => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: 'learner' | 'employer', aadhaarId?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy user data
const DUMMY_USERS = {
  learners: [
    { id: 'L001', name: 'Rahul Kumar', email: 'rahul@example.com', password: 'demo123', role: 'learner' as const, aadhaarId: '1234-5678-9012', phone: '+91 98765 43210' },
    { id: 'L002', name: 'Priya Sharma', email: 'priya@example.com', password: 'demo123', role: 'learner' as const, aadhaarId: '9876-5432-1098', phone: '+91 87654 32109' },
  ],
  employers: [
    { id: 'E001', name: 'TCS Recruiter', email: 'recruiter@tcs.com', password: 'demo123', role: 'employer' as const },
    { id: 'E002', name: 'Infosys HR', email: 'hr@infosys.com', password: 'demo123', role: 'employer' as const },
  ]
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('credeed_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'learner' | 'employer'): Promise<boolean> => {
    const users = role === 'learner' ? DUMMY_USERS.learners : DUMMY_USERS.employers;
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('credeed_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, role: 'learner' | 'employer', aadhaarId?: string): Promise<boolean> => {
    // Check if user already exists
    const allUsers = [...DUMMY_USERS.learners, ...DUMMY_USERS.employers];
    if (allUsers.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: role === 'learner' ? `L${Date.now()}` : `E${Date.now()}`,
      name,
      email,
      role,
      aadhaarId,
    };

    setUser(newUser);
    localStorage.setItem('credeed_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('credeed_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
