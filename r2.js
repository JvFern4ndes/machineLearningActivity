// Função principal para calcular regressão linear e R²
function calculateLinearRegression(data) {
	const n = data.length;

	// Calculando as somas necessárias
	let sumX = 0,
		sumY = 0,
		sumXY = 0,
		sumX2 = 0,
		sumY2 = 0;

	for (let i = 0; i < n; i++) {
		const x = data[i][0];
		const y = data[i][1];

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
	let ssr = 0,
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

// Exemplo de uso com dados fictícios de Bitcoin
const bitcoinData = [
	[1, 30000], // [dia, preço]
	[2, 31000],
	[3, 30500],
	[4, 32000],
	[5, 31500],
];

// Testando a função
const result = calculateLinearRegression(bitcoinData);
console.log("Equação da reta:", result.equation);
console.log("Inclinação (m):", result.slope);
console.log("Intercepto (b):", result.intercept);
console.log("R²:", result.r2);

// Função para fazer previsões usando o modelo
function predictPrice(x, model) {
	return model.slope * x + model.intercept;
}

// Exemplo de previsão
const predictedPrice = predictPrice(6, result);
console.log("Preço previsto para dia 6:", predictedPrice);
