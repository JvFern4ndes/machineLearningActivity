// Função para buscar dados históricos do Bitcoin
async function getBitcoinHistoricalData() {
	try {
		const response = await fetch(
			"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=50&interval=daily",
		);
		const data = await response.json();

		// Converte os dados em formato [x, y], onde x é o índice do dia (0 a 49) e y é o preço
		const priceArray = data.prices.map(([timestamp, price], index) => [
			index,
			price,
		]);

		return priceArray;
	} catch (error) {
		console.error("Erro ao buscar dados:", error);
		return [];
	}
}

// Função principal para calcular regressão linear e R²
function calculateLinearRegression(data) {
	const n = data.length;

	// Calculando as somas necessárias
	let sumX;
	let sumY;
	let sumXY;
	let sumX2;
	let sumY2;

	sumX = 0;
	sumY = 0;
	sumXY = 0;
	sumX2 = 0;
	sumY2 = 0;

	for (let i = 0; i < n; i++) {
		const x = data[i][0]; // Índice do dia
		const y = data[i][1]; // Preço

		sumX += x;
		sumY += y;
		sumXY += x * y;
		sumX2 += x * x;
		sumY2 += y * y;
	}

	// Calculando os coeficientes da reta (y = mx + b)
	const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX); // inclinação
	const b = (sumY - m * sumX) / n; // intercepto

	// Calculando R²
	const yMean = sumY / n;

	// Soma dos quadrados da regressão (SSR) e total (SST)
	let ssr;
	let sst;

	ssr = 0;
	sst = 0;

	for (let i = 0; i < n; i++) {
		const x = data[i][0];
		const y = data[i][1];
		const yPredicted = m * x + b;

		ssr += Math.pow(yPredicted - yMean, 2);
		sst += Math.pow(y - yMean, 2);
	}

	const r2 = ssr / sst;

	return {
		slope: m, // inclinação da reta
		intercept: b, // intercepto
		r2: r2, // coeficiente de determinação
		equation: `y = ${m.toFixed(4)}x + ${b.toFixed(4)}`, // equação da reta
	};
}

// Função para fazer previsões
function predictPrice(x, model) {
	return model.slope * x + model.intercept;
}

// Função principal que integra tudo
async function analyzeBitcoinTrend() {
	// Busca os dados
	const bitcoinData = await getBitcoinHistoricalData();

	if (bitcoinData.length === 0) {
		console.log("Nenhum dado disponível para análise.");
		return;
	}

	// Calcula a regressão
	const result = calculateLinearRegression(bitcoinData);

	// Exibe os resultados
	console.log("Equação da reta:", result.equation);
	console.log("Inclinação (m):", result.slope);
	console.log("Intercepto (b):", result.intercept);
	console.log("R²:", result.r2);

	// Faz uma previsão para o dia 51 (próximo dia após os 50 dias)
	const nextDay = 50;
	const predictedPrice = predictPrice(nextDay, result);
	console.log(`Preço previsto para o dia ${nextDay + 1}:`, predictedPrice);
}

// Executa a análise
analyzeBitcoinTrend();
