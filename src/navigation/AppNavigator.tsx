import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 导入屏幕组件
import DashboardScreen from '../screens/DashboardScreen';
import InventoryScreen from '../screens/InventoryScreen';
import SalesScreen from '../screens/SalesScreen';
import RecipesScreen from '../screens/RecipesScreen';
import OrderPredictionScreen from '../screens/OrderPredictionScreen';
import ReportsScreen from '../screens/ReportsScreen';
import InventoryDetailScreen from '../screens/InventoryDetailScreen';
import AddMaterialScreen from '../screens/AddMaterialScreen';

// 创建导航器
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 库存管理堆栈导航
const InventoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="InventoryMain" 
        component={InventoryScreen} 
        options={{ title: '库存管理' }}
      />
      <Stack.Screen 
        name="InventoryDetail" 
        component={InventoryDetailScreen} 
        options={{ title: '物料详情' }}
      />
      <Stack.Screen 
        name="AddMaterial" 
        component={AddMaterialScreen} 
        options={{ title: '添加物料' }}
      />
    </Stack.Navigator>
  );
};

// 主标签页导航
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Sales') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Recipes') {
            iconName = focused ? 'flask' : 'flask-outline';
          } else if (route.name === 'OrderPrediction') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B8B',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{ title: '仪表盘' }}
      />
      <Tab.Screen 
        name="Inventory" 
        component={InventoryStack} 
        options={{ title: '库存', headerShown: false }}
      />
      <Tab.Screen 
        name="Sales" 
        component={SalesScreen} 
        options={{ title: '销售' }}
      />
      <Tab.Screen 
        name="Recipes" 
        component={RecipesScreen} 
        options={{ title: '配方' }}
      />
      <Tab.Screen 
        name="OrderPrediction" 
        component={OrderPredictionScreen} 
        options={{ title: '智能订货' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={ReportsScreen} 
        options={{ title: '报表' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;