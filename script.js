// Function to extract title from iframe
function extractTitle(iframe) {
    const titleMatch = iframe.match(/title="([^"]*)"/);
    return titleMatch ? titleMatch[1] : "Untitled Video";
}

// Function to create video card HTML
function createVideoCard(video) {
    const title = extractTitle(video.iframe);
    
    return `
        <div class="video-card" data-tag="${video.category}">
            <div class="thumbnail-container">
                ${video.iframe}
            </div>
            <div class="video-info">
                <div class="video-title">${title}</div>
            </div>
        </div>
    `;
}

// Function to load videos based on category
function loadVideos(filter = 'all') {
    const videoContainer = document.getElementById('videoContainer');
    
    // Filter videos
    const filteredVideos = filter === 'all' 
        ? videoData 
        : videoData.filter(video => video.category === filter);
    
    videoContainer.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        videoContainer.innerHTML = '<p class="no-videos">No videos found in this category.</p>';
        return;
    }
    
    // Add filtered videos
    filteredVideos.forEach(video => {
        videoContainer.innerHTML += createVideoCard(video);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load all videos initially
    loadVideos('all');
    
    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update button states
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter videos
            loadVideos(filter);
        });
    });
});