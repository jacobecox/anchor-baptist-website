'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events.filter(event => new Date(event.event_date) >= today);
  };

  const getPastEvents = () => {
    const today = new Date();
    return events.filter(event => new Date(event.event_date) < today);
  };

  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  // Calendar view functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    // Only return events for today or future dates
    if (date >= today) {
      return events.filter(event => event.event_date === dateString);
    }
    return [];
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 border border-gray-200 bg-gray-50"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
      const dayEvents = getEventsForDate(currentDate);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isPast = currentDate < new Date();
      
      days.push(
        <div 
          key={day} 
          className={`p-2 border border-gray-200 min-h-[80px] ${
            isToday ? 'bg-calvary-blue text-white' : 
            isPast ? 'bg-gray-100 text-gray-400' : 'bg-white'
          }`}
        >
          <div className="font-semibold mb-1">{day}</div>
          {dayEvents.map((event, index) => (
            <div 
              key={index} 
              className={`text-xs p-1 mb-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ${
                isToday ? 'bg-white text-calvary-blue' : 'bg-calvary-blue text-white'
              }`}
              title={`${event.title}${event.event_time ? ` at ${formatTime(event.event_time)}` : ''}`}
              onClick={() => handleEventClick(event)}
            >
              <div className="font-semibold truncate">{event.title}</div>
              {event.event_time && (
                <div className="text-xs opacity-90">{formatTime(event.event_time)}</div>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    return days;
  };

  const changeMonth = (direction) => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + direction, 1));
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  return (
    <main className="font-sans">
      {/* Header Section */}
      <section className="w-full bg-calvary-blue text-white py-8">
        <div className="w-3/4 mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">EVENTS</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full bg-white text-custom-blue py-12">
        <div className="w-3/4 mx-auto">
          
          {/* View Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
                  viewMode === 'list' 
                    ? 'bg-calvary-blue text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
                  viewMode === 'calendar' 
                    ? 'bg-calvary-blue text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Calendar View
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            // List View
            <>
              {/* Upcoming Events */}
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-8 text-custom-blue">Upcoming Events</h2>
                
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-xl">Loading events...</p>
                  </div>
                ) : upcomingEvents.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-xl text-gray-600">No upcoming events scheduled. Check back soon!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="bg-gray-50 rounded-lg p-6 border-l-4 border-calvary-blue">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-custom-blue mb-2">{event.title}</h3>
                            <div className="text-gray-700 space-y-1">
                              <p className="text-lg">
                                <strong>Date:</strong> {formatDate(event.event_date)}
                              </p>
                              {event.event_time && (
                                <p className="text-lg">
                                  <strong>Time:</strong> {formatTime(event.event_time)}
                                </p>
                              )}
                              {event.location && (
                                <p className="text-lg">
                                  <strong>Location:</strong> {event.location}
                                </p>
                              )}
                              {event.description && (
                                <p className="text-lg mt-2">
                                  <strong>Description:</strong> {event.description}
                                </p>
                              )}
                              {event.is_recurring && (
                                <p className="text-lg text-calvary-blue font-semibold">
                                  🔄 Recurring {event.recurrence_pattern} event
                                  {event.end_date && ` until ${formatDate(event.end_date)}`}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <h2 className="text-4xl font-bold mb-8 text-custom-blue">Past Events</h2>
                  <div className="space-y-4">
                    {pastEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-700 mb-1">{event.title}</h3>
                            <div className="text-gray-600 text-sm">
                              <p>{formatDate(event.event_date)}</p>
                              {event.event_time && <p>Time: {formatTime(event.event_time)}</p>}
                              {event.location && <p>Location: {event.location}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {pastEvents.length > 5 && (
                      <p className="text-center text-gray-500 mt-4">
                        Showing 5 most recent past events. Contact us for more information about previous events.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Calendar View
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-8 text-custom-blue">Calendar View</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-xl">Loading events...</p>
                </div>
              ) : (
                <div className="bg-white border border-gray-300 rounded-lg p-6">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      ← Previous
                    </button>
                    <h3 className="text-2xl font-bold text-custom-blue">
                      {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button
                      onClick={() => changeMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      Next →
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-50">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar Days */}
                    {renderCalendar()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 text-center bg-calvary-blue text-white rounded-lg p-8">
            <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
            <p className="text-xl mb-6">
              Don&apos;t miss out on our upcoming events! Join us for fellowship, worship, and community.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/visit'}
                className="bg-white text-calvary-blue px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                VISIT US
              </button>
              <button 
                onClick={() => window.location.href = '/watch'}
                className="bg-custom-blue text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#005a7a] transition-colors duration-200"
              >
                WATCH ONLINE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-custom-blue">{selectedEvent.title}</h3>
                <button
                  onClick={closeEventModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-700">Date:</strong>
                  <p className="text-lg">{formatDate(selectedEvent.event_date)}</p>
                </div>
                
                {selectedEvent.event_time && (
                  <div>
                    <strong className="text-gray-700">Time:</strong>
                    <p className="text-lg">{formatTime(selectedEvent.event_time)}</p>
                  </div>
                )}
                
                {selectedEvent.location && (
                  <div>
                    <strong className="text-gray-700">Location:</strong>
                    <p className="text-lg">{selectedEvent.location}</p>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div>
                    <strong className="text-gray-700">Description:</strong>
                    <p className="text-lg">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.is_recurring && (
                  <div>
                    <strong className="text-gray-700">Recurring:</strong>
                    <p className="text-lg text-calvary-blue font-semibold">
                      🔄 {selectedEvent.recurrence_pattern} event
                      {selectedEvent.end_date && ` until ${formatDate(selectedEvent.end_date)}`}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeEventModal}
                  className="bg-calvary-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#00b3e6] transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 