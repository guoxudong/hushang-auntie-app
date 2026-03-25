import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, ProgressBar, Chip } from 'react-native-paper';

const InventoryDetailScreen = ({ route, navigation }: any) => {
  // 模拟数据
  const material = {
    id: '1',
    name: '珍珠',
    category: '配料',
    currentStock: 85,
    minStock: 20,
    maxStock: 100,
    unit: 'kg',
    cost: 25.5,
    supplier: '上海食品供应',
    lastOrderDate: '2026-03-20',
    nextOrderDate: '2026-03-27',
    usageRate: 12, // 每天使用量 kg
    shelfLife: 30, // 保质期天数
    location: 'A区-3号货架',
  };

  const stockPercentage = (material.currentStock / material.maxStock) * 100;
  const daysRemaining = Math.floor(material.currentStock / material.usageRate);
  const stockStatus = stockPercentage > 50 ? '充足' : stockPercentage > 20 ? '预警' : '不足';

  const getStatusColor = () => {
    if (stockPercentage > 50) return '#4CAF50';
    if (stockPercentage > 20) return '#FF9800';
    return '#FF5252';
  };

  const usageHistory = [
    { date: '03-24', usage: 11.5 },
    { date: '03-23', usage: 12.2 },
    { date: '03-22', usage: 10.8 },
    { date: '03-21', usage: 13.1 },
    { date: '03-20', usage: 11.7 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <View style={styles.headerRow}>
            <View>
              <Title style={styles.materialName}>{material.name}</Title>
              <Chip style={styles.categoryChip} textStyle={styles.chipText}>
                {material.category}
              </Chip>
            </View>
            <Chip
              style={[styles.statusChip, { backgroundColor: getStatusColor() + '20' }]}
              textStyle={[styles.statusText, { color: getStatusColor() }]}
            >
              {stockStatus}
            </Chip>
          </View>

          <View style={styles.stockInfo}>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>当前库存</Text>
              <Text style={styles.stockValue}>
                {material.currentStock} {material.unit}
              </Text>
            </View>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>安全库存</Text>
              <Text style={styles.stockValue}>
                {material.minStock} {material.unit}
              </Text>
            </View>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>最大库存</Text>
              <Text style={styles.stockValue}>
                {material.maxStock} {material.unit}
              </Text>
            </View>
          </View>

          <ProgressBar
            progress={stockPercentage / 100}
            color={getStatusColor()}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            库存进度: {stockPercentage.toFixed(1)}% ({material.currentStock}/{material.maxStock} {material.unit})
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>基本信息</Title>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>单位</Text>
              <Text style={styles.infoValue}>{material.unit}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>成本</Text>
              <Text style={styles.infoValue}>¥{material.cost}/{material.unit}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>供应商</Text>
              <Text style={styles.infoValue}>{material.supplier}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>存放位置</Text>
              <Text style={styles.infoValue}>{material.location}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>库存预测</Title>
          <View style={styles.predictionRow}>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>日均使用量</Text>
              <Text style={styles.predictionValue}>
                {material.usageRate} {material.unit}/天
              </Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>预计可用天数</Text>
              <Text style={[styles.predictionValue, daysRemaining < 7 ? styles.warning : null]}>
                {daysRemaining} 天
              </Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>保质期</Text>
              <Text style={styles.predictionValue}>{material.shelfLife} 天</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>订货信息</Title>
          <View style={styles.orderInfo}>
            <View style={styles.orderItem}>
              <Text style={styles.orderLabel}>上次订货</Text>
              <Text style={styles.orderValue}>{material.lastOrderDate}</Text>
            </View>
            <View style={styles.orderItem}>
              <Text style={styles.orderLabel}>建议订货</Text>
              <Text style={styles.orderValue}>{material.nextOrderDate}</Text>
            </View>
            <View style={styles.orderItem}>
              <Text style={styles.orderLabel}>建议订货量</Text>
              <Text style={styles.orderValue}>
                {material.maxStock - material.currentStock} {material.unit}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>近期使用记录</Title>
          {usageHistory.map((item, index) => (
            <View key={index} style={styles.usageItem}>
              <Text style={styles.usageDate}>{item.date}</Text>
              <Text style={styles.usageAmount}>
                {item.usage} {material.unit}
              </Text>
              <ProgressBar
                progress={item.usage / 15}
                color="#2196F3"
                style={styles.usageProgress}
              />
            </View>
          ))}
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon="cart"
          style={styles.orderButton}
          onPress={() => navigation.navigate('OrderPrediction')}
        >
          立即订货
        </Button>
        <Button
          mode="outlined"
          icon="pencil"
          style={styles.editButton}
          onPress={() => navigation.navigate('AddMaterial', { material })}
        >
          编辑信息
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
  headerCard: {
    margin: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  materialName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryChip: {
    marginTop: 5,
    backgroundColor: '#E3F2FD',
  },
  chipText: {
    color: '#1976D2',
    fontSize: 12,
  },
  statusChip: {
    height: 32,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  stockItem: {
    alignItems: 'center',
    flex: 1,
  },
  stockLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  stockValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    margin: 10,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  predictionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  predictionItem: {
    alignItems: 'center',
    flex: 1,
  },
  predictionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  predictionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  warning: {
    color: '#FF5252',
  },
  orderInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  orderItem: {
    width: '50%',
    marginBottom: 15,
  },
  orderLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  orderValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  usageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  usageDate: {
    width: 50,
    fontSize: 14,
    color: '#333',
  },
  usageAmount: {
    width: 60,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  usageProgress: {
    flex: 1,
    height: 6,
    marginLeft: 10,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  orderButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#FF6B8B',
  },
  editButton: {
    flex: 1,
    marginLeft: 5,
    borderColor: '#FF6B8B',
  },
});

export default InventoryDetailScreen;