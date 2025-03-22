// DOM references to all input elements
const harrisVisible = document.getElementById('harrisVisible');
const harrisAmplitude = document.getElementById('harrisAmplitude');
const harrisWidth = document.getElementById('harrisWidth');
const harrisCenter = document.getElementById('harrisCenter');
const harrisAmplitudeValue = document.getElementById('harrisAmplitudeValue');
const harrisWidthValue = document.getElementById('harrisWidthValue');
const harrisCenterValue = document.getElementById('harrisCenterValue');

const trump1Visible = document.getElementById('trump1Visible');
const trump1Amplitude = document.getElementById('trump1Amplitude');
const trump1Width = document.getElementById('trump1Width');
const trump1Center = document.getElementById('trump1Center');
const trump1AmplitudeValue = document.getElementById('trump1AmplitudeValue');
const trump1WidthValue = document.getElementById('trump1WidthValue');
const trump1CenterValue = document.getElementById('trump1CenterValue');

const trump2Visible = document.getElementById('trump2Visible');
const trump2Amplitude = document.getElementById('trump2Amplitude');
const trump2Width = document.getElementById('trump2Width');
const trump2Center = document.getElementById('trump2Center');
const trump2AmplitudeValue = document.getElementById('trump2AmplitudeValue');
const trump2WidthValue = document.getElementById('trump2WidthValue');
const trump2CenterValue = document.getElementById('trump2CenterValue');

// Chart configuration
let chartConfig = {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Harris Votes',
                borderColor: 'rgba(33, 150, 243, 0.8)', // Blue
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
                data: []
            },
            {
                label: 'Trump Votes (Set 1)',
                borderColor: 'rgba(244, 67, 54, 0.6)', // Light red
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
                borderDash: [5, 5], // Dashed line
                data: []
            },
            {
                label: 'Trump Votes (Set 2)',
                borderColor: 'rgba(211, 47, 47, 0.6)', // Dark red
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
                borderDash: [5, 5], // Dashed line
                data: []
            },
            {
                label: 'Trump Total',
                borderColor: 'rgba(183, 28, 28, 1)', // Deeper red (solid)
                backgroundColor: 'rgba(183, 28, 28, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
                data: []
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Number of ballots per tabulator (percentile)',
                    color: '#000',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Fraction for Candidate',
                    color: '#000',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                min: 0,
                max: 0.5,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.1)'
                },
                ticks: {
                    color: '#333',
                    callback: function(value) {
                        return value.toFixed(1);
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333',
                    usePointStyle: true,
                    padding: 20
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                titleColor: '#333',
                bodyColor: '#333',
                borderColor: '#ccc',
                borderWidth: 1
            }
        },
        animation: {
            duration: 0 // Disable animations for better performance
        }
    }
};

// Set transparent background for Chart.js
Chart.defaults.color = '#333';
Chart.defaults.font.family = 'Arial, sans-serif';
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(255, 255, 255, 0.8)';
Chart.defaults.plugins.tooltip.titleColor = '#333';
Chart.defaults.plugins.tooltip.bodyColor = '#333';

// Initialize the chart
const chartElement = document.getElementById('bellCurveChart');
let bellCurveChart = new Chart(chartElement, chartConfig);

// Bell curve (normal distribution) function
function normalDistribution(x, mean, stdDev, amplitude) {
    if (stdDev === 0) return 0; // Avoid division by zero
    const variance = stdDev * stdDev;
    return amplitude * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
}

// Generate x values for the chart (from 0 to 20)
function generateXValues() {
    const xValues = [];
    // Use a smaller step size for smoother curves
    for (let i = 0; i <= 20; i += 0.05) {
        xValues.push(parseFloat(i.toFixed(2)));
    }
    return xValues;
}

