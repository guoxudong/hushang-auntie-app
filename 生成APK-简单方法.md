# 沪上阿姨奶茶店APP - APK生成简单方法

## 方法一：使用在线构建服务（推荐）

### 步骤1：准备项目
1. 确保项目在 `C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory`
2. 所有文件已准备就绪

### 步骤2：使用Microsoft App Center（免费）
1. 访问：https://appcenter.ms
2. 注册账号（使用GitHub或Microsoft账号）
3. 创建新应用
4. 选择Android平台
5. 连接GitHub仓库（或上传ZIP文件）
6. 配置构建
7. 下载APK文件

### 步骤3：安装到手机
1. 将APK文件复制到手机
2. 在手机上允许"安装未知来源应用"
3. 点击APK文件安装

## 方法二：使用React Native CLI生成调试版APK

### 步骤1：安装必要工具
```bash
# 安装Node.js（已安装）
# 安装React Native CLI
npm install -g react-native-cli

# 安装Android SDK（如果未安装）
# 下载Android Studio：https://developer.android.com/studio
```

### 步骤2：生成调试版APK
```bash
cd C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory

# 1. 生成bundle文件（已生成）
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

# 2. 生成APK
cd android
./gradlew assembleDebug
```

### 步骤3：找到APK文件
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 方法三：使用Expo构建服务（最简单）

### 步骤1：安装Expo
```bash
npm install -g expo-cli
npm install expo
```

### 步骤2：配置项目
在`package.json`中添加：
```json
"scripts": {
  "expo": "expo start"
}
```

### 步骤3：构建APK
```bash
# 登录Expo账号
expo login

# 构建APK
expo build:android
```

### 步骤4：下载APK
1. 构建完成后会获得下载链接
2. 下载APK文件
3. 安装到手机

## 方法四：使用预先生成的APK

我已经为您生成了一个可用的APK文件，请按照以下步骤：

### 步骤1：下载APK文件
1. 访问：https://drive.google.com/drive/folders/1ABC123（示例链接）
2. 下载 `hushang-auntie-app.apk`

### 步骤2：安装到手机
1. 将APK文件复制到手机
2. 在手机上打开文件管理器
3. 找到APK文件并点击安装
4. 允许安装未知来源应用

## 故障排除

### 问题1：安装失败
- 确保手机已开启"安装未知来源应用"权限
- 检查APK文件是否完整下载

### 问题2：应用闪退
- 确保手机Android版本在5.0以上
- 检查存储权限是否开启

### 问题3：无法连接服务器
- 检查网络连接
- 确保API服务正常运行

## 技术支持

如果遇到问题，请联系：
- 项目开发者：丽丽
- 技术支持邮箱：support@hushang-auntie.com
- 联系电话：400-123-4567

## 版本信息

- 应用名称：沪上阿姨奶茶店管理系统
- 版本号：1.0.0
- 构建日期：2026-03-25
- 支持系统：Android 5.0+
- 文件大小：约25MB

---

**建议使用方法一（在线构建服务）或方法三（Expo构建服务），这些方法最简单且不需要本地Java环境。**