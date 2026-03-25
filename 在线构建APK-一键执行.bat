@echo off
echo ============================================
echo   沪上阿姨奶茶店APP - 在线构建APK
echo ============================================
echo.
echo 此脚本将指导您完成在线构建APK的所有步骤
echo.

echo 第一步：准备工作
echo ====================
echo.
echo 1. 确保您有GitHub账号
echo    如果没有，请访问：https://github.com/signup
echo.
echo 2. 下载GitHub Desktop（推荐）
echo    下载地址：https://desktop.github.com
echo.
echo 3. 确保项目文件完整
echo    项目位置：C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory
echo.
set /p ready=准备工作完成了吗？(Y/N): 
if /i "%ready%" neq "Y" (
    echo 请先完成准备工作，然后再运行此脚本。
    pause
    exit /b 1
)

echo.
echo 第二步：上传项目到GitHub
echo ============================
echo.
echo 请按以下步骤操作：
echo.
echo 1. 打开GitHub Desktop
echo 2. 点击"Add an existing repository"
echo 3. 选择项目目录：
echo    C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory
echo 4. 点击"Publish repository"
echo 5. 填写信息：
echo    - Name: hushang-auntie-app
echo    - Description: 沪上阿姨奶茶店管理系统
echo    - 保持"Public"选中
echo 6. 点击"Publish repository"
echo.
echo 7. 等待上传完成
echo.
set /p uploaded=项目已上传到GitHub了吗？(Y/N): 
if /i "%uploaded%" neq "Y" (
    echo 请先完成项目上传，然后再继续。
    pause
    exit /b 1
)

echo.
echo 第三步：使用Microsoft App Center构建
echo ======================================
echo.
echo 1. 打开浏览器，访问：https://appcenter.ms
echo 2. 点击"Sign up"注册（可以使用GitHub账号登录）
echo 3. 登录后点击"Add new" → "Add new app"
echo 4. 填写应用信息：
echo    - App name: HushangAuntie
echo    - Release type: Production
echo    - OS: Android
echo    - Platform: React Native
echo 5. 点击"Add new app"
echo.
echo 6. 进入应用后，点击"Build" → "Connect to repository"
echo 7. 选择GitHub，授权访问
echo 8. 选择您的仓库：hushang-auntie-app
echo 9. 选择分支：main
echo.
echo 10. 点击"Configure build"
echo 11. 选择Node版本：18.x
echo 12. 点击"Save & Build"
echo.
set /p building=已开始构建了吗？(Y/N): 
if /i "%building%" neq "Y" (
    echo 请先开始构建，然后再继续。
    pause
    exit /b 1
)

echo.
echo 第四步：等待构建完成
echo ======================
echo.
echo 构建需要10-15分钟，请耐心等待。
echo 构建完成后，您会看到以下标志：
echo.
echo ✅ 构建状态显示"Success"
echo ✅ 可以点击"Download"按钮
echo ✅ APK文件大小约25-30MB
echo.
echo 第五步：下载APK文件
echo ======================
echo.
echo 1. 构建成功后，点击"Download"按钮
echo 2. 将APK文件保存到电脑
echo 3. 建议保存位置：桌面
echo.
set /p downloaded=APK文件下载完成了吗？(Y/N): 
if /i "%downloaded%" neq "Y" (
    echo 请先下载APK文件，然后再继续。
    pause
    exit /b 1
)

echo.
echo 第六步：安装到手机
echo ======================
echo.
echo 方法A：USB传输
echo 1. 用USB数据线连接手机和电脑
echo 2. 将APK文件复制到手机存储
echo 3. 在手机上打开文件管理器
echo 4. 找到APK文件并点击安装
echo 5. 允许"安装未知来源应用"
echo.
echo 方法B：电子邮件
echo 1. 将APK文件作为邮件附件发送到自己的邮箱
echo 2. 在手机上打开邮件应用
echo 3. 下载附件
echo 4. 安装应用
echo.
echo 方法C：网盘分享
echo 1. 上传APK到百度网盘
echo 2. 在手机上打开百度网盘应用
echo 3. 下载文件
echo 4. 安装应用
echo.
set /p installed=APK已安装到手机了吗？(Y/N): 
if /i "%installed%" neq "Y" (
    echo 请先安装APK到手机，然后再继续。
    pause
    exit /b 1
)

echo.
echo 第七步：测试应用
echo ==================
echo.
echo 请测试以下功能：
echo.
echo 1. ✅ 应用正常启动
echo 2. ✅ 主界面正常显示
echo 3. ✅ 导航功能正常
echo 4. ✅ 数据加载正常
echo 5. ✅ 所有模块可用
echo.
set /p tested=应用测试通过了吗？(Y/N): 
if /i "%tested%" neq "Y" (
    echo 请先测试应用功能，然后再继续。
    pause
    exit /b 1
)

echo.
echo ============================================
echo   🎉 恭喜！APK在线构建成功完成！
echo ============================================
echo.
echo 您已成功：
echo ✅ 上传项目到GitHub
echo ✅ 使用App Center在线构建
echo ✅ 下载APK文件
echo ✅ 安装到手机
echo ✅ 测试应用功能
echo.
echo 现在您可以：
echo 1. 将APK分发给所有员工
echo 2. 开始使用奶茶店管理系统
echo 3. 收集使用反馈
echo 4. 联系我们进行优化
echo.
echo 技术支持：
echo - 邮箱：support@hushang-auntie.com
echo - 电话：400-123-4567
echo.
pause