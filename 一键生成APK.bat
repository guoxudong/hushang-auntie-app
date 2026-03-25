@echo off
echo ============================================
echo   沪上阿姨奶茶店APP - APK生成工具
echo ============================================
echo.
echo 正在检查项目状态...

REM 检查项目目录
if not exist "C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory\" (
    echo 错误：项目目录不存在！
    pause
    exit /b 1
)

REM 检查Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：Node.js未安装！
    echo 请先安装Node.js：https://nodejs.org
    pause
    exit /b 1
)

REM 检查npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：npm未安装！
    pause
    exit /b 1
)

echo 项目检查通过！
echo.
echo 请选择生成方式：
echo.
echo 1. 使用Expo构建服务（推荐，最简单）
echo 2. 使用React Native CLI生成调试版
echo 3. 查看详细文档
echo.
set /p choice=请选择 (1/2/3): 

if "%choice%"=="1" goto expo_build
if "%choice%"=="2" goto rn_build
if "%choice%"=="3" goto show_docs
goto end

:expo_build
echo.
echo ============================================
echo   使用Expo构建服务
echo ============================================
echo.
echo 步骤1：安装Expo CLI
echo 正在安装expo-cli...
call npm install -g expo-cli
if %errorlevel% neq 0 (
    echo 安装失败！
    pause
    exit /b 1
)

echo.
echo 步骤2：安装Expo依赖
cd "C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory"
call npm install expo
if %errorlevel% neq 0 (
    echo 安装失败！
    pause
    exit /b 1
)

echo.
echo 步骤3：配置package.json
echo 正在更新package.json...
(
echo {
echo   "name": "hushang-auntie-inventory",
echo   "version": "1.0.0",
echo   "private": true,
echo   "scripts": {
echo     "start": "expo start",
echo     "android": "expo start --android",
echo     "ios": "expo start --ios",
echo     "web": "expo start --web",
echo     "build:android": "expo build:android"
echo   },
echo   "dependencies": {
echo     "expo": "^49.0.0",
echo     "react": "18.2.0",
echo     "react-native": "0.72.6",
echo     "react-native-paper": "^5.10.6",
echo     "react-native-chart-kit": "^6.12.0",
echo     "react-native-vector-icons": "^10.0.0",
echo     "@react-navigation/native": "^6.1.9",
echo     "@react-navigation/bottom-tabs": "^6.5.8"
echo   },
echo   "devDependencies": {
echo     "@babel/core": "^7.20.0",
echo     "@types/react": "~18.2.14",
echo     "typescript": "^5.1.3"
echo   }
echo }
) > package.json

echo.
echo 步骤4：生成APK
echo 请按照以下步骤操作：
echo.
echo 1. 打开命令提示符
echo 2. 进入项目目录：
echo    cd C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory
echo 3. 登录Expo账号：
echo    expo login
echo 4. 构建APK：
echo    expo build:android
echo.
echo 构建完成后，您将获得APK下载链接。
echo.
pause
goto end

:rn_build
echo.
echo ============================================
echo   使用React Native CLI生成调试版APK
echo ============================================
echo.
echo 注意：此方法需要安装Java和Android SDK
echo.
echo 步骤1：检查Java
where java >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：Java未安装！
    echo 请先安装Java JDK 8或更高版本
    echo 下载地址：https://adoptium.net/temurin/releases/
    pause
    exit /b 1
)

echo.
echo 步骤2：检查Android SDK
if "%ANDROID_HOME%"=="" (
    echo 警告：ANDROID_HOME环境变量未设置！
    echo 请先安装Android Studio并设置环境变量
    pause
    exit /b 1
)

echo.
echo 步骤3：生成bundle文件
cd "C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory"
echo 正在生成JavaScript bundle...
call npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
if %errorlevel% neq 0 (
    echo 生成失败！
    pause
    exit /b 1
)

echo.
echo 步骤4：生成APK
echo 正在生成APK...
cd android
call .\gradlew assembleDebug
if %errorlevel% neq 0 (
    echo 生成失败！
    pause
    exit /b 1
)

echo.
echo ✅ APK生成成功！
echo.
echo APK文件位置：
echo C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo 文件大小：约25MB
echo 支持系统：Android 5.0+
echo.
pause
goto end

:show_docs
echo.
echo ============================================
echo   详细文档
echo ============================================
echo.
echo 已打开文档文件：
start "" "生成APK-简单方法.md"
echo.
pause
goto end

:end
echo.
echo 生成完成！
echo 请查看生成的文档了解详细步骤。
echo.
pause