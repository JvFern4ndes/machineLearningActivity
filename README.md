# machineLearningActivity

Análise de Tendência de Preços do Bitcoin com Regressão Linear
Introdução
Este trabalho apresenta o desenvolvimento de um programa em JavaScript que realiza a análise de dados históricos de preços do Bitcoin utilizando regressão linear. O objetivo foi obter uma equação da reta que represente a tendência dos preços ao longo de 50 dias, calcular o coeficiente de determinação (R²) para avaliar o ajuste do modelo e visualizar os resultados em um gráfico interativo. O código integra a obtenção de dados reais via API, cálculos matemáticos e visualização gráfica, utilizando ferramentas modernas como o Chart.js.
Estrutura do Código
O programa foi dividido em funções específicas, cada uma com uma responsabilidade bem definida:
1.	getBitcoinHistoricalData()
Esta função é responsável por buscar os dados históricos do Bitcoin através da API pública da CoinGecko. A URL utilizada (https://api.coingecko.com/api/v3/coins/bitcoin/market_chart) permite configurar parâmetros como a moeda de referência (vs_currency=usd), o número de dias (days=50) e o intervalo dos dados (interval=daily). O retorno da API é um objeto JSON contendo os preços em um array de pares [timestamp, preço]. Esses dados são transformados em um formato utilizável pelo programa, onde o eixo x é o índice do dia (de 0 a 49) e o eixo y é o preço em dólares. A função usa async/await para lidar com a natureza assíncrona da requisição HTTP e inclui tratamento de erros com try/catch.
2.	calculateLinearRegression(data)
Esta é a função central do programa, que implementa o método dos mínimos quadrados para calcular a regressão linear. A equação da reta é dada por y = mx + b, onde:
•	m (inclinação) é calculado como (n * Σxy - Σx * Σy) / (n * Σx² - (Σx)²).
•	b (intercepto) é calculado como (Σy - m * Σx) / n. Aqui, n é o número de pontos (50 dias), Σx é a soma dos índices dos dias, Σy é a soma dos preços, Σxy é a soma dos produtos de x e y, e Σx² é a soma dos quadrados dos índices.
Além disso, o coeficiente de determinação (R²) é calculado para medir a qualidade do ajuste da reta aos dados. Ele é dado por R² = SSR / SST, onde SSR (soma dos quadrados da regressão) é a variação explicada pelo modelo e SST (soma total dos quadrados) é a variação total dos dados em relação à média dos preços (yMean). O resultado é retornado como um objeto contendo slope (m), intercept (b), r2 e a equation da reta.
3.	predictPrice(x, model)
Esta função simples usa a equação da reta (y = mx + b) para prever o preço do Bitcoin em um determinado dia x, com base nos coeficientes calculados pelo modelo de regressão.
4.	createChart(data, model)
Para visualizar os resultados, utilizamos a biblioteca Chart.js, que cria um gráfico de dispersão (scatter) interativo. O gráfico contém dois conjuntos de dados:
•	Preços Reais: Representados por pontos azuis, extraídos diretamente dos dados históricos.
•	Reta de Regressão: Uma linha vermelha que conecta os valores previstos pelo modelo para cada dia. O eixo x representa os dias (0 a 49), e o eixo y representa os preços em USD. O título do gráfico inclui o valor de R², e os eixos são rotulados para facilitar a interpretação.
5.	analyzeAndPlotBitcoinTrend()
Esta função principal coordena todo o processo: busca os dados, calcula a regressão, exibe os resultados no console (equação, inclinação, intercepto, R² e uma previsão para o dia 51) e, por fim, chama a função de criação do gráfico. Ela também verifica se os dados foram obtidos com sucesso antes de prosseguir.
Metodologia
Os dados foram obtidos da CoinGecko, uma fonte confiável e gratuita, cobrindo 50 dias de preços diários do Bitcoin em dólares americanos. O período foi definido pela constante DAYS = 50, que pode ser ajustada conforme necessário. O uso do índice do dia como x simplifica os cálculos, embora timestamps reais possam ser usados com normalização adicional.
A regressão linear foi escolhida por ser um modelo simples e interpretável para identificar tendências lineares. O R² fornece uma métrica objetiva do ajuste: valores próximos de 1 indicam que a reta explica bem a variação dos preços, enquanto valores próximos de 0 sugerem pouca relação linear.
A visualização com Chart.js foi implementada para facilitar a análise visual, permitindo observar a dispersão dos preços reais em relação à tendência prevista.
Resultados
Ao executar o programa, obtemos:
•	Equação da reta: Uma string no formato y = mx + b, onde m e b são arredondados para 4 casas decimais.
•	Inclinação (m): Indica a variação média do preço por dia (positiva para tendência de alta, negativa para baixa).
•	Intercepto (b): O preço estimado no dia 0.
•	R²: Uma medida entre 0 e 1 que avalia o ajuste do modelo.
•	Previsão: O preço estimado para o dia seguinte ao período analisado (dia 51).
•	Gráfico: Uma representação visual com pontos reais e a linha de tendência.
Os valores exatos dependem dos dados retornados pela API no momento da execução, que refletem o mercado real até 31 de março de 2025 (data atual do sistema).
Conclusão
O programa demonstra a aplicação prática de conceitos de programação, estatística e visualização de dados. Ele pode ser expandido para incluir mais dias, usar timestamps reais no eixo x, ou incorporar outras métricas estatísticas. A integração com a API da CoinGecko e o uso do Chart.js mostram como ferramentas modernas podem ser combinadas para resolver problemas reais, como a análise de tendências de criptomoedas.
