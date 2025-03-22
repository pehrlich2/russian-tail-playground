// DOM references to all input elements
const realVisible = document.getElementById('realVisible');
const realAmplitude = document.getElementById('realAmplitude');
const realWidth = document.getElementById('realWidth');
const realCenter = document.getElementById('realCenter');
const realAmplitudeValue = document.getElementById('realAmplitudeValue');
const realWidthValue = document.getElementById('realWidthValue');
const realCenterValue = document.getElementById('realCenterValue');

const fakeVisible = document.getElementById('fakeVisible');
const fakeAmplitude = document.getElementById('fakeAmplitude');
const fakeWidth = document.getElementById('fakeWidth');
const fakeCenter = document.getElementById('fakeCenter');
const fakeAmplitudeValue = document.getElementById('fakeAmplitudeValue');
const fakeWidthValue = document.getElementById('fakeWidthValue');
const fakeCenterValue = document.getElementById('fakeCenterValue');

// Chart configuration
let chartConfig = {
    type: 'line',
    data: {
        datasets: [
            {
                label: 'Real Votes',
                borderColor: 'rgba(33, 150, 243, 0.7)',  // 50% opacity blue
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
                borderDash: [5, 5],  // Dashed line
                data: []
            },
            {
                label: 'Fake Votes',
                borderColor: 'rgba(244, 67, 54, 0.7)',  // 50% opacity red
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4,
                borderDash: [5, 5],  // Dashed line
                data: []
            },
            {
                label: 'Total Votes',
                borderColor: '#4CAF50',  // Solid green
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
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
                    text: 'Number of ballots per tabulator'
                },
                grid: {
                    display: true
                }
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Fraction Trump',
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                min: 0,
                max: 0.5,
                grid: {
                    display: true,
                    color: '#ddd'
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#333',
                    padding: 5,
                    // Use explicit values for ticks
                    callback: function(value) {
                        return value.toFixed(1);
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                enabled: true
            }
        },
        animation: {
            duration: 0 // Disable animations for better performance
        }
    }
};

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
    const realParams = {
        visible: realVisible.checked,
        amplitude: parseFloat(realAmplitude.value),
        width: parseFloat(realWidth.value),
        center: parseFloat(realCenter.value)
    };
    
    const fakeParams = {
        visible: fakeVisible.checked,
        amplitude: parseFloat(fakeAmplitude.value),
        width: parseFloat(fakeWidth.value),
        center: parseFloat(fakeCenter.value)
    };
    
    // Generate datasets
    const realData = [];
    const fakeData = [];
    const totalData = [];
    
    xValues.forEach(x => {
        // Calculate real vote bell curve value
        const realValue = realParams.visible 
            ? normalDistribution(x, realParams.center, realParams.width, realParams.amplitude) 
            : 0;
        
        // Calculate fake vote bell curve value
        const fakeValue = fakeParams.visible 
            ? normalDistribution(x, fakeParams.center, fakeParams.width, fakeParams.amplitude) 
            : 0;
        
        // Calculate total (sum of both curves)
        const totalValue = realValue + fakeValue;
        
        realData.push({ x, y: realValue });
        fakeData.push({ x, y: fakeValue });
        totalData.push({ x, y: totalValue });
    });
    
    // Update chart data
    bellCurveChart.data.datasets[0].data = realData;
    bellCurveChart.data.datasets[1].data = fakeData;
    bellCurveChart.data.datasets[2].data = totalData;
    
    // Toggle visibility based on checkboxes
    bellCurveChart.data.datasets[0].hidden = !realParams.visible;
    bellCurveChart.data.datasets[1].hidden = !fakeParams.visible;
    
    // Update chart
    bellCurveChart.update();
    
    // Update displayed values
    realAmplitudeValue.textContent = realParams.amplitude.toFixed(2);
    realWidthValue.textContent = realParams.width.toFixed(1);
    realCenterValue.textContent = realParams.center.toFixed(1);
    
    fakeAmplitudeValue.textContent = fakeParams.amplitude.toFixed(2);
    fakeWidthValue.textContent = fakeParams.width.toFixed(1);
    fakeCenterValue.textContent = fakeParams.center.toFixed(1);
}

// Set up event listeners for all controls
realVisible.addEventListener('change', updateChart);
realAmplitude.addEventListener('input', updateChart);
realWidth.addEventListener('input', updateChart);
realCenter.addEventListener('input', updateChart);

fakeVisible.addEventListener('change', updateChart);
fakeAmplitude.addEventListener('input', updateChart);
fakeWidth.addEventListener('input', updateChart);
fakeCenter.addEventListener('input', updateChart);

// Initialize the chart with the default values
document.addEventListener('DOMContentLoaded', updateChart); 
