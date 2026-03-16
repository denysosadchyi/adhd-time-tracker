import { appWindow } from '@tauri-apps/api/window';

// Timeline configuration
const timelineConfig = {
    startTime: 0, // 00:00 in minutes
    endTime: 1440, // 24:00 in minutes (24 * 60)
    activities: [
        { start: 0, end: 540, type: 'sleep' }, // 00:00 - 09:00
        { start: 540, end: 570, type: 'food' }, // 09:00 - 09:30
        { start: 570, end: 840, type: 'work' }, // 09:30 - 14:00
        { start: 840, end: 870, type: 'food' }, // 14:00 - 14:30
        { start: 870, end: 1080, type: 'work' }, // 14:30 - 18:00
        { start: 1080, end: 1140, type: 'food' }, // 18:00 - 19:00
        { start: 1140, end: 1440, type: 'rest' }, // 19:00 - 00:00
    ]
};

// Convert time string (HH:MM) to minutes
function timeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

// Convert minutes to time string (HH:MM)
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60) % 24;
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Get current time in minutes
function getCurrentTimeInMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

// Calculate position of current time on timeline
function calculateTimePosition(currentMinutes, timelineWidth) {
    // Normalize current time to 0-1440 range
    const normalizedTime = currentMinutes % 1440;
    
    // Calculate position as percentage
    const percentage = (normalizedTime / 1440) * 100;
    
    // Calculate pixel position (accounting for padding)
    const padding = 8; // Container padding
    const position = (timelineWidth - (padding * 2)) * (percentage / 100) + padding;
    
    return position;
}

// Update current time indicator
function updateCurrentTimeIndicator() {
    const indicator = document.getElementById('current-time-indicator');
    const timeLabel = document.getElementById('current-time-label');
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (!indicator || !timeLabel || !timelineContainer) return;
    
    const currentMinutes = getCurrentTimeInMinutes();
    const currentTimeString = minutesToTime(currentMinutes);
    
    // Update time label
    timeLabel.textContent = currentTimeString;
    
    // Calculate position
    const timelineWidth = timelineContainer.offsetWidth || timelineContainer.scrollWidth;
    const position = calculateTimePosition(currentMinutes, timelineWidth);
    
    // Update indicator position
    indicator.style.left = `${position}px`;
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Update time indicator immediately
    updateCurrentTimeIndicator();
    
    // Update every minute
    setInterval(updateCurrentTimeIndicator, 60000);
    
    // Also update on window resize
    window.addEventListener('resize', updateCurrentTimeIndicator);
    
    console.log('Timeline widget initialized');
});
