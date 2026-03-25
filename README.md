# 沪上阿姨奶茶店库存管理及智能订货系统APP

基于需求文档开发的跨平台移动应用，使用React Native构建，支持iOS和Android平台。

## 📱 应用概述

本应用为"沪上阿姨奶茶店"提供全面的库存管理、销售跟踪和智能订货预测功能，帮助奶茶店实现数字化运营管理。

## 🎯 核心功能

### 1. 库存物料管理
- **盘库管理**：支持日历选择、物料添加/编辑/删除、批量导入
- **库存自动更新**：根据销售数据自动计算物料消耗
- **预警设置**：设置最低库存阈值，实时预警提示
- **库存报表**：日报表、周期报表、库存周转率分析

### 2. 饮品销售管理
- **销售记录**：快速录入、批量操作、销售看板
- **销售数据管理**：日结功能、历史查询、对比分析
- **实时看板**：显示当日销售总额、杯数、热门饮品TOP5

### 3. 配方管理
- **配方维护**：配方结构、版本管理、成本计算
- **配方应用**：关联检查、一键更新
- **成本控制**：自动计算每杯物料成本，成本变动预警

### 4. 智能订货预测
- **基础预测模型**：历史数据分析、安全库存计算
- **智能因素整合**：天气影响、节假日/事件、趋势因素
- **预测结果生成**：多方案对比、可视化展示
- **订货执行**：一键生成订单、订单跟踪、预测准确率反馈

## 🏗️ 技术架构

### 前端技术栈
- **React Native 0.84.1** - 跨平台移动应用框架
- **TypeScript** - 类型安全的JavaScript超集
- **React Navigation** - 导航管理
- **React Native Paper** - Material Design组件库
- **React Native Chart Kit** - 数据可视化图表
- **React Native Vector Icons** - 图标库

### 项目结构
```
src/
├── navigation/          # 导航配置
│   └── AppNavigator.tsx
├── screens/            # 屏幕组件
│   ├── DashboardScreen.tsx
│   ├── InventoryScreen.tsx
│   ├── SalesScreen.tsx
│   ├── OrderPredictionScreen.tsx
│   ├── RecipesScreen.tsx
│   ├── ReportsScreen.tsx
│   ├── InventoryDetailScreen.tsx
│   └── AddMaterialScreen.tsx
├── models/             # 数据模型
│   └── index.ts
├── services/          # API服务
│   └── api.ts
├── utils/             # 工具函数
│   └── helpers.ts
└── components/        # 公共组件
    └── common/
```

## 🚀 快速开始

### 环境要求
- Node.js 14.0+
- npm 或 yarn
- React Native CLI
- Android Studio (Android开发)
- Xcode (iOS开发，仅限macOS)

### 安装步骤

1. **克隆项目**
```bash
git clone <项目地址>
cd HushangAuntieInventory
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm start
# 或
yarn start
```

4. **运行应用**

**Android:**
```bash
npm run android
# 或
yarn android
```

**iOS:**
```bash
npm run ios
# 或
yarn ios
```

## 📱 屏幕预览

### 仪表盘
- 今日销售概览
- 库存预警提醒
- 销售趋势图表
- 热门饮品排行
- 快速操作入口

### 库存管理
- 物料列表（红黄绿三色状态标识）
- 搜索和分类过滤
- 库存进度条可视化
- 添加/编辑/删除物料
- 批量导入功能

### 销售管理
- POS机式快速点单界面
- 饮品分类快速选择
- 购物车管理
- 实时销售看板
- 销售记录查询

### 智能订货
- 多方案预测（保守/推荐/激进）
- 天气影响分析
- 因素权重配置
- 需求趋势图表
- 一键生成采购订单

## 🔧 开发指南

### 添加新屏幕
1. 在 `src/screens/` 创建新组件
2. 在 `src/navigation/AppNavigator.tsx` 中添加路由
3. 在 `src/models/index.ts` 中添加数据模型（如果需要）

### 添加新API
1. 在 `src/services/api.ts` 中添加API函数
2. 在组件中使用 `useEffect` 和 `useState` 管理数据

### 样式规范
- 使用StyleSheet创建样式
- 主色调：`#FF6B8B`（粉色）
- 辅助色：`#4CAF50`（绿色）、`#2196F3`（蓝色）、`#FF9800`（橙色）

## 📊 数据模型

### 主要实体
- **Material** - 物料
- **Drink** - 饮品
- **SaleRecord** - 销售记录
- **Recipe** - 配方
- **Order** - 订单
- **User** - 用户
- **Store** - 店铺

### 预测模型
- **PredictionModel** - 预测模型
- **OrderRecommendation** - 订货建议
- **PredictionFactor** - 预测因素

## 🔐 权限管理

### 用户角色
- **店员**：仅销售录入、库存查看
- **店长**：全功能（除系统设置）
- **区域经理**：多店数据查看、对比分析

## 📈 高级功能（二期规划）

### 智能优化
- 动态定价建议
- 临期物料提醒
- 套餐推荐

### 多店管理
- 门店间调拨
- 集团采购
- 区域对比分析

## 🐛 故障排除

### 常见问题
1. **Metro bundler无法启动**
   ```bash
   npm start --reset-cache
   ```

2. **Android模拟器连接问题**
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

3. **iOS模拟器启动失败**
   ```bash
   cd ios && pod install
   ```

### 调试技巧
- 使用 `console.log()` 调试
- 在Chrome中打开 `http://localhost:8081/debugger-ui/`
- 使用React Native Debugger工具

## 📄 许可证

本项目仅供学习参考使用，商业使用请联系开发者。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- **项目负责人**：郭先生
- **技术支持**：丽丽（AI助手）
- **行业**：奶茶店经营

---

**最后更新**：2026年3月25日  
**版本**：1.0.0  
**状态**：开发中