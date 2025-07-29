'use client'
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

// Utility function to generate recurring event instances
const generateRecurringEvents = (event) => {
  if (!event.is_recurring || !event.recurrence_pattern || !event.end_date) {
    return [event];
  }

  const instances = [];
  const startDate = new Date(event.event_date);
  const endDate = new Date(event.end_date);
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    instances.push({
      ...event,
      event_date: currentDate.toISOString().split('T')[0],
      is_recurring_instance: true,
      original_event_id: event.id
    });

    // Calculate next occurrence based on pattern
    switch (event.recurrence_pattern) {
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        break;
    }
  }

  return instances;
};

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [expandedEvents, setExpandedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [showDayModal, setShowDayModal] = useState(false);

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

  const formatDate = (dateString) => {
    // Ensure the date is treated as local time to avoid timezone issues
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
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
    return expandedEvents.filter(event => new Date(event.event_date) >= today);
  };

  const getPastEvents = () => {
    const today = new Date();
    return expandedEvents.filter(event => new Date(event.event_date) < today);
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
      return expandedEvents.filter(event => event.event_date === dateString);
    }
    return [];
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-3 md:p-2 border border-gray-200 bg-gray-50"></div>);
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
          className={`p-3 md:p-2 border border-gray-200 min-h-[120px] md:min-h-[80px] ${
            isToday ? 'bg-calvary-blue text-white' : 
            isPast ? 'bg-gray-100 text-gray-400' : 'bg-white'
          }`}
        >
          <div className="font-semibold mb-2 md:mb-1 text-sm md:text-base">{day}</div>
          {/* Mobile: Show blue dots for events */}
          <div className="md:hidden">
            {dayEvents.length > 0 && (
              <div 
                className="w-3 h-3 bg-calvary-blue rounded-full mx-auto cursor-pointer hover:opacity-80 transition-opacity duration-200"
                title={`${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''} on this day`}
                onClick={() => handleDayClick(dayEvents)}
              />
            )}
          </div>
          
          {/* Desktop: Show full event details */}
          <div className="hidden md:block">
            {dayEvents.map((event, index) => (
              <div 
                key={index} 
                className={`text-xs p-1 mb-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ${
                  isToday ? 'bg-white text-calvary-blue' : 'bg-calvary-blue text-white'
                }`}
                title={`${event.title}${event.event_time ? ` at ${formatTime(event.event_time)}` : ''}`}
                onClick={() => handleEventClick(event)}
              >
                <div className="font-semibold truncate text-xs leading-tight">{event.title}</div>
                {event.event_time && (
                  <div className="text-xs opacity-90 leading-tight">{formatTime(event.event_time)}</div>
                )}
              </div>
            ))}
          </div>
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

  const handleDayClick = (events) => {
    setSelectedDayEvents(events);
    setShowDayModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const closeDayModal = () => {
    setShowDayModal(false);
    setSelectedDayEvents([]);
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
        <div className="w-full px-4 md:w-3/4 md:mx-auto">
          
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
                    {upcomingEvents.map((event, index) => (
                      <div key={`${event.id}-${index}`} className="bg-gray-50 rounded-lg p-6 border-l-4 border-calvary-blue">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-custom-blue mb-2">
                              {event.title}
                              {event.is_recurring_instance && (
                                <span className="ml-2 text-sm bg-calvary-blue text-white px-2 py-1 rounded">
                                  Recurring
                                </span>
                              )}
                            </h3>
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
                              {event.is_recurring && !event.is_recurring_instance && (
                                <p className="text-lg text-calvary-blue font-semibold">
                                  🔄 Recurring {event.recurrence_pattern} event
                                  {event.end_date && ` until ${formatDate(event.end_date)}`}
                                </p>
                              )}
                              {event.is_recurring_instance && (
                                <p className="text-lg text-calvary-blue font-semibold">
                                  🔄 Part of recurring {event.recurrence_pattern} series
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
                    {pastEvents.slice(0, 5).map((event, index) => (
                      <div key={`${event.id}-${index}`} className="bg-gray-100 rounded-lg p-4 border-l-4 border-gray-400">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-700 mb-1">
                              {event.title}
                              {event.is_recurring_instance && (
                                <span className="ml-2 text-xs bg-gray-500 text-white px-1 py-0.5 rounded">
                                  Recurring
                                </span>
                              )}
                            </h3>
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
              <h2 className="text-4xl font-bold mb-8 text-custom-blue">Upcoming Events</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-xl">Loading events...</p>
                </div>
              ) : (
                <div className="bg-white border border-gray-300 rounded-lg p-2 md:p-6 w-full">
                  {/* Calendar Header */}
                  <div className="flex justify-between items-center mb-6">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      ← Previous
                    </button>
                    <h3 className="text-xl md:text-2xl font-bold text-custom-blue">
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
                  <div className="grid grid-cols-7 gap-3 md:gap-1">
                    {/* Day Headers */}
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={day + index} className="p-3 md:p-2 text-center font-semibold text-gray-600 bg-gray-50 text-sm md:text-base">
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
                
                {selectedEvent.is_recurring && !selectedEvent.is_recurring_instance && (
                  <div>
                    <strong className="text-gray-700">Recurring:</strong>
                    <p className="text-lg text-calvary-blue font-semibold">
                      🔄 {selectedEvent.recurrence_pattern} event
                      {selectedEvent.end_date && ` until ${formatDate(selectedEvent.end_date)}`}
                    </p>
                  </div>
                )}
                {selectedEvent.is_recurring_instance && (
                  <div>
                    <strong className="text-gray-700">Recurring:</strong>
                    <p className="text-lg text-calvary-blue font-semibold">
                      🔄 Part of recurring {selectedEvent.recurrence_pattern} series
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

      {/* Day Events Modal for Mobile */}
      {showDayModal && selectedDayEvents.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-custom-blue">
                  Events on {formatDate(selectedDayEvents[0].event_date)}
                </h3>
                <button
                  onClick={closeDayModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                {selectedDayEvents.map((event, index) => (
                  <div key={`${event.id}-${index}`} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-custom-blue mb-2">
                      {event.title}
                      {event.is_recurring_instance && (
                        <span className="ml-2 text-sm bg-calvary-blue text-white px-2 py-1 rounded">
                          Recurring
                        </span>
                      )}
                    </h4>
                    
                    <div className="space-y-2 text-sm">
                      {event.event_time && (
                        <div>
                          <strong className="text-gray-700">Time:</strong>
                          <span className="ml-2">{formatTime(event.event_time)}</span>
                        </div>
                      )}
                      
                      {event.location && (
                        <div>
                          <strong className="text-gray-700">Location:</strong>
                          <span className="ml-2">{event.location}</span>
                        </div>
                      )}
                      
                      {event.description && (
                        <div>
                          <strong className="text-gray-700">Description:</strong>
                          <p className="mt-1 text-gray-600">{event.description}</p>
                        </div>
                      )}
                      
                      {event.is_recurring && !event.is_recurring_instance && (
                        <div className="text-calvary-blue font-semibold">
                          🔄 {event.recurrence_pattern} event
                          {event.end_date && ` until ${formatDate(event.end_date)}`}
                        </div>
                      )}
                      {event.is_recurring_instance && (
                        <div className="text-calvary-blue font-semibold">
                          🔄 Part of recurring {event.recurrence_pattern} series
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeDayModal}
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