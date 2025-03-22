# Russian Tail Playground

This interactive visualization demonstrates the "Russian Tail" phenomenon in election data analysis. It allows users to visualize how two overlapping bell curves (one representing genuine votes and another representing potentially fraudulent votes) can be detected in combined election results.

## What is the "Russian Tail"?

The "Russian Tail" refers to an anomaly in election data where the combined distribution shows a telltale pattern of two overlapping normal distributions:
- One bell curve representing legitimate votes
- A second bell curve (often shifted to the right) representing potentially fraudulent votes

When these two distributions are combined, the resulting distribution may show a characteristic "tail" or asymmetry that differs from what would be expected in a single normal distribution.

## Features

- Interactive visualization of two bell curves (real and fake votes) and their sum
- Controls to adjust the amplitude, width, and center point of each distribution
- Toggle visibility of each curve to see how they contribute to the total
- Real-time updates as parameters are adjusted

## Usage

1. Open `index.html` in any modern web browser
2. Use the sliders to adjust the parameters of each bell curve:
   - **Amplitude**: Height of the bell curve
   - **Width (σ)**: Standard deviation of the normal distribution
   - **Center (μ)**: Mean of the normal distribution
3. Use the checkboxes to toggle the visibility of each curve
4. Observe how the combined "Total Votes" line changes as you adjust the parameters

By default, the visualization starts with:
- Real votes centered at x=8 with width 1.5
- Fake votes centered at x=11 with width 1.2
- Fake votes having approximately 1/4 the amplitude of real votes

## Technical Implementation

This playground is built using:
- HTML for structure
- CSS for styling
- JavaScript for interactivity
- Chart.js for visualization

The bell curves are generated using the normal distribution formula:

```
f(x) = amplitude * e^(-0.5 * ((x - mean)/stdDev)²)
```

Where:
- `amplitude` controls the height
- `mean` is the center point
- `stdDev` is the standard deviation that controls the width
