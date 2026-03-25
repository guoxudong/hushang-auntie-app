import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Slider, Badge } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LineChart, PieChart } from 'react-native-chart-kit';

// 模拟数据
const predictionData = [
  {
    id: '1',
    materialName: '珍珠奶茶茶叶',
    currentStock: 12500,
    safetyStock: 7500,
    predictedDemand: 18000,
    recommendedOrder: 13000,
    confidence: 'high',
    factors: [
      { name: '历史趋势', weight: 0.4, impact: +0.15 },
      { name: '天气影响', weight: 0.3, impact: +0.08 },
      { name: '节假日', weight: 0.2, impact: +0.12 },
      { name: '新品上市', weight: 0.1, impact: +0.05 },
    ],
  },
  {
    id: '2',
    materialName: '黑糖珍珠',
    currentStock: 8500,
    safetyStock: 6250,
    predictedDemand: 12000,
    recommendedOrder: 10000,
    confidence: 'medium',
    factors: [
      { name: '历史趋势', weight: 0.5, impact: +0.10 },
      { name: '天气影响', weight: 0.2, impact: -0.05 },
      { name: '节假日', weight: 0.2, impact: +0.08 },
      { name: '新品上市', weight: 0.1, impact: +0.03 },
    ],
  },
  {
    id: '3',
    materialName: '芝士奶盖粉',
    currentStock: 1200,
    safetyStock: 3000,
    predictedDemand: 6000,
    recommendedOrder: 7800,
    confidence: 'high',
    factors: [
      { name: '历史趋势', weight: 0.6, impact: +0.20 },
      { name: '天气影响', weight: 0.2, impact: +0.10 },
      { name: '节假日', weight: 0.1, impact: +0.05 },
      { name: '新品上市', weight: 0.1, impact: +0.02 },
    ],
  },
];

const weatherData = {
  current: { temp: 28, weather: '晴', humidity: 65 },
  forecast: [
    { day: '今天', temp: 28, weather: '晴' },
    { day: '明天', temp: 26, weather: '多云' },
    { day: '后天', temp: 24, weather: '小雨' },
    { day: '大后天', temp: 25, weather: '阴' },
  ],
};

const historicalDemand = [
  { date: '3/18', demand: 15000 },
  { date: '3/19', demand: 14500 },
  { date: '3/20', demand: 16000 },
  { date: '3/21', demand: 15500 },
  { date: '3/22', demand: 17000 },
  { date: '3/23', demand: 16500 },
  { date: '3/24', demand: 18000 },
  { date: '3/25', demand: 17500 },
];

const OrderPredictionScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('recommended');
  const [weatherEnabled, setWeatherEnabled] = useState(true);
  const [holidayEnabled, setHolidayEnabled] = useState(true);
  const [trendEnabled, setTrendEnabled] = useState(true);
  const [predictionPeriod, setPredictionPeriod] = useState(7);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'low':
        return '#FF5252';
      default:
        return '#757575';
    }
  };

  const getConfidenceText = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return '高置信度';
      case 'medium':
        return '中置信度';
      case 'low':
        return '低置信度';
      default:
        return '未知';
    }
  };

  const calculateTotalOrderValue = () => {
    return predictionData.reduce((total, item) => {
      return total + item.recommendedOrder;
    }, 0);
  };

  const generateOrder = () => {
    // 这里应该处理生成订单的逻辑
    alert(`已生成订单，总价值：${calculateTotalOrderValue().toLocaleString()}克`);
  };

  const demandChartData = {
    labels: historicalDemand.map(item => item.date),
    datasets: [
      {
        data: historicalDemand.map(item => item.demand / 1000), // 转换为千克
        color: (opacity = 1) => `rgba(255, 107, 139, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const factorChartData = predictionData[0].factors.map((factor, index) => ({
    name: factor.name,
    weight: factor.weight * 100,
    color: ['#FF6B8B', '#4CAF50', '#2196F3', '#9C27B0'][index],
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  return (
    <ScrollView style={styles.container}>
      {/* 预测方案选择 */}
      <Card style={styles.planSelectionCard}>
        <Card.Content>
          <Title>预测方案选择</Title>
          <View style={styles.planButtons}>
            <TouchableOpacity
              style={[
                styles.planButton,
                selectedPlan === 'conservative' && styles.selectedPlanButton,
              ]}
              onPress={() => setSelectedPlan('conservative')}
            >
              <Ionicons
                name="shield-outline"
                size={24}
                color={selectedPlan === 'conservative' ? 'white' : '#666'}
              />
              <Text
                style={[
                  styles.planButtonText,
                  selectedPlan === 'conservative' && styles.selectedPlanButtonText,
                ]}
              >
                保守方案
              </Text>
              <Text
                style={[
                  styles.planDescription,
                  selectedPlan === 'conservative' && styles.selectedPlanDescription,
                ]}
              >
                基于历史最低增长
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.planButton,
                selectedPlan === 'recommended' && styles.selectedPlanButton,
              ]}
              onPress={() => setSelectedPlan('recommended')}
            >
              <Ionicons
                name="bulb-outline"
                size={24}
                color={selectedPlan === 'recommended' ? 'white' : '#666'}
              />
              <Text
                style={[
                  styles.planButtonText,
                  selectedPlan === 'recommended' && styles.selectedPlanButtonText,
                ]}
              >
                推荐方案
              </Text>
              <Text
                style={[
                  styles.planDescription,
                  selectedPlan === 'recommended' && styles.selectedPlanDescription,
                ]}
              >
                综合所有因素
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.planButton,
                selectedPlan === 'aggressive' && styles.selectedPlanButton,
              ]}
              onPress={() => setSelectedPlan('aggressive')}
            >
              <Ionicons
                name="trending-up-outline"
                size={24}
                color={selectedPlan === 'aggressive' ? 'white' : '#666'}
              />
              <Text
                style={[
                  styles.planButtonText,
                  selectedPlan === 'aggressive' && styles.selectedPlanButtonText,
                ]}
              >
                激进方案
              </Text>
              <Text
                style={[
                  styles.planDescription,
                  selectedPlan === 'aggressive' && styles.selectedPlanDescription,
                ]}
              >
                基于历史最高增长
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>

      {/* 天气信息 */}
      <Card style={styles.weatherCard}>
        <Card.Content>
          <View style={styles.weatherHeader}>
            <Title>天气影响分析</Title>
            <Switch
              value={weatherEnabled}
              onValueChange={setWeatherEnabled}
              color="#4CAF50"
            />
          </View>
          
          {weatherEnabled && (
            <>
              <View style={styles.currentWeather}>
                <Ionicons name="sunny" size={48} color="#FF9800" />
                <View style={styles.weatherInfo}>
                  <Text style={styles.weatherTemp}>{weatherData.current.temp}°C</Text>
                  <Text style={styles.weatherDesc}>{weatherData.current.weather}</Text>
                  <Text style={styles.weatherHumidity}>湿度: {weatherData.current.humidity}%</Text>
                </View>
              </View>

              <Text style={styles.weatherImpact}>预计对冷饮销量提升: +15%</Text>

              <View style={styles.weatherForecast}>
                {weatherData.forecast.map((day, index) => (
                  <View key={index} style={styles.forecastDay}>
                    <Text style={styles.forecastDayName}>{day.day}</Text>
                    <Ionicons
                      name={day.weather === '晴' ? 'sunny' : day.weather === '小雨' ? 'rainy' : 'cloud'}
                      size={24}
                      color="#2196F3"
                    />
                    <Text style={styles.forecastTemp}>{day.temp}°</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </Card.Content>
      </Card>

      {/* 预测因素配置 */}
      <Card style={styles.factorsCard}>
        <Card.Content>
          <Title>预测因素配置</Title>
          
          <View style={styles.factorToggle}>
            <View style={styles.factorInfo}>
              <Ionicons name="stats-chart" size={24} color="#2196F3" />
              <Text style={styles.factorName}>历史趋势因素</Text>
            </View>
            <Switch
              value={trendEnabled}
              onValueChange={setTrendEnabled}
              color="#2196F3"
            />
          </View>

          <View style={styles.factorToggle}>
            <View style={styles.factorInfo}>
              <Ionicons name="calendar" size={24} color="#9C27B0" />
              <Text style={styles.factorName}>节假日因素</Text>
            </View>
            <Switch
              value={holidayEnabled}
              onValueChange={setHolidayEnabled}
              color="#9C27B0"
            />
          </View>

          <View style={styles.factorSlider}>
            <Text style={styles.sliderLabel}>预测周期: {predictionPeriod}天</Text>
            <Slider
              value={predictionPeriod}
              onValueChange={setPredictionPeriod}
              minimumValue={1}
              maximumValue={30}
              step={1}
              style={styles.slider}
            />
            <View style={styles.sliderMarks}>
              <Text style={styles.sliderMark}>1天</Text>
              <Text style={styles.sliderMark}>7天</Text>
              <Text style={styles.sliderMark}>15天</Text>
              <Text style={styles.sliderMark}>30天</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* 需求趋势图表 */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>需求趋势分析</Title>
          <LineChart
            data={demandChartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 107, 139, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#FF6B8B',
              },
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* 因素权重分析 */}
      <Card style={styles.weightCard}>
        <Card.Content>
          <Title>因素权重分析</Title>
          <PieChart
            data={factorChartData}
            width={Dimensions.get('window').width - 40}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="weight"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.pieChart}
          />
        </Card.Content>
      </Card>

      {/* 预测结果 */}
      <Card style={styles.resultsCard}>
        <Card.Content>
          <View style={styles.resultsHeader}>
            <Title>智能订货建议</Title>
            <Badge style={styles.resultsBadge}>{predictionData.length}项</Badge>
          </View>

          {predictionData.map(item => (
            <View key={item.id} style={styles.predictionItem}>
              <View style={styles.itemHeader}>
                <Text style={styles.materialName}>{item.materialName}</Text>
                <View style={[
                  styles.confidenceBadge,
                  { backgroundColor: getConfidenceColor(item.confidence) }
                ]}>
                  <Text style={styles.confidenceText}>
                    {getConfidenceText(item.confidence)}
                  </Text>
                </View>
              </View>

              <View style={styles.stockInfo}>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>当前库存</Text>
                  <Text style={styles.stockValue}>{item.currentStock.toLocaleString()}</Text>
                </View>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>安全库存</Text>
                  <Text style={styles.stockValue}>{item.safetyStock.toLocaleString()}</Text>
                </View>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>预测需求</Text>
                  <Text style={styles.stockValue}>{item.predictedDemand.toLocaleString()}</Text>
                </View>
                <View style={styles.stockItem}>
                  <Text style={styles.stockLabel}>建议订货</Text>
                  <Text style={[styles.stockValue, styles.recommendedValue]}>
                    {item.recommendedOrder.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.factorsContainer}>
                {item.factors.map((factor, index) => (
                  <Chip
                    key={index}
                    style={styles.factorChip}
                    textStyle={styles.factorChipText}
                  >
                    {factor.name}: {factor.impact > 0 ? '+' : ''}{factor.impact * 100}%
                  </Chip>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.totalOrder}>
            <Text style={styles.totalLabel}>总建议订货量</Text>
            <Text style={styles.totalValue}>{calculateTotalOrderValue().toLocaleString()}克</Text>
          </View>

          <Button
            mode="contained"
            style={styles.generateButton}
            onPress={generateOrder}
            icon="file-document-outline"
          >
            生成采购订单
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  planSelectionCard: {
    margin: 10,
    elevation: 2,
  },
  planButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  planButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    margin: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPlanButton: {
    backgroundColor: '#FF6B8B',
    borderColor: '#FF6B8B',
  },
  planButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 5,
  },
  selectedPlanButtonText: {
    color: 'white',
  },
  planDescription: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    textAlign: 'center',
  },
  selectedPlanDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  weatherCard: {
    margin: 10,
    elevation: 2,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  currentWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherInfo: {
    marginLeft: 15,
  },
  weatherTemp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherDesc: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  weatherHumidity: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  weatherImpact: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 15,
  },
  weatherForecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastDay: {
    alignItems: 'center',
  },
  forecastDayName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  forecastTemp: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 5,
  },
  factorsCard: {
    margin: 10,
    elevation: 2,
  },
  factorToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  factorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  factorName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  factorSlider: {
    marginTop: 15,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  slider: {
    height: 40,
  },
  sliderMarks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderMark: {
    fontSize: 12,
    color: '#999',
  },
  chartCard: {
    margin: 10,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  weightCard: {
    margin: 10,
    elevation: 2,
  },
  pieChart: {
    marginVertical: 8,
  },
  resultsCard: {
    margin: 10,
    marginBottom: 20,
    elevation: 2,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultsBadge: {
    backgroundColor: '#FF6B8B',
  },
  predictionItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  materialName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  confidenceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stockItem: {
    alignItems: 'center',
    flex: 1,
  },
  stockLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  stockValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  recommendedValue: {
    color: '#FF6B8B',
    fontWeight: 'bold',
  },
  factorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  factorChip: {
    margin: 2,
    backgroundColor: 'white',
  },
  factorChipText: {
    fontSize: 12,
  },
  totalOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B8B',
  },
  generateButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
  },
});

export default OrderPredictionScreen;