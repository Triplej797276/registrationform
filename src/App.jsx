import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import from your Firebase config
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    profession: '',
    feedback: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  // Real-time email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'email') {
      setEmailError(value && !validateEmail(value) ? 'Please enter a valid email address' : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) return;

    setLoading(true);
    setMessage('');

    try {
      // Save to a unique document in 'events' collection
      await setDoc(doc(db, 'events', `registered_user_${Date.now()}`), {
        ...formData,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        project: 'MHC ERP'
      });
      
      setMessage('Registration submitted successfully to MHC ERP Event!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        profession: '',
        feedback: ''
      });
      setEmailError('');
    } catch (error) {
      console.error('Error saving to MHC ERP Firestore: ', error);
      setMessage('Error: Failed to submit registration. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      profession: '',
      feedback: ''
    });
    setEmailError('');
    setMessage('');
  };

  const professionOptions = [
    { value: '', label: 'Select a profession' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Student', label: 'Student' },
    { value: 'Business Owner', label: 'Business Owner' },
    { value: 'Software Developer', label: 'Software Developer' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-white">
        <h1 className="text-2xl">MHKC Event Registration</h1>
        {/* <p className="text-sm text-gray-500">Join our exclusive event to explore MHC ERP solutions!</p> */}
        
        {message && (
          <div 
            className={`message ${message.includes('successfully') ? 'bg-green-100' : 'bg-red-100'}`} 
            aria-live="polite"
            role="alert"
          >
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your full name"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your email"
                required
                aria-required="true"
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <p id="email-error" className="text-red-600">{emailError}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="phone" className="text-sm">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter phone number"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="text-sm">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter full address"
                required
                aria-required="true"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="text-sm">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="City"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="district" className="text-sm">District</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="District"
                  required
                  aria-required="true"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="profession" className="text-sm">Profession</label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                aria-required="true"
              >
                {professionOptions.map(option => (
                  <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="feedback" className="text-sm">Feedback</label>
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows="4"
                placeholder="Would you like to arrange or join this type of program?"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                type="submit"
                disabled={loading || emailError}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Submitting to MHC ERP...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
              <button
                type="button"
                onClick={handleClearForm}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-200"
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;