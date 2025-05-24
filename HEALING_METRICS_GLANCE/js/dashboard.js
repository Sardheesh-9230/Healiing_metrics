document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initializeCharts();
    
    // Event listener for window resize to make charts responsive
    window.addEventListener('resize', function() {
        // Destroy and re-initialize charts to resize properly
        initializeCharts();
    });
    
    function initializeCharts() {
        // Heart Rate Chart
        if (document.getElementById('heartRateChart')) {
            const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
            const heartRateChart = new Chart(heartRateCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Heart Rate',
                        data: [68, 70, 75, 72, 69, 74, 72],
                        borderColor: '#4285f4',
                        backgroundColor: 'rgba(66, 133, 244, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        pointBackgroundColor: '#4285f4',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: getChartOptions('bpm')
            });
        }
        
        // Blood Pressure Chart
        if (document.getElementById('bloodPressureChart')) {
            const bpCtx = document.getElementById('bloodPressureChart').getContext('2d');
            const bpChart = new Chart(bpCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Systolic',
                            data: [120, 118, 122, 125, 119, 121, 120],
                            borderColor: '#ea4335',
                            backgroundColor: 'rgba(234, 67, 53, 0.1)',
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: '#ea4335',
                            tension: 0.3
                        },
                        {
                            label: 'Diastolic',
                            data: [80, 78, 82, 85, 79, 80, 80],
                            borderColor: '#34a853',
                            backgroundColor: 'rgba(52, 168, 83, 0.1)',
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: '#34a853',
                            tension: 0.3
                        }
                    ]
                },
                options: getChartOptions('mmHg')
            });
        }
        
        // Sleep Quality Chart
        if (document.getElementById('sleepChart')) {
            const sleepCtx = document.getElementById('sleepChart').getContext('2d');
            const sleepChart = new Chart(sleepCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Sleep Quality',
                        data: [75, 82, 80, 78, 85, 90, 88],
                        backgroundColor: 'rgba(52, 168, 83, 0.6)',
                        borderRadius: 5
                    }]
                },
                options: getChartOptions('%')
            });
        }
        
        // Stress Level Chart
        if (document.getElementById('stressChart')) {
            const stressCtx = document.getElementById('stressChart').getContext('2d');
            const stressChart = new Chart(stressCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Stress Level',
                        data: [30, 45, 60, 55, 42, 35, 42],
                        borderColor: '#fbbc05',
                        backgroundColor: 'rgba(251, 188, 5, 0.1)',
                        borderWidth: 2,
                        pointRadius: 3,
                        pointBackgroundColor: '#fbbc05',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: getChartOptions('%')
            });
        }
        
        // Activity Chart (Weekly Overview)
        if (document.getElementById('activityChart')) {
            const activityCtx = document.getElementById('activityChart').getContext('2d');
            const activityChart = new Chart(activityCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Steps',
                            data: [6500, 8200, 7800, 9500, 7200, 10500, 8800],
                            backgroundColor: 'rgba(66, 133, 244, 0.7)',
                            borderRadius: 5
                        },
                        {
                            label: 'Calories Burned',
                            data: [2200, 2500, 2400, 2700, 2300, 2800, 2600],
                            backgroundColor: 'rgba(234, 67, 53, 0.7)',
                            borderRadius: 5
                        },
                        {
                            label: 'Active Minutes',
                            data: [45, 60, 55, 75, 50, 90, 70],
                            backgroundColor: 'rgba(52, 168, 83, 0.7)',
                            borderRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }
    
    // Common chart options
    function getChartOptions(unit) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' ' + unit;
                        }
                    }
                }
            },
            scales: {
                y: {
                    display: false,
                    beginAtZero: false
                },
                x: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            }
        };
    }
    
    // Add event listeners for appointment buttons
    const rescheduleButtons = document.querySelectorAll('.btn-reschedule');
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('This would open a scheduling dialog in a real application.');
        });
    });
});