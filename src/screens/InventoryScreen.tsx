import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Chip, Badge } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// 模拟物料数据
const mockMaterials = [
  {
    id: '1',
    code: 'MAT001',
    name: '珍珠奶茶茶叶',
    category: '茶叶',
    unit: '克',
    currentStock: 12500,
    minStock: 5000,
    maxStock: 30000,
    unitPrice: 0.15,
    supplier: '福建茶叶公司',
    leadTime: 3,
    safetyStock: 7500,
    status: 'normal',
    lastUpdated: new Date('2026-03-24'),
  },
  {
    id: '2',
    code: 'MAT002',
    name: '黑糖珍珠',
    category: '配料',
    unit: '克',
    currentStock: 8500,
    minStock: 5000,
    maxStock: 20000,
    unitPrice: 0.08,
    supplier: '台湾食品公司',
    leadTime: 5,
    safetyStock: 6250,
    status: 'warning',
    lastUpdated: new Date('2026-03-24'),
  },
  {
    id: '3',
    code: 'MAT003',
    name: '鲜牛奶',
    category: '奶制品',
    unit: '毫升',
    currentStock: 30000,
    minStock: 20000,
    maxStock: 100000,
    unitPrice: 0.02,
    supplier: '本地牧场',
    leadTime: 1,
    safetyStock: 40000,
    status: 'normal',
    lastUpdated: new Date('2026-03-25'),
  },
  {
    id: '4',
    code: 'MAT004',
    name: '芝士奶盖粉',
    category: '配料',
    unit: '克',
    currentStock: 1200,
    minStock: 2000,
    maxStock: 10000,
    unitPrice: 0.25,
    supplier: '进口食品公司',
    leadTime: 7,
    safetyStock: 3000,
    status: 'danger',
    lastUpdated: new Date('2026-03-23'),
  },
  {
    id: '5',
    code: 'MAT005',
    name: '芒果果酱',
    category: '水果制品',
    unit: '克',
    currentStock: 4500,
    minStock: 3000,
    maxStock: 15000,
    unitPrice: 0.12,
    supplier: '海南食品公司',
    leadTime: 4,
    safetyStock: 4500,
    status: 'normal',
    lastUpdated: new Date('2026-03-24'),
  },
];

const categories = ['全部', '茶叶', '配料', '奶制品', '水果制品', '包装材料', '糖浆'];

const InventoryScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [materials, setMaterials] = useState(mockMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState(mockMaterials);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    filterMaterials();
  }, [searchQuery, selectedCategory, materials]);

  const filterMaterials = () => {
    let filtered = [...materials];

    // 按搜索词过滤
    if (searchQuery) {
      filtered = filtered.filter(
        material =>
          material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          material.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 按分类过滤
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(material => material.category === selectedCategory);
    }

    setFilteredMaterials(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger':
        return '#FF5252'; // 红色
      case 'warning':
        return '#FF9800'; // 橙色
      case 'normal':
        return '#4CAF50'; // 绿色
      default:
        return '#757575'; // 灰色
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'danger':
        return '严重缺货';
      case 'warning':
        return '库存预警';
      case 'normal':
        return '库存正常';
      default:
        return '未知状态';
    }
  };

  const renderMaterialItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('InventoryDetail', { material: item })}
    >
      <Card style={styles.materialCard}>
        <Card.Content>
          <View style={styles.materialHeader}>
            <View style={styles.materialInfo}>
              <Title style={styles.materialName}>{item.name}</Title>
              <Paragraph style={styles.materialCode}>{item.code}</Paragraph>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
            </View>
          </View>

          <View style={styles.materialDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>分类</Text>
              <Text style={styles.detailValue}>{item.category}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>当前库存</Text>
              <Text style={styles.detailValue}>
                {item.currentStock.toLocaleString()} {item.unit}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>安全库存</Text>
              <Text style={styles.detailValue}>
                {item.safetyStock.toLocaleString()} {item.unit}
              </Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${Math.min(100, (item.currentStock / item.maxStock) * 100)}%`,
                    backgroundColor: getStatusColor(item.status),
                  },
                ]}
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>0</Text>
              <Text style={styles.progressLabel}>{item.minStock.toLocaleString()}</Text>
              <Text style={styles.progressLabel}>{item.maxStock.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.materialFooter}>
            <Text style={styles.supplierText}>供应商: {item.supplier}</Text>
            <Text style={styles.updateText}>
              最后更新: {item.lastUpdated.toLocaleDateString('zh-CN')}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const getInventoryStats = () => {
    const total = materials.length;
    const normal = materials.filter(m => m.status === 'normal').length;
    const warning = materials.filter(m => m.status === 'warning').length;
    const danger = materials.filter(m => m.status === 'danger').length;

    return { total, normal, warning, danger };
  };

  const stats = getInventoryStats();

  return (
    <View style={styles.container}>
      {/* 统计信息 */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>总物料数</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Card.Content>
            <Text style={[styles.statValue, { color: '#4CAF50' }]}>{stats.normal}</Text>
            <Text style={styles.statLabel}>库存正常</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Card.Content>
            <Text style={[styles.statValue, { color: '#FF9800' }]}>{stats.warning}</Text>
            <Text style={styles.statLabel}>库存预警</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: '#FFEBEE' }]}>
          <Card.Content>
            <Text style={[styles.statValue, { color: '#FF5252' }]}>{stats.danger}</Text>
            <Text style={styles.statLabel}>严重缺货</Text>
          </Card.Content>
        </Card>
      </View>

      {/* 搜索和过滤 */}
      <Card style={styles.filterCard}>
        <Card.Content>
          <Searchbar
            placeholder="搜索物料名称或编号"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
              >
                <Chip
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.selectedCategoryChip,
                  ]}
                  textStyle={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Chip>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* 操作按钮 */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddMaterial')}
        >
          <Ionicons name="add-circle" size={24} color="#FF6B8B" />
          <Text style={styles.actionButtonText}>添加物料</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download-outline" size={24} color="#2196F3" />
          <Text style={styles.actionButtonText}>批量导入</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={24} color="#4CAF50" />
          <Text style={styles.actionButtonText}>盘库管理</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings-outline" size={24} color="#757575" />
          <Text style={styles.actionButtonText}>预警设置</Text>
        </TouchableOpacity>
      </View>

      {/* 物料列表 */}
      <FlatList
        data={filteredMaterials}
        renderItem={renderMaterialItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>未找到相关物料</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  statCard: {
    flex: 1,
    margin: 5,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
  filterCard: {
    margin: 10,
    elevation: 2,
  },
  searchBar: {
    marginBottom: 10,
    elevation: 0,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryChip: {
    backgroundColor: '#FF6B8B',
  },
  categoryText: {
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 10,
  },
  materialCard: {
    marginBottom: 10,
    elevation: 2,
  },
  materialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  materialInfo: {
    flex: 1,
  },
  materialName: {
    fontSize: 18,
    marginBottom: 4,
  },
  materialCode: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  materialDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 10,
    color: '#999',
  },
  materialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supplierText: {
    fontSize: 12,
    color: '#666',
  },
  updateText: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});

export default InventoryScreen;