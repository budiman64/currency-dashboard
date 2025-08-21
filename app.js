// app.js

// Wait for the HTML to be fully loaded before running the scripts
document.addEventListener('DOMContentLoaded', () => {
  // --- Configuration ---
  // No API key is needed here
  const baseUrl = `/.netlify/functions/get-rates`

  // --- DOM Elements ---
  const ratesList = document.getElementById('rates-list')
  const chartCanvas = document.getElementById('currencyChart')

  // --- Main Function to Fetch and Display Data ---
  async function getAndDisplayRates() {
    try {
      // Fetch data from the API
      const response = await fetch(baseUrl)
      const data = await response.json()

      // Check if the API request was successful
      if (data.result === 'success') {
        const rates = data.conversion_rates

        // Display rates as text
        displayRates(rates)

        // Create the visual chart
        createChart(rates)
      } else {
        ratesList.innerHTML =
          '<li>Could not fetch data. Please check your API key.</li>'
        console.error('API Error:', data['error-type'])
      }
    } catch (error) {
      ratesList.innerHTML =
        '<li>An error occurred. Please try again later.</li>'
      console.error('Fetch Error:', error)
    }
  }

  // --- Helper Function to Display Rates in a List ---
  function displayRates(rates) {
    ratesList.innerHTML = '' // Clear the "Loading..." text
    const targetCurrencies = ['MYR', 'JPY', 'EUR', 'SGD', 'AUD']

    targetCurrencies.forEach((currency) => {
      const rate = rates[currency]
      const listItem = document.createElement('li')
      listItem.textContent = `1 USD = ${rate} ${currency}`
      ratesList.appendChild(listItem)
    })
  }

  // --- Helper Function to Create the Chart.js Chart ---
  function createChart(rates) {
    const targetCurrencies = ['MYR', 'JPY', 'EUR', 'SGD', 'AUD']
    const chartLabels = targetCurrencies
    const chartData = targetCurrencies.map((currency) => rates[currency])

    new Chart(chartCanvas, {
      type: 'bar', // Type of chart
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Value against 1 USD',
            data: chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false, // We don't need a legend for a single dataset
          },
        },
      },
    })
  }

  // --- Initial Call ---
  getAndDisplayRates()
})
