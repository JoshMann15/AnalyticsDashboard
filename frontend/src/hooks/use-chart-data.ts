import { useQuery } from "@tanstack/react-query";

export interface ChartData {
  id: number;
  title: string;
  data: number[];
  labels: string[];
}

const fetchChartData = async (): Promise<ChartData[]> => {
  const [bitcoinResponse, exchangeResponse, humidityResponse] = await Promise.all([
    fetch("http://127.0.0.1:5000/api/data/bitcoin"),
    fetch("http://127.0.0.1:5000/api/data/exchange"),
    fetch("http://127.0.0.1:5000/api/data/humidity"),
  ]);

  if (!bitcoinResponse.ok || !exchangeResponse.ok || !humidityResponse.ok) {
    throw new Error("Failed to fetch data from backend");
  }


  const bitcoinData = await bitcoinResponse.json();
  const exchangeData = await exchangeResponse.json();
  const humidityData = await humidityResponse.json();

  const bitcoinDates = Object.keys(bitcoinData).sort();
  const bitcoinChart: ChartData = {
    id: 1,
    title: "Bitcoin Price (USD) - Last 30 Days",
    data: bitcoinDates.map(date => bitcoinData[date]),
    labels: bitcoinDates,
  };


  const exchangeDates = Object.keys(exchangeData).sort();
  const exchangeChart: ChartData = {
    id: 2,
    title: "USD to EUR Exchange Rate - Last 30 Days",
    data: exchangeDates.map(date => exchangeData[date]),
    labels: exchangeDates,
  };

  const humidityTimes = Object.keys(humidityData).sort();
  const humidityChart: ChartData = {
    id: 3,
    title: "Melbourne Humidity (Relative) - Today",
    data: humidityTimes.map(time => humidityData[time]),
    labels: humidityTimes.map(time => time.substring(11, 16)),
  };

  return [bitcoinChart, exchangeChart, humidityChart];
};

export const useChartData = () => {
  return useQuery({
    queryKey: ["charts"],
    queryFn: fetchChartData,
  });
};
