# 使用一个基础镜像
FROM python:3.8

# 设置工作目录
WORKDIR /app

# 复制应用依赖
COPY requirements.txt /app/requirements.txt

# 安装依赖
RUN pip install -r requirements.txt

# 复制应用代码
COPY api /app

# 暴露端口
EXPOSE 5000

# 启动应用
CMD ["python", "flask_server.py"]
