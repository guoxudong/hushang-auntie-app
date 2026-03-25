@echo off
echo 正在启动沪上阿姨奶茶店库存管理系统预览版...
echo.
echo 请访问以下链接查看应用：
echo http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo.

REM 启动本地服务器
python -m http.server 3000 --directory static-preview

pause