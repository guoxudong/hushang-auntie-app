@echo off
echo ============================================
echo   沪上阿姨奶茶店APP - 上传到GitHub
echo ============================================
echo.
echo 注意：此脚本需要Git和GitHub账号
echo.

REM 检查是否安装了Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：Git未安装！
    echo 请先安装Git：https://git-scm.com/download/win
    pause
    exit /b 1
)

echo 步骤1：初始化Git仓库
echo.
cd "C:\Users\Administrator\WorkBuddy\Claw\HushangAuntieInventory"
git init
if %errorlevel% neq 0 (
    echo Git初始化失败！
    pause
    exit /b 1
)

echo 步骤2：添加所有文件
echo.
git add .
if %errorlevel% neq 0 (
    echo 添加文件失败！
    pause
    exit /b 1
)

echo 步骤3：提交更改
echo.
git commit -m "沪上阿姨奶茶店管理系统APP v1.0.0"
if %errorlevel% neq 0 (
    echo 提交失败！
    pause
    exit /b 1
)

echo.
echo ============================================
echo   请手动完成以下步骤：
echo ============================================
echo.
echo 1. 访问 https://github.com
echo 2. 登录您的账号
echo 3. 点击"New repository"（新建仓库）
echo 4. 填写信息：
echo    - Repository name: hushang-auntie-app
echo    - Description: 沪上阿姨奶茶店管理系统
echo    - 选择"Public"（公开）
echo    - 不要勾选"Initialize with README"
echo 5. 点击"Create repository"
echo.
echo 6. 复制仓库地址（HTTPS格式）
echo 7. 回到此命令行，执行：
echo    git remote add origin [您的仓库地址]
echo    git branch -M main
echo    git push -u origin main
echo.
echo 8. 输入GitHub用户名和密码（或Token）
echo.
echo ============================================
echo   完成后，您就可以使用在线构建服务了！
echo ============================================
echo.
pause