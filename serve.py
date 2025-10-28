#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8080
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    """启动静态文件服务器"""
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 静态服务器已启动")
        print(f"📍 目录: {DIRECTORY}")
        print(f"🌐 访问地址: http://localhost:{PORT}")
        print(f"📄 HTML文件列表:")
        
        # 列出所有HTML文件
        html_files = list(DIRECTORY.glob("*.html"))
        for html_file in html_files:
            print(f"   • http://localhost:{PORT}/{html_file.name}")
        
        print(f"\n⏹️  按 Ctrl+C 停止服务器")
        
        # 自动打开浏览器
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except Exception:
            pass
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n✅ 服务器已停止")

if __name__ == "__main__":
    start_server()