// Update chart data based on current control values
function updateChart() {
    const xValues = generateXValues();
    
    // Get current values from controls
    const harrisParams = {
        visible: harrisVisible.checked,
        amplitude: parseFloat(harrisAmplitude.value),
        width: parseFloat(harrisWidth.value),
        center: parseFloat(harrisCenter.value)
    };
    
    const trump1Params = {
        visible: trump1Visible.checked,
        amplitude: parseFloat(trump1Amplitude.value),
        width: parseFloat(trump1Width.value),
        center: parseFloat(trump1Center.value)
    };
    
    const trump2Params = {
        visible: trump2Visible.checked,
        amplitude: parseFloat(trump2Amplitude.value),
        width: parseFloat(trump2Width.value),
        center: parseFloat(trump2Center.value)
    };
    
    // Generate datasets
    const harrisData = [];
    const trump1Data = [];
    const trump2Data = [];
    const trumpTotalData = [];
    
    xValues.forEach(x => {
        // Calculate harris vote bell curve value
        const harrisValue = harrisParams.visible 
            ? normalDistribution(x, harrisParams.center, harrisParams.width, harrisParams.amplitude) 
            : 0;
        
        // Calculate trump1 vote bell curve value
        const trump1Value = trump1Params.visible 
            ? normalDistribution(x, trump1Params.center, trump1Params.width, trump1Params.amplitude) 
            : 0;
            
        // Calculate trump2 vote bell curve value
        const trump2Value = trump2Params.visible 
            ? normalDistribution(x, trump2Params.center, trump2Params.width, trump2Params.amplitude) 
            : 0;
        
        // Calculate total Trump votes (sum of trump1 and trump2)
        const trumpTotalValue = trump1Value + trump2Value;
        
        harrisData.push({ x, y: harrisValue });
        trump1Data.push({ x, y: trump1Value });
        trump2Data.push({ x, y: trump2Value });
        trumpTotalData.push({ x, y: trumpTotalValue });
    });
    
    // Update chart data
    bellCurveChart.data.datasets[0].data = harrisData;
    bellCurveChart.data.datasets[1].data = trump1Data;
    bellCurveChart.data.datasets[2].data = trump2Data;
    bellCurveChart.data.datasets[3].data = trumpTotalData;
    
    // Toggle visibility based on checkboxes
    bellCurveChart.data.datasets[0].hidden = !harrisParams.visible;
    bellCurveChart.data.datasets[1].hidden = !trump1Params.visible;
    bellCurveChart.data.datasets[2].hidden = !trump2Params.visible;
    
    // Update chart
    bellCurveChart.update();
    
    // Update displayed values
    harrisAmplitudeValue.textContent = harrisParams.amplitude.toFixed(2);
    harrisWidthValue.textContent = harrisParams.width.toFixed(1);
    harrisCenterValue.textContent = harrisParams.center.toFixed(1);
    
    trump1AmplitudeValue.textContent = trump1Params.amplitude.toFixed(2);
    trump1WidthValue.textContent = trump1Params.width.toFixed(1);
    trump1CenterValue.textContent = trump1Params.center.toFixed(1);
    
    trump2AmplitudeValue.textContent = trump2Params.amplitude.toFixed(2);
    trump2WidthValue.textContent = trump2Params.width.toFixed(1);
    trump2CenterValue.textContent = trump2Params.center.toFixed(1);
}

// Set up event listeners for all controls
harrisVisible.addEventListener('change', updateChart);
harrisAmplitude.addEventListener('input', updateChart);
harrisWidth.addEventListener('input', updateChart);
harrisCenter.addEventListener('input', updateChart);

trump1Visible.addEventListener('change', updateChart);
trump1Amplitude.addEventListener('input', updateChart);
trump1Width.addEventListener('input', updateChart);
trump1Center.addEventListener('input', updateChart);

trump2Visible.addEventListener('change', updateChart);
trump2Amplitude.addEventListener('input', updateChart);
trump2Width.addEventListener('input', updateChart);
trump2Center.addEventListener('input', updateChart);

// Initialize the chart with the default values
document.addEventListener('DOMContentLoaded', updateChart); 
