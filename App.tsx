import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

// 创建其他屏幕的占位组件
const placeholderComponent = ({ route }: any) => {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <h2>{route.name} 屏幕</h2>
      <p>这个屏幕正在开发中...</p>
    </div>
  );
};

// 创建所需的屏幕组件
const RecipesScreen = () => placeholderComponent({ route: { name: '配方管理' } });
const ReportsScreen = () => placeholderComponent({ route: { name: '报表' } });
const InventoryDetailScreen = () => placeholderComponent({ route: { name: '物料详情' } });
const AddMaterialScreen = () => placeholderComponent({ route: { name: '添加物料' } });

// 导出屏幕组件供导航器使用
export { RecipesScreen, ReportsScreen, InventoryDetailScreen, AddMaterialScreen };

const App = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <AppNavigator />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default App;