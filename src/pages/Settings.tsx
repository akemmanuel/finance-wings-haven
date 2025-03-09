
import { useState } from "react";
import { Bell, Globe, Lock, User, CreditCard, Wallet, Save } from "lucide-react";
import Shell from "@/components/layout/Shell";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "accounts">("profile");
  
  // Profile settings state
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    currency: "USD",
    language: "English",
    theme: "light"
  });
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    transactions: true,
    marketing: false,
    security: true
  });
  
  // Security settings state
  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: "30min",
    loginAlerts: true
  });
  
  // Connected accounts state
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: "acc1", name: "Bank of America", type: "Checking", connected: true, lastSync: "Today" },
    { id: "acc2", name: "Chase", type: "Credit Card", connected: true, lastSync: "Yesterday" },
    { id: "acc3", name: "Fidelity", type: "Investment", connected: true, lastSync: "3 days ago" }
  ]);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock implementation for profile update
    console.log("Profile updated:", profile);
    // Show toast notification
    // toast({ title: "Profile updated", description: "Your profile has been successfully updated." });
  };
  
  const handleToggleAccount = (id: string) => {
    setConnectedAccounts(prev => 
      prev.map(account => 
        account.id === id 
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };
  
  return (
    <Shell>
      <div className="mb-8">
        <h1 className="font-medium text-2xl md:text-3xl text-balance tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>
      
      <div className="glass rounded-2xl p-6 animate-scale-in">
        {/* Tabs */}
        <div className="flex flex-wrap border-b border-border/50 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "px-4 py-2 flex items-center text-sm font-medium transition-colors border-b-2 -mb-[2px]",
              activeTab === "profile"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={cn(
              "px-4 py-2 flex items-center text-sm font-medium transition-colors border-b-2 -mb-[2px]",
              activeTab === "notifications"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={cn(
              "px-4 py-2 flex items-center text-sm font-medium transition-colors border-b-2 -mb-[2px]",
              activeTab === "security"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Lock className="h-4 w-4 mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab("accounts")}
            className={cn(
              "px-4 py-2 flex items-center text-sm font-medium transition-colors border-b-2 -mb-[2px]",
              activeTab === "accounts"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Linked Accounts
          </button>
        </div>
        
        {/* Profile Settings */}
        {activeTab === "profile" && (
          <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              <input
                type="text"
                className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  value={profile.currency}
                  onChange={(e) => setProfile({ ...profile, currency: e.target.value })}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                  value={profile.language}
                  onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Interface Theme</label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, theme: "light" })}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border border-border flex items-center justify-center",
                    profile.theme === "light" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}
                >
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-white mr-2"></div>
                    <span>Light</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, theme: "dark" })}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border border-border flex items-center justify-center",
                    profile.theme === "dark" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}
                >
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-gray-900 mr-2"></div>
                    <span>Dark</span>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, theme: "system" })}
                  className={cn(
                    "flex-1 py-3 px-4 rounded-lg border border-border flex items-center justify-center",
                    profile.theme === "system" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  )}
                >
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-gray-400 mr-2"></div>
                    <span>System</span>
                  </div>
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </form>
        )}
        
        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.email}
                      onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.push}
                      onChange={() => setNotifications({ ...notifications, push: !notifications.push })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Alert Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Transaction Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified about new transactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.transactions}
                      onChange={() => setNotifications({ ...notifications, transactions: !notifications.transactions })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified about security events</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.security}
                      onChange={() => setNotifications({ ...notifications, security: !notifications.security })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about products and services</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notifications.marketing}
                      onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
        
        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-medium mb-4">Account Security</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={security.twoFactor}
                      onChange={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium">Login Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive notifications for new login attempts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={security.loginAlerts}
                      onChange={() => setSecurity({ ...security, loginAlerts: !security.loginAlerts })}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="p-3 rounded-lg bg-secondary/30">
                  <p className="font-medium mb-2">Session Timeout</p>
                  <p className="text-sm text-muted-foreground mb-3">Automatically log out after a period of inactivity</p>
                  
                  <select
                    className="bg-white/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  >
                    <option value="never">Never</option>
                    <option value="15min">15 minutes</option>
                    <option value="30min">30 minutes</option>
                    <option value="1hour">1 hour</option>
                    <option value="4hours">4 hours</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Password</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="bg-secondary/50 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            
            <button
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
        
        {/* Linked Accounts */}
        {activeTab === "accounts" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="text-lg font-medium mb-4">Connected Financial Accounts</h3>
              
              <div className="space-y-4">
                {connectedAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center">
                      <div className="p-2 bg-white rounded-lg mr-3">
                        {account.type === "Checking" ? (
                          <Wallet className="h-5 w-5 text-primary" />
                        ) : account.type === "Credit Card" ? (
                          <CreditCard className="h-5 w-5 text-primary" />
                        ) : (
                          <Globe className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {account.type} • {account.connected ? `Last synced: ${account.lastSync}` : "Not connected"}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleToggleAccount(account.id)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-lg transition-colors",
                        account.connected 
                          ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                      )}
                    >
                      {account.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <button
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium flex items-center"
              >
                <Globe className="h-4 w-4 mr-2" />
                Connect New Account
              </button>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
};

export default Settings;
