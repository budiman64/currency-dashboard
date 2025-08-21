// netlify/functions/get-rates.js

// This is an async handler function for Netlify Functions
exports.handler = async function (event, context) {
  // Get the API key from the environment variables
  const apiKey = process.env.EXCHANGE_RATE_API_KEY
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`

  try {
    // Fetch data from the external API
    const response = await fetch(apiUrl)
    const data = await response.json()

    // Return a successful response
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    }
  }
}
