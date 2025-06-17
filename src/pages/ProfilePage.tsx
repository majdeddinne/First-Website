import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/auth';
import Button from '../components/ui/Button';
import { User, Settings, LogOut, Music, CreditCard, History, Bell, Shield, Edit3 } from 'lucide-react';
import { getOrderHistory, getActiveSubscription } from '../lib/stripe';
import TechnoPreferencesPage from './TechnoPreferencesPage';
import CosmicBackground from '../components/ui/CosmicBackground';


const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    avatar_url: '',
    bio: '',
    location: '',
    website: '',
  });

  useEffect(() => {
    fetchProfile();
    fetchBills(); // Fetch bills
    fetchSubscription();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
        setFormData({
          username: profile?.username || '',
          avatar_url: profile?.avatar_url || '',
          bio: profile?.bio || '',
          location: profile?.location || '',
          website: profile?.website || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBills = async () => {
    try {
      const response = await fetch('/api/billing/invoices');
      const bills = await response.json();
      setOrderHistory(bills);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  const fetchOrderHistory = async () => {
    try {
      const orders = await getOrderHistory();
      setOrderHistory(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchSubscription = async () => {
    try {
      const sub = await getActiveSubscription();
      setSubscription(sub);
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', profile.id);

      if (error) throw error;
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpdatePassword = async () => {
    // Implement password update logic here
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'purchases', label: 'Purchases', icon: Music },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'techno-preferences', label: 'Techno Preferences' }, // Removed icon
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neon-cyan"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <CosmicBackground />
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-dark-bg border-r border-dark-border">
                  <div className="p-6">
                    <div className="text-center mb-6">
                    </div>

                    <nav className="space-y-2">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-neon-cyan/20 text-neon-cyan'
                              : tab.id === 'techno-preferences'
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white'
                              : 'text-gray-400 hover:bg-dark-border hover:text-white'
                          }`}
                        >
                          {tab.icon && <tab.icon size={18} />} {/* Render icon only if it exists */}
                          <span className="truncate">{tab.label}</span> {/* Ensure text stays on one line */}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                  {activeTab === 'profile' && (
                    <div>
                      {/* Profile Tab Title */}
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white">
                          Profile Information
                        </h3>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(!isEditing)}
                          className="flex items-center gap-2"
                        >
                          <Edit3 size={18} />
                          {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                      </div>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            {/* Labels in Profile Tab */}
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Username
                            </label>
                            <input
                              type="text"
                              value={formData.username}
                              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                              disabled={!isEditing}
                              className="w-full bg-dark-bg border border-dark-border text-white rounded-lg px-4 py-2"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Location
                            </label>
                            <select
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              disabled={!isEditing}
                              className="w-full bg-dark-bg border border-dark-border text-white rounded-lg px-4 py-2"
                            >
                              <option value="" disabled>
                                Select your country
                              </option>
                              <option value="Afghanistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="Andorra">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Australia">Australia</option>
                              <option value="Austria">Austria</option>
                              <option value="Azerbaijan">Azerbaijan</option>
                              <option value="Bahamas">Bahamas</option>
                              <option value="Bahrain">Bahrain</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Barbados">Barbados</option>
                              <option value="Belarus">Belarus</option>
                              <option value="Belgium">Belgium</option>
                              <option value="Belize">Belize</option>
                              <option value="Benin">Benin</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Bolivia">Bolivia</option>
                              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina Faso">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cabo Verde">Cabo Verde</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Canada">Canada</option>
                              <option value="Central African Republic">Central African Republic</option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
                              <option value="Costa Rica">Costa Rica</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czechia (Czech Republic)">Czechia (Czech Republic)</option>
                              <option value="Denmark">Denmark</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican Republic">Dominican Republic</option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El Salvador">El Salvador</option>
                              <option value="Equatorial Guinea">Equatorial Guinea</option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Eswatini (fmr. Swaziland)">Eswatini (fmr. Swaziland)</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="Gabon">Gabon</option>
                              <option value="Gambia">Gambia</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Germany">Germany</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Greece">Greece</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-Bissau">Guinea-Bissau</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Holy See">Holy See</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kiribati">Kiribati</option>
                              <option value="Korea (North)">Korea (North)</option>
                              <option value="Korea (South)">Korea (South)</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">Liechtenstein</option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Marshall Islands">Marshall Islands</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Micronesia">Micronesia</option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montenegro">Montenegro</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar (formerly Burma)">Myanmar (formerly Burma)</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nauru">Nauru</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherlands">Netherlands</option>
                              <option value="New Zealand">New Zealand</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="North Macedonia">North Macedonia</option>
                              <option value="Norway">Norway</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="free Palestine">free Palestine</option>
                              <option value="Panama">Panama</option>
                              <option value="Papua New Guinea">Papua New Guinea</option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Philippines">Philippines</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                              <option value="Saint Lucia">Saint Lucia</option>
                              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                              <option value="Samoa">Samoa</option>
                              <option value="San Marino">San Marino</option>
                              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                              <option value="Saudi Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon Islands">Solomon Islands</option>
                              <option value="Somalia">Somalia</option>
                              <option value="South Africa">South Africa</option>
                              <option value="South Sudan">South Sudan</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Timor-Leste">Timor-Leste</option>
                              <option value="Togo">Togo</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Tuvalu">Tuvalu</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="United Arab Emirates">United Arab Emirates</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="United States of America">United States of America</option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Bio
                            </label>
                            <textarea
                              value={formData.bio}
                              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                              disabled={!isEditing}
                              rows={4}
                              className="w-full bg-dark-bg border border-dark-border text-white rounded-lg px-4 py-2"
                            />
                          </div>
                        </div>

                        {isEditing && (
                          <div className="flex justify-end gap-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                              className="hover:bg-dark-border hover:text-neon-cyan"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdateProfile}
                              className="relative font-orbitron font-medium transition-all rounded focus:outline-none group overflow-hidden bg-toxic-green text-white hover:bg-toxic-green/90 shadow-[0_0_15px_rgba(255,255,255,0.7)] px-4 py-2 text-base border border-neon-cyan"
                            >
                              Save Changes
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'translateX(90.1333%) translateZ(0px)' }}></div>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'purchases' && (
                    <div>
                      {/* Purchases Tab Title */}
                      <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-8">
                        Purchase History
                      </h3>
                      <div className="space-y-4">
                        {orderHistory.map((order: any) => (
                          <div
                            key={order.order_id}
                            className="bg-dark-bg border border-dark-border rounded-lg p-4"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-neon-cyan">Order #{order.order_id}</p>
                                <p className="text-gray-400">
                                  {new Date(order.order_date).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-white">
                                  {(order.amount_total / 100).toFixed(2)} {order.currency.toUpperCase()}
                                </p>
                                <p className={`text-sm ${
                                  order.order_status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                                }`}>
                                  {order.order_status}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'billing' && (
                    <div>
                      {/* Remove this */}
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div>
                      {/* Notifications Tab Title */}
                      <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-8">
                        Notification Settings
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white">Email Notifications</h4>
                            <p className="text-gray-400">Receive updates about your purchases</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white">Marketing Emails</h4>
                            <p className="text-gray-400">Get notified about new releases</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-dark-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-cyan"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div>
                      {/* Security Tab Title */}
                      <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-8">
                        Security Settings
                      </h3>
                      <div className="space-y-6">
                        <div>
                          {/* Subtitles in Security Tab */}
                          <h4 className="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-4">
                            Change Password
                          </h4>
                          <div className="space-y-4">
                            <input
                              type="password"
                              placeholder="Current Password"
                              className="w-full bg-dark-bg border border-dark-border text-white rounded-lg px-4 py-2"
                            />
                            <input
                              type="password"
                              placeholder="New Password"
                              className="w-full bg-dark-bg border border-dark-border text-white rounded-lg px-4 py-2"
                            />
                            <input
                              type="password"
                              placeholder="Confirm New Password"
                              className="w-full bg-dark-bg border border-dark-border text-white rounded-lg px-4 py-2"
                            />
                            <Button
                              onClick={handleUpdatePassword}
                              className="relative font-orbitron font-medium transition-all rounded focus:outline-none group overflow-hidden bg-toxic-green text-white hover:bg-toxic-green/90 shadow-[0_0_15px_rgba(255,255,255,0.7)] px-4 py-2 text-base border border-neon-cyan"
                            >
                              Update Password
                              <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                style={{ transform: 'translateX(90.1333%) translateZ(0px)' }}
                              ></div>
                            </Button>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-dark-border">
                          <h4 className="text-lg font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-4">
                            Danger Zone
                          </h4>
                          <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'techno-preferences' && (
                    <div>
                      {/* Techno Preferences Tab Content */}
                      <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-300 to-white mb-8">
                        
                      </h3>
                      <TechnoPreferencesPage />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;