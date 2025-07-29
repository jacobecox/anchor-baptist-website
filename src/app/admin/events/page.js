'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
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

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
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
      alert('Please fill in all required fields (Title and Date are required).');
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
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please check your input and try again.');
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
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <main className="font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-custom-blue">Manage Events</h1>
        
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
          ) : events.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No events found. Add your first event above.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {events.map((event) => (
                <div key={event.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-custom-blue mb-2">{event.title}</h3>
                      <div className="text-gray-600 space-y-1">
                        <p><strong>Date:</strong> {formatDate(event.event_date)}</p>
                        {event.event_time && <p><strong>Time:</strong> {formatTime(event.event_time)}</p>}
                        {event.location && <p><strong>Location:</strong> {event.location}</p>}
                        {event.description && <p><strong>Description:</strong> {event.description}</p>}
                        {event.is_recurring && (
                          <p><strong>Recurring:</strong> {event.recurrence_pattern} {event.end_date && `until ${formatDate(event.end_date)}`}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}