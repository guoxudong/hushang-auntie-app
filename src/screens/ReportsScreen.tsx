import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button, SegmentedButtons } from 'react-native-paper';
import { LineChart, BarChart } from 'react-native-chart-kit';

const ReportsScreen = () => {
  const [timeRange, setTimeRange] = React.useState('week');

  const screenWidth = Dimensions.get('window').width - 40;

  const salesData = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        data: [2800, 3100, 2950, 4200, 3800, 5200, 4800],
        color: (opacity = 1) => `rgba(255, 107, 139, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const inventoryData = {
    labels: ['珍珠', '茶叶', '牛奶', '糖浆', '布丁', '芋圆'],
    datasets: [
      {
        data: [85, 35, 70, 90, 15, 60],
      },
    ],
  };

  const popularItems = [
    { name: '珍珠奶茶', sales: 156, percentage: 32 },
    { name: '布丁奶茶', sales: 112, percentage: 23 },
    { name: '芋圆奶茶', sales: 98, percentage: 20 },
    { name: '水果茶', sales: 75, percentage: 15 },
    { name: '咖啡', sales: 42, percentage: 9 },
  ];

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>经营报表</Text>
        <Text style={styles.subtitle}>数据分析与业绩概览</Text>
      </View>

      <Card style={styles.filterCard}>
        <Card.Content>
          <SegmentedButtons
            value={timeRange}
            onValueChange={setTimeRange}
            buttons={[
              { value: 'day', label: '日' },
              { value: 'week', label: '周' },
              { value: 'month', label: '月' },
              { value: 'quarter', label: '季' },
            ]}
            style={styles.segmentedButtons}
          />
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>销售趋势分析</Title>
          <LineChart
            data={salesData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>¥32,540</Text>
              <Text style={styles.statLabel}>周销售额</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>+12.5%</Text>
              <Text style={styles.statLabel}>环比增长</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>483杯</Text>
              <Text style={styles.statLabel}>总销量</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>库存状态分布</Title>
          <BarChart
            data={inventoryData}
            width={screenWidth}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            }}
            showValuesOnTopOfBars
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.listCard}>
        <Card.Content>
          <Title style={styles.listTitle}>热门饮品排行</Title>
          {popularItems.map((item, index) => (
            <View key={item.name} style={styles.listItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemRank}>#{index + 1}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <View style={styles.itemStats}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${item.percentage}%` }]} 
                  />
                </View>
                <Text style={styles.itemSales}>{item.sales} 杯</Text>
                <Text style={styles.itemPercentage}>{item.percentage}%</Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <Title style={styles.summaryTitle}>本周经营总结</Title>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>平均客单价</Text>
            <Text style={styles.summaryValue}>¥15.8</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>最高单日销售额</Text>
            <Text style={styles.summaryValue}>¥5,200 (周六)</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>库存周转率</Text>
            <Text style={styles.summaryValue}>4.2次/周</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>毛利率</Text>
            <Text style={[styles.summaryValue, styles.profitValue]}>68.5%</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button mode="contained" icon="download" style={styles.exportButton}>
          导出报表
        </Button>
        <Button mode="outlined" icon="printer" style={styles.printButton}>
          打印报表
        </Button>
      </View>
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
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  filterCard: {
    margin: 10,
    marginTop: 0,
  },
  segmentedButtons: {
    marginVertical: 5,
  },
  chartCard: {
    margin: 10,
  },
  chartTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  listCard: {
    margin: 10,
  },
  listTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B8B',
    width: 30,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
  },
  itemStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B8B',
    borderRadius: 4,
  },
  itemSales: {
    fontSize: 12,
    color: '#666',
    width: 50,
    textAlign: 'right',
  },
  itemPercentage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    width: 35,
    textAlign: 'right',
  },
  summaryCard: {
    margin: 10,
  },
  summaryTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  profitValue: {
    color: '#4CAF50',
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  exportButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#FF6B8B',
  },
  printButton: {
    flex: 1,
    marginLeft: 5,
    borderColor: '#FF6B8B',
  },
});

export default ReportsScreen;