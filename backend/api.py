import requests
import datetime

def get_bitcoin_data():
    """
    Fetch 30-day historical Bitcoin price data from CoinGecko.
    """
    url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart'
    params = {
        'vs_currency': 'usd',
        'days': '30'
    }
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        prices = {}
        for entry in data.get("prices", []):
            ts, price = entry
            date_str = datetime.datetime.utcfromtimestamp(ts / 1000).strftime('%Y-%m-%d')
            prices[date_str] = price
        return prices
    except Exception as e:
        return {"error": "Failed to fetch Bitcoin data", "details": str(e)}


def get_exchange_data():
    """
    Fetch 30-day historical USD to EUR exchange rate data from Frankfurter.
    """
    range = datetime.timedelta(days=30)
    date_from = datetime.datetime.today()
    date_formatted = str(date_from - range).split(" ")[0]
    print(date_formatted)
    url = (
        f"https://api.frankfurter.dev/v1/{date_formatted}.."
        f"?base=USD&symbols=EUR"
    )
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        if "rates" in data:
            rates = {date: value["EUR"] for date, value in data["rates"].items()}
            return rates
        else:
            return {"error": "Unexpected API response", "details": data}
    except Exception as e:
        return {"error": "Failed to fetch exchange data", "details": str(e)}

def get_melbourne_humidity_data():
    """
    Fetch hourly relative humidity data for Melbourne, Australia (for today)
    using the Open-Meteo API.
    Returns a dictionary mapping time (e.g., '2024-10-11T14:00') to relative humidity.
    """
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": -37.8136,
        "longitude": 144.9631,
        "hourly": "relativehumidity_2m",
        "forecast_days": 1,
        "timezone": "Australia/Melbourne"
    }
    response = requests.get(url, params=params, timeout=10)
    if response.status_code == 200:
        data = response.json()
        hourly = data.get("hourly", {})
        times = hourly.get("time", [])
        humidity = hourly.get("relativehumidity_2m", [])
        result = {time: hum for time, hum in zip(times, humidity)}
        return result
    return {"error": "Failed to fetch humidity data"}
