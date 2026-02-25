'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Notification from '../../components/Notification';
import ConfirmationDialog from '../../components/ConfirmationDialog';

export default function ServiceTimesAdmin() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serviceTimes, setServiceTimes] = useState([]);
  const [formData, setFormData] = useState({
    service_name: '',
    time: '',
    day_of_week: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState({
    message: '',
    title: '',
    type: 'success',
    show: false
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin');
      return;
    }
    setUser(user);
    setLoading(false);
  }, [router]);

  // Check authentication on component mount
  useEffect(() => {
    checkUser();
    fetchServiceTimes();
  }, [checkUser]);

  const fetchServiceTimes = async () => {
    const { data, error } = await supabase
      .from('service_times')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching service times:', error);
    } else {
      setServiceTimes(data || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setNotification({ 
        title: 'Authentication Error',
        message: 'You must be logged in to perform this action', 
        type: 'error', 
        show: true 
      });
      return;
    }
    
    let error;
    
    if (editingId) {
      // Update existing service time
      const { error: updateError } = await supabase
        .from('service_times')
        .update(formData)
        .eq('id', editingId);
      error = updateError;
    } else {
      // Check if service already exists
      const { data: existingService } = await supabase
        .from('service_times')
        .select('id')
        .eq('service_name', formData.service_name)
        .single();
      
      if (existingService) {
        // Update existing service
        const { error: updateError } = await supabase
          .from('service_times')
          .update(formData)
          .eq('id', existingService.id);
        error = updateError;
      } else {
        // Insert new service time
        const { error: insertError } = await supabase
          .from('service_times')
          .insert([formData]);
        error = insertError;
      }
    }

    if (error) {
      console.error('Error updating service time:', error);
      if (error.code === '42501') {
        setNotification({ 
          title: 'Permission Error',
          message: 'Permission denied. Please check your Row Level Security settings in Supabase.', 
          type: 'error', 
          show: true 
        });
      } else {
        setNotification({ 
          title: 'Error',
          message: 'Error updating service time', 
          type: 'error', 
          show: true 
        });
      }
    } else {
      setNotification({ 
        title: 'Success!',
        message: 'Service time updated successfully!', 
        type: 'success', 
        show: true 
      });
      setFormData({ service_name: '', time: '', day_of_week: '' });
      setEditingId(null);
      fetchServiceTimes();
    }
  };

  const handleEdit = (service) => {
    setFormData({
      service_name: service.service_name,
      time: service.time,
      day_of_week: service.day_of_week
    });
    setEditingId(service.id);
  };

  const handleDelete = async (id) => {
    setServiceToDelete(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    const { error } = await supabase
      .from('service_times')
      .delete()
      .eq('id', serviceToDelete);

    if (error) {
      console.error('Error deleting service time:', error);
      setNotification({ 
        title: 'Error',
        message: 'Error deleting service time', 
        type: 'error', 
        show: true 
      });
    } else {
      setNotification({ 
        title: 'Success!',
        message: 'Service time deleted successfully!', 
        type: 'success', 
        show: true 
      });
      fetchServiceTimes();
    }
    setShowConfirmation(false);
    setServiceToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setServiceToDelete(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* Header */}
      <section className="w-full bg-custom-gray text-white py-8">
        <div className="w-3/4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Service Times Admin</h1>
              <p className="text-lg">Manage your church service times</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="bg-white text-custom-gray px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-white text-custom-gray px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-3/4 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Add Service Times Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-custom-gray">Add Service Time</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service *
                </label>
                <select
                  required
                  value={formData.service_name}
                  onChange={(e) => setFormData({...formData, service_name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-gray focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="Sunday Morning">Sunday Morning</option>
                  <option value="Sunday Evening">Sunday Evening</option>
                  <option value="Wednesday Evening">Wednesday Evening</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day of Week *
                </label>
                <select
                  required
                  value={formData.day_of_week}
                  onChange={(e) => setFormData({...formData, day_of_week: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-gray focus:border-transparent"
                >
                  <option value="">Select a day</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Wednesday">Wednesday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="text"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-gray focus:border-transparent"
                  placeholder="e.g., 12:00 PM"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-custom-gray text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-200"
              >
                Add Service Time
              </button>
            </form>
          </div>

          {/* Current Service Times */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-custom-gray">Current Service Times</h2>
            
            <div className="space-y-4">
              {serviceTimes.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No service times configured</p>
              ) : (
                serviceTimes.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{service.service_name}</h3>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                                         <div className="text-sm text-gray-600 space-y-1">
                       <p><strong>Day:</strong> {service.day_of_week}</p>
                       <p><strong>Time:</strong> {service.time}</p>
                     </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How This Works:</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Service times are stored in your Supabase database</li>
            <li>• Updates are saved immediately to the database</li>
            <li>• Your website will automatically display the updated times</li>
            <li>• Only authenticated admins can access this page</li>
            <li>• Changes are reflected across your entire website</li>
          </ul>
        </div>
      </div>
      {notification.show && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          isVisible={notification.show}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
             <ConfirmationDialog
         isVisible={showConfirmation}
         onConfirm={handleConfirmDelete}
         onCancel={handleCancelDelete}
         title="Confirm Deletion"
         message="Are you sure you want to delete this service time? This action cannot be undone."
         confirmText="Delete"
         cancelText="Cancel"
         type="danger"
       />
    </main>
  );
} 