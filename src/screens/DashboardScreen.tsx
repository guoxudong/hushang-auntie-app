import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Card, Title, Paragraph, Button, Badge } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';

// 模拟数据
const mockData = {
  todaySales: 12850,
  totalCups: 320,
  lowStockItems: 5,
  pendingOrders: 2,
  topDrinks: [
    { name: '珍珠奶茶', cups: 85, revenue: 4250 },
    { name: '芝士奶盖绿', cups: 62, revenue: 3720 },
    { name: '杨枝甘露', cups: 48, revenue: 2880 },
  ],
  hourlySales: [
    { hour: '10:00', sales: 800 },
    { hour: '11:00', sales: 1200 },
    { hour: '12:00', sales: 2500 },
    { hour: '13:00', sales: 1800 },
    { hour: '14:00', sales: 1500 },
    { hour: '15:00', sales: 2200 },
    { hour: '16:00', sales: 1900 },
    { hour: '17:00', sales: 2400 },
  ],
};

const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(mockData);

  const onRefresh = () => {
    setRefreshing(true);
    // 模拟数据刷新
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const chartData = {
    labels: dashboardData.hourlySales.map(item => item.hour),
    datasets: [
      {
        data: dashboardData.hourlySales.map(item => item.sales),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
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
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* 欢迎区域 */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>早上好，郭先生！</Text>
        <Text style={styles.dateText}>2026年3月25日 星期三</Text>
      </View>

      {/* 关键指标卡片 */}
      <View style={styles.metricsContainer}>
        <Card style={styles.metricCard}>
          <Card.Content>
            <View style={styles.metricHeader}>
              <Ionicons name="cash-outline" size={24} color="#4CAF50" />
              <Text style={styles.metricLabel}>今日销售额</Text>
            </View>
            <Text style={styles.metricValue}>¥{dashboardData.todaySales.toLocaleString()}</Text>
            <Text style={styles.metricSubtext}>较昨日 +12%</Text>
          </Card.Content>
        </Card>

        <Card style={styles.metricCard}>
          <Card.Content>
            <View style={styles.metricHeader}>
              <Ionicons name="cafe-outline" size={24} color="#2196F3" />
              <Text style={styles.metricLabel}>今日杯数</Text>
            </View>
            <Text style={styles.metricValue}>{dashboardData.totalCups}</Text>
            <Text style={styles.metricSubtext}>平均¥40/杯</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.metricsContainer}>
        <Card style={styles.metricCard}>
          <Card.Content>
            <View style={styles.metricHeader}>
              <Ionicons name="warning-outline" size={24} color="#FF9800" />
              <Text style={styles.metricLabel}>低库存物料</Text>
            </View>
            <Text style={styles.metricValue}>{dashboardData.lowStockItems}</Text>
            <Text style={styles.metricSubtext}>需要补货</Text>
          </Card.Content>
        </Card>

        <Card style={styles.metricCard}>
          <Card.Content>
            <View style={styles.metricHeader}>
              <Ionicons name="document-text-outline" size={24} color="#9C27B0" />
              <Text style={styles.metricLabel}>待处理订单</Text>
            </View>
            <Text style={styles.metricValue}>{dashboardData.pendingOrders}</Text>
            <Text style={styles.metricSubtext}>需要确认</Text>
          </Card.Content>
        </Card>
      </View>

      {/* 销售趋势图表 */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>今日销售趋势</Title>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* 热门饮品 */}
      <Card style={styles.topDrinksCard}>
        <Card.Content>
          <Title>今日热门饮品TOP3</Title>
          {dashboardData.topDrinks.map((drink, index) => (
            <View key={index} style={styles.drinkItem}>
              <View style={styles.drinkRank}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>
              <View style={styles.drinkInfo}>
                <Text style={styles.drinkName}>{drink.name}</Text>
                <Text style={styles.drinkStats}>{drink.cups}杯 ¥{drink.revenue}</Text>
              </View>
              <View style={styles.drinkPercentage}>
                <Text style={styles.percentageText}>
                  {Math.round((drink.cups / dashboardData.totalCups) * 100)}%
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* 快速操作 */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>快速操作</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle-outline" size={32} color="#FF6B8B" />
            <Text style={styles.actionText}>盘点库存</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cart-outline" size={32} color="#4CAF50" />
            <Text style={styles.actionText}>销售录入</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics-outline" size={32} color="#2196F3" />
            <Text style={styles.actionText}>生成订单</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text-outline" size={32} color="#9C27B0" />
            <Text style={styles.actionText}>查看报表</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 库存预警 */}
      {dashboardData.lowStockItems > 0 && (
        <Card style={styles.warningCard}>
          <Card.Content>
            <View style={styles.warningHeader}>
              <Ionicons name="warning" size={24} color="#FF9800" />
              <Title style={styles.warningTitle}>库存预警</Title>
            </View>
            <Paragraph>
              当前有 {dashboardData.lowStockItems} 种物料库存低于安全水平，建议立即补货。
            </Paragraph>
            <Button 
              mode="contained" 
              style={styles.warningButton}
              onPress={() => console.log('跳转到库存管理')}
            >
              查看详情
            </Button>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF6B8B',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  metricsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    margin: 5,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  metricSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  chartCard: {
    margin: 10,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  topDrinksCard: {
    margin: 10,
    elevation: 2,
  },
  drinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drinkRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B8B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
  },
  drinkInfo: {
    flex: 1,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  drinkStats: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  drinkPercentage: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    width: 80,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  warningCard: {
    margin: 10,
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
    elevation: 2,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  warningTitle: {
    marginLeft: 10,
    color: '#FF9800',
  },
  warningButton: {
    marginTop: 10,
    backgroundColor: '#FF9800',
  },
});

export default DashboardScreen;