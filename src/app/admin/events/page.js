'use client'
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Notification from '../../components/Notification';
import ConfirmationDialog from '../../components/ConfirmationDialog';

// Utility function to generate recurring event instances
const generateRecurringEvents = (event) => {
  if (!event.is_recurring || !event.recurrence_pattern || !event.end_date) {
    return [event];
  }

  const instances = [];
  const startDate = new Date(event.event_date);
  const endDate = new Date(event.end_date);
  const currentDate = new Date(startDate);

  // Add the original event first (without is_recurring_instance flag)
  instances.push({
    ...event,
    is_recurring_instance: false
  });

  // Generate future instances
  const nextDate = new Date(startDate);
  switch (event.recurrence_pattern) {
    case 'weekly':
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'yearly':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      break;
  }

  while (nextDate <= endDate) {
    instances.push({
      ...event,
      event_date: nextDate.toISOString().split('T')[0],
      is_recurring_instance: true,
      original_event_id: event.id
    });

    // Calculate next occurrence based on pattern
    switch (event.recurrence_pattern) {
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;
      default:
        break;
    }
  }

  return instances;
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: '',
    is_recurring: false,
    recurrence_pattern: '',
    end_date: ''
  });
  const [notification, setNotification] = useState({
    message: '',
    title: '',
    type: 'success',
    show: false
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const checkUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin');
      return;
    }
    setUser(user);
  }, [router]);

  // Check authentication on component mount
  useEffect(() => {
    checkUser();
    fetchEvents();
  }, [checkUser]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      
      // Store original events
      setEvents(data || []);
      
      // Generate expanded events for display
      const expanded = [];
      (data || []).forEach(event => {
        const instances = generateRecurringEvents(event);
        expanded.push(...instances);
      });
      
      // Sort by date
      expanded.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      setExpandedEvents(expanded);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
          // Validate required fields
      if (!formData.title || !formData.event_date) {
        setNotification({ 
          title: 'Validation Error',
          message: 'Please fill in all required fields (Title and Date are required).', 
          type: 'error', 
          show: true 
        });
        return;
      }

    // Clean up the data before sending
    const eventData = {
      title: formData.title,
      description: formData.description || null,
      event_date: formData.event_date,
      event_time: formData.event_time || null,
      location: formData.location || null,
      is_recurring: formData.is_recurring,
      recurrence_pattern: formData.recurrence_pattern || null,
      end_date: formData.end_date || null
    };
    
    try {
      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) throw error;
      } else {
        // Create new event
        const { error } = await supabase
          .from('events')
          .insert([eventData]);

        if (error) throw error;
      }

      // Reset form and refresh events
      setFormData({
        title: '',
        description: '',
        event_date: '',
        event_time: '',
        location: '',
        is_recurring: false,
        recurrence_pattern: '',
        end_date: ''
      });
      setEditingEvent(null);
              setShowForm(false);
        fetchEvents();
        setNotification({ 
          title: 'Success!',
          message: `Event ${editingEvent ? 'updated' : 'added'} successfully!`, 
          type: 'success', 
          show: true 
        });
      } catch (error) {
        console.error('Error saving event:', error);
        setNotification({ 
          title: 'Error',
          message: 'Error saving event. Please check your input and try again.', 
          type: 'error', 
          show: true 
        });
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      event_date: event.event_date,
      event_time: event.event_time || '',
      location: event.location || '',
      is_recurring: event.is_recurring || false,
      recurrence_pattern: event.recurrence_pattern || '',
      end_date: event.end_date || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    setEventToDelete(id);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventToDelete);

              if (error) throw error;
        fetchEvents();
        setNotification({ 
          title: 'Success!',
          message: 'Event deleted successfully!', 
          type: 'success', 
          show: true 
        });
      } catch (error) {
        console.error('Error deleting event:', error);
        setNotification({ 
          title: 'Error',
          message: 'Error deleting event. Please try again.', 
          type: 'error', 
          show: true 
        });
    } finally {
      setEventToDelete(null);
      setShowConfirmation(false);
    }
  };

  const formatDate = (dateString) => {
    // Ensure the date is treated as local time to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
      <section className="w-full bg-custom-blue text-white py-8">
        <div className="w-3/4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Events Management</h1>
              <p className="text-lg">Manage your church events and calendar</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="bg-white text-custom-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="bg-white text-custom-blue px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-3/4 mx-auto py-8">
        {/* Add Event Button */}
        <button
          onClick={() => {
            setEditingEvent(null);
            setFormData({
              title: '',
              description: '',
              event_date: '',
              event_time: '',
              location: '',
              is_recurring: false,
              recurrence_pattern: '',
              end_date: ''
            });
            setShowForm(true);
          }}
          className="bg-calvary-blue text-white px-6 py-3 rounded-lg font-semibold mb-6 hover:bg-[#00b3e6] transition-colors duration-200"
        >
          Add New Event
        </button>

        {/* Event Form */}
        {showForm && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-custom-blue">
              {editingEvent ? 'Edit Event' : 'Add New Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.event_time}
                    onChange={(e) => setFormData({...formData, event_time: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_recurring}
                    onChange={(e) => setFormData({...formData, is_recurring: e.target.checked})}
                    className="mr-2"
                  />
                  Recurring Event
                </label>
              </div>

              {formData.is_recurring && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Recurrence Pattern</label>
                    <select
                      value={formData.recurrence_pattern}
                      onChange={(e) => setFormData({...formData, recurrence_pattern: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select pattern</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-calvary-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#00b3e6] transition-colors duration-200"
                >
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white border border-gray-300 rounded-lg">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-custom-blue">All Events</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">Loading events...</div>
          ) : expandedEvents.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No events found. Add your first event above.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {expandedEvents.map((event, index) => (
                <div key={`${event.id}-${index}`} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-custom-blue mb-2">
                        {event.title}
                        {event.is_recurring_instance && (
                          <span className="ml-2 text-sm bg-calvary-blue text-white px-2 py-1 rounded">
                            Recurring Instance
                          </span>
                        )}
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p><strong>Date:</strong> {formatDate(event.event_date)}</p>
                        {event.event_time && <p><strong>Time:</strong> {formatTime(event.event_time)}</p>}
                        {event.location && <p><strong>Location:</strong> {event.location}</p>}
                        {event.description && <p><strong>Description:</strong> {event.description}</p>}
                        {event.is_recurring && !event.is_recurring_instance && (
                          <p><strong>Recurring:</strong> {event.recurrence_pattern} {event.end_date && `until ${formatDate(event.end_date)}`}</p>
                        )}
                        {event.is_recurring_instance && (
                          <p className="text-calvary-blue font-semibold">
                            🔄 Part of recurring {event.recurrence_pattern} series
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {!event.is_recurring_instance ? (
                        <>
                          <button
                            onClick={() => handleEdit(event)}
                            className="bg-calvary-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-[#00b3e6] transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 italic">
                          Edit/Delete from original event
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
         onCancel={() => setShowConfirmation(false)}
         onConfirm={confirmDelete}
         title="Confirm Deletion"
         message="Are you sure you want to delete this event? This action cannot be undone."
         confirmText="Delete"
         cancelText="Cancel"
         type="danger"
       />
    </main>
  );
}