import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Badge } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BarChart } from 'react-native-chart-kit';

// 模拟数据
const drinkCategories = [
  { id: '1', name: '奶茶系列', icon: 'cafe' },
  { id: '2', name: '果茶系列', icon: 'water' },
  { id: '3', name: '芝士系列', icon: 'ice-cream' },
  { id: '4', name: '纯茶系列', icon: 'leaf' },
  { id: '5', name: '甜品系列', icon: 'ice-cream' },
];

const popularDrinks = [
  { id: '1', name: '珍珠奶茶', category: '奶茶系列', basePrice: 15, sizes: ['中杯', '大杯'] },
  { id: '2', name: '芝士奶盖绿', category: '芝士系列', basePrice: 18, sizes: ['中杯', '大杯'] },
  { id: '3', name: '杨枝甘露', category: '果茶系列', basePrice: 20, sizes: ['中杯', '大杯'] },
  { id: '4', name: '芋圆奶茶', category: '奶茶系列', basePrice: 16, sizes: ['中杯', '大杯'] },
  { id: '5', name: '柠檬红茶', category: '纯茶系列', basePrice: 12, sizes: ['中杯', '大杯'] },
  { id: '6', name: '芒果冰沙', category: '果茶系列', basePrice: 18, sizes: ['中杯', '大杯'] },
];

const recentSales = [
  { id: '1', drink: '珍珠奶茶', size: '大杯', quantity: 1, price: 18, time: '10:25' },
  { id: '2', drink: '芝士奶盖绿', size: '中杯', quantity: 2, price: 36, time: '10:30' },
  { id: '3', drink: '杨枝甘露', size: '大杯', quantity: 1, price: 20, time: '10:45' },
  { id: '4', drink: '芋圆奶茶', size: '中杯', quantity: 1, price: 16, time: '11:00' },
  { id: '5', drink: '柠檬红茶', size: '大杯', quantity: 3, price: 36, time: '11:15' },
];

const hourSalesData = [
  { hour: '10:00', sales: 850 },
  { hour: '11:00', sales: 1250 },
  { hour: '12:00', sales: 2100 },
  { hour: '13:00', sales: 1800 },
  { hour: '14:00', sales: 1500 },
  { hour: '15:00', sales: 1900 },
  { hour: '16:00', sales: 2200 },
  { hour: '17:00', sales: 2500 },
];

const SalesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [currentOrder, setCurrentOrder] = useState({
    items: [] as any[],
    totalQuantity: 0,
    totalPrice: 0,
  });

  const handleAddToCart = (drink: any, size: string) => {
    const itemPrice = size === '大杯' ? drink.basePrice + 3 : drink.basePrice;
    const newItem = {
      id: `${drink.id}-${size}`,
      name: drink.name,
      size,
      quantity: 1,
      price: itemPrice,
    };

    setCurrentOrder(prev => ({
      items: [...prev.items, newItem],
      totalQuantity: prev.totalQuantity + 1,
      totalPrice: prev.totalPrice + itemPrice,
    }));
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCurrentOrder(prev => {
      const item = prev.items.find(i => i.id === itemId);
      if (!item) return prev;

      return {
        items: prev.items.filter(i => i.id !== itemId),
        totalQuantity: prev.totalQuantity - item.quantity,
        totalPrice: prev.totalPrice - (item.price * item.quantity),
      };
    });
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    setCurrentOrder(prev => {
      const itemIndex = prev.items.findIndex(i => i.id === itemId);
      if (itemIndex === -1) return prev;

      const updatedItems = [...prev.items];
      const item = updatedItems[itemIndex];
      const newQuantity = Math.max(1, item.quantity + change);

      const quantityDiff = newQuantity - item.quantity;
      updatedItems[itemIndex] = {
        ...item,
        quantity: newQuantity,
      };

      return {
        items: updatedItems,
        totalQuantity: prev.totalQuantity + quantityDiff,
        totalPrice: prev.totalPrice + (item.price * quantityDiff),
      };
    });
  };

  const handleCheckout = () => {
    // 这里应该处理结账逻辑
    console.log('结账:', currentOrder);
    // 清空购物车
    setCurrentOrder({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
    });
    // 显示成功消息
    alert('销售记录已保存！');
  };

  const chartData = {
    labels: hourSalesData.map(item => item.hour),
    datasets: [
      {
        data: hourSalesData.map(item => item.sales),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      {/* 销售概览 */}
      <View style={styles.overviewContainer}>
        <Card style={styles.overviewCard}>
          <Card.Content>
            <Text style={styles.overviewTitle}>今日销售</Text>
            <Text style={styles.overviewValue}>¥12,850</Text>
            <Text style={styles.overviewChange}>较昨日 +12%</Text>
          </Card.Content>
        </Card>
        <Card style={styles.overviewCard}>
          <Card.Content>
            <Text style={styles.overviewTitle}>今日杯数</Text>
            <Text style={styles.overviewValue}>320</Text>
            <Text style={styles.overviewChange}>平均¥40/杯</Text>
          </Card.Content>
        </Card>
        <Card style={styles.overviewCard}>
          <Card.Content>
            <Text style={styles.overviewTitle}>客单价</Text>
            <Text style={styles.overviewValue}>¥42.5</Text>
            <Text style={styles.overviewChange}>+5%</Text>
          </Card.Content>
        </Card>
      </View>

      {/* 销售趋势图表 */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>今日销售趋势</Title>
          <BarChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </Card.Content>
      </Card>

      {/* 当前订单 */}
      <Card style={styles.currentOrderCard}>
        <Card.Content>
          <View style={styles.orderHeader}>
            <Title>当前订单</Title>
            <View style={styles.orderStats}>
              <Badge style={styles.orderBadge}>{currentOrder.totalQuantity}</Badge>
              <Text style={styles.orderTotal}>¥{currentOrder.totalPrice.toFixed(2)}</Text>
            </View>
          </View>

          {currentOrder.items.length === 0 ? (
            <View style={styles.emptyCart}>
              <Ionicons name="cart-outline" size={48} color="#ccc" />
              <Text style={styles.emptyCartText}>暂无商品</Text>
            </View>
          ) : (
            <FlatList
              data={currentOrder.items}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemSize}>{item.size}</Text>
                  </View>
                  <View style={styles.cartItemActions}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, -1)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="remove" size={20} color="#FF6B8B" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, 1)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="add" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                    <Text style={styles.cartItemPrice}>¥{(item.price * item.quantity).toFixed(2)}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveFromCart(item.id)}
                      style={styles.removeButton}
                    >
                      <Ionicons name="close" size={20} color="#FF5252" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}

          {currentOrder.items.length > 0 && (
            <Button
              mode="contained"
              style={styles.checkoutButton}
              onPress={handleCheckout}
              icon="check-circle"
            >
              确认结账
            </Button>
          )}
        </Card.Content>
      </Card>

      {/* 饮品分类 */}
      <Card style={styles.categoriesCard}>
        <Card.Content>
          <Title>快速选择</Title>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {drinkCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryButton}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Ionicons name={category.icon as any} size={24} color="#FF6B8B" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card.Content>
      </Card>

      {/* 热门饮品 */}
      <Card style={styles.popularDrinksCard}>
        <Card.Content>
          <Title>热门饮品</Title>
          <FlatList
            data={popularDrinks}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.drinkItem}
                onPress={() => handleAddToCart(item, '中杯')}
              >
                <View style={styles.drinkContent}>
                  <Text style={styles.drinkName}>{item.name}</Text>
                  <Text style={styles.drinkCategory}>{item.category}</Text>
                  <View style={styles.drinkPrices}>
                    <Text style={styles.drinkPrice}>中杯 ¥{item.basePrice}</Text>
                    <Text style={styles.drinkPrice}>大杯 ¥{item.basePrice + 3}</Text>
                  </View>
                  <Button
                    mode="contained"
                    style={styles.addButton}
                    onPress={() => handleAddToCart(item, '中杯')}
                    compact
                  >
                    加入订单
                  </Button>
                </View>
              </TouchableOpacity>
            )}
          />
        </Card.Content>
      </Card>

      {/* 近期销售记录 */}
      <Card style={styles.recentSalesCard}>
        <Card.Content>
          <Title>近期销售</Title>
          {recentSales.map(sale => (
            <View key={sale.id} style={styles.saleRecord}>
              <View style={styles.saleInfo}>
                <Text style={styles.saleDrink}>{sale.drink} ({sale.size})</Text>
                <Text style={styles.saleTime}>{sale.time}</Text>
              </View>
              <View style={styles.saleDetails}>
                <Text style={styles.saleQuantity}>×{sale.quantity}</Text>
                <Text style={styles.salePrice}>¥{sale.price}</Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  overviewContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  overviewCard: {
    flex: 1,
    margin: 5,
    elevation: 2,
  },
  overviewTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  overviewChange: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  chartCard: {
    margin: 10,
    elevation: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  currentOrderCard: {
    margin: 10,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderBadge: {
    backgroundColor: '#FF6B8B',
    marginRight: 10,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyCart: {
    alignItems: 'center',
    padding: 30,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  cartItemSize: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 10,
    minWidth: 30,
    textAlign: 'center',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
  },
  removeButton: {
    padding: 5,
  },
  checkoutButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
  },
  categoriesCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 15,
    marginRight: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    minWidth: 100,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  popularDrinksCard: {
    marginHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  drinkItem: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 1,
    overflow: 'hidden',
  },
  drinkContent: {
    padding: 15,
  },
  drinkName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  drinkCategory: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  drinkPrices: {
    marginBottom: 10,
  },
  drinkPrice: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FF6B8B',
  },
  recentSalesCard: {
    margin: 10,
    elevation: 2,
  },
  saleRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  saleInfo: {
    flex: 1,
  },
  saleDrink: {
    fontSize: 16,
    color: '#333',
  },
  saleTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  saleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saleQuantity: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SalesScreen;