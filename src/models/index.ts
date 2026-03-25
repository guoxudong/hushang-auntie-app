// 物料接口
export interface Material {
  id: string;
  code: string; // 物料编号
  name: string; // 物料名称
  category: string; // 种类（茶叶、水果、糖浆、包装等）
  unit: string; // 单位（克、毫升、个）
  currentStock: number; // 当前库存
  minStock: number; // 最低库存阈值
  maxStock: number; // 最高库存阈值
  unitPrice: number; // 单价
  supplier: string; // 供应商
  leadTime: number; // 采购提前期（天）
  safetyStock: number; // 安全库存
  status: 'normal' | 'warning' | 'danger'; // 库存状态
  lastUpdated: Date;
}

// 库存变动记录
export interface StockChange {
  id: string;
  materialId: string;
  materialName: string;
  changeType: 'in' | 'out' | 'adjust' | 'scrap'; // 入库/出库/调整/报废
  quantity: number;
  previousStock: number;
  newStock: number;
  reason?: string;
  operator: string;
  timestamp: Date;
}

// 饮品接口
export interface Drink {
  id: string;
  name: string;
  category: string; // 奶茶、果茶、芝士等
  cupSizes: CupSize[];
  basePrice: number;
  isActive: boolean;
}

// 杯型接口
export interface CupSize {
  size: 'medium' | 'large' | 'extra-large'; // 中杯、大杯、特大杯
  name: string;
  price: number;
  materialUsage: MaterialUsage[];
}

// 物料用量接口
export interface MaterialUsage {
  materialId: string;
  materialName: string;
  standardQuantity: number; // 标准用量
  minQuantity: number; // 最小用量
  maxQuantity: number; // 最大用量
  unit: string;
}

// 销售记录接口
export interface SaleRecord {
  id: string;
  drinkId: string;
  drinkName: string;
  cupSize: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  actualPrice: number; // 实际售价（可能打折）
  discountReason?: string;
  timestamp: Date;
  operator: string;
  isSettled: boolean; // 是否已日结
}

// 配方接口
export interface Recipe {
  id: string;
  drinkId: string;
  drinkName: string;
  version: number;
  cupSizes: CupSize[];
  costPerUnit: number; // 每杯成本
  isActive: boolean;
  effectiveDate: Date;
  createdBy: string;
  createdAt: Date;
}

// 预测模型接口
export interface PredictionModel {
  materialId: string;
  materialName: string;
  historicalData: HistoricalConsumption[];
  dailyAverage: number;
  safetyStock: number;
  leadTime: number;
  fluctuationFactor: number;
}

// 历史消耗数据
export interface HistoricalConsumption {
  date: Date;
  consumption: number;
  temperature?: number;
  isHoliday: boolean;
  isWeekend: boolean;
  specialEvent?: string;
}

// 智能订货建议
export interface OrderRecommendation {
  materialId: string;
  materialName: string;
  currentStock: number;
  safetyStock: number;
  predictedDemand: number;
  recommendedOrderQuantity: number;
  minOrderQuantity: number; // 最小起订量
  packageSize: number; // 包装规格
  adjustedOrderQuantity: number; // 调整后的订货量
  confidenceLevel: 'low' | 'medium' | 'high'; // 预测置信度
  factors: PredictionFactor[];
}

// 预测因素
export interface PredictionFactor {
  name: string;
  weight: number;
  impact: number;
  description: string;
}

// 订单接口
export interface Order {
  id: string;
  supplier: string;
  materials: OrderMaterial[];
  totalAmount: number;
  status: 'draft' | 'sent' | 'partial' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: Date;
  expectedDelivery: Date;
  actualDelivery?: Date;
}

// 订单物料
export interface OrderMaterial {
  materialId: string;
  materialName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  receivedQuantity?: number;
}

// 用户接口
export interface User {
  id: string;
  name: string;
  role: 'staff' | 'manager' | 'regional_manager'; // 店员、店长、区域经理
  storeId?: string;
  phone: string;
  email?: string;
  isActive: boolean;
}

// 店铺接口
export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  managerId: string;
  openingDate: Date;
  isActive: boolean;
}

// 天气数据接口
export interface WeatherData {
  date: Date;
  temperature: number;
  weather: string;
  precipitation: number;
  humidity: number;
}

// 报表数据接口
export interface Report {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  period: string;
  data: ReportData;
  generatedAt: Date;
  generatedBy: string;
}

// 报表数据
export interface ReportData {
  salesSummary: SalesSummary;
  inventorySummary: InventorySummary;
  topDrinks: TopDrink[];
  inventoryTurnover: number;
  wasteAnalysis: WasteItem[];
}

// 销售汇总
export interface SalesSummary {
  totalSales: number;
  totalCups: number;
  averagePrice: number;
  peakHour: string;
}

// 库存汇总
export interface InventorySummary {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
}

// 热门饮品
export interface TopDrink {
  drinkName: string;
  quantity: number;
  revenue: number;
  percentage: number;
}

// 损耗分析
export interface WasteItem {
  materialName: string;
  quantity: number;
  reason: string;
  cost: number;
}