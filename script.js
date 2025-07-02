// Function to show a specific page and hide others
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show the requested page
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = 'block';
    }
    
    // Update active state in sidebar
    document.querySelectorAll('.nav-menu .menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.nav-menu [data-page="${pageId}"]`);
    if (activeItem) {
        activeItem.closest('.menu-item').classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    // Add click handlers for menu items with data-page attribute
    document.querySelectorAll('.nav-menu [data-page]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            
            // Close any open dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        });
    });
    
    // Show dashboard by default
    showPage('dashboard-page');
    
    if (toggleSidebar && sidebar) {
        // Show toggle button on sidebar hover
        sidebar.addEventListener('mouseenter', function() {
            toggleSidebar.style.opacity = '1';
        });

        // Hide toggle button when mouse leaves sidebar
        sidebar.addEventListener('mouseleave', function() {
            // Keep the button visible if sidebar is collapsed
            if (!sidebar.classList.contains('collapsed')) {
                toggleSidebar.style.opacity = '0';
            }
        });

        toggleSidebar.addEventListener('click', function(e) {
            e.stopPropagation();
            const isCollapsed = sidebar.classList.contains('collapsed');
            
            // Close any open dropdowns when collapsing
            if (!isCollapsed) {
                document.querySelectorAll('.has-dropdown.open').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
            
            // Toggle collapsed class
            sidebar.classList.toggle('collapsed');
            
            // Toggle between left and right chevron
            const icon = this.querySelector('i');
            if (icon) {
                if (isCollapsed) {
                    // Expanding - show left chevron
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-chevron-left');
                } else {
                    // Collapsing - show right chevron
                    icon.classList.remove('fa-chevron-left');
                    icon.classList.add('fa-chevron-right');
                }
            }
            
            // Keep the toggle button visible after click
            this.style.opacity = '1';
        });
        
        // Initially hide the toggle button if sidebar is not collapsed
        if (!sidebar.classList.contains('collapsed')) {
            toggleSidebar.style.opacity = '0';
        }
    }
    
    // Handle dropdown menus
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .menu-item-content');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.parentElement;
            const isOpen = parent.classList.contains('open');
            
            // Close all other dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(openDropdown => {
                if (openDropdown !== parent) {
                    openDropdown.classList.remove('open');
                }
            });
            
            // Toggle current dropdown
            if (!isOpen) {
                parent.classList.add('open');
            } else {
                parent.classList.remove('open');
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.has-dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    });

    // Toggle dropdown menu
    const dropdown = document.querySelector('.has-dropdown');
    if (dropdown) {
        const menuItem = dropdown.querySelector('.menu-item');
        menuItem.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close other open dropdowns
            document.querySelectorAll('.has-dropdown.open').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('open');
                    const otherArrow = item.querySelector('.dropdown-arrow');
                    if (otherArrow) otherArrow.style.transform = 'rotate(0)';
                }
            });
            
            dropdown.classList.toggle('open');
            const arrow = dropdown.querySelector('.dropdown-arrow');
            if (dropdown.classList.contains('open')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0)';
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                const arrow = dropdown.querySelector('.dropdown-arrow');
                if (arrow) arrow.style.transform = 'rotate(0)';
            }
        });
    }

    // Handle logout
    const logoutBtn = document.querySelector('.user-profile i.fa-sign-out-alt');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // In a real app, this would log the user out
            console.log('Logging out...');
            // window.location.href = '/logout';
        });
    }
});

// Add click effect to wearable cards
const wearableCards = document.querySelectorAll('.wearable-card');
wearableCards.forEach(card => {
    card.addEventListener('click', function() {
        // This is a placeholder for the actual logic to connect to the respective service
        const serviceName = this.querySelector('span').textContent.replace('Add ', '');
        console.log(`Connecting to ${serviceName}...`);
        // In a real app, you would open an OAuth flow or API connection here
    });
});

// Simulate loading the user's profile completion percentage
// In a real app, this would come from your backend
function updateProfileCompletion() {
    // This is just for demonstration
    const completionPercentage = 66; // This would come from your backend
    const progressElement = document.querySelector('.progress');
    if (progressElement) {
        progressElement.style.setProperty('--progress', completionPercentage);
        const progressText = progressElement.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${completionPercentage}%`;
        }
    }
}

// Initialize the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    updateProfileCompletion();
});
