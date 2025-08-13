# 🐳 Docker Deployment Guide for OpenBiz RegisX

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop/)
- **Docker Compose**: Usually included with Docker Desktop
- **Git**: For cloning the repository

## 🚀 Quick Start (Local Development)

### 1. Clone and Navigate

```bash
git clone <your-repo-url>
cd openBiz_regisx
```

### 2. Build and Run

```bash
# Using the deployment script (recommended)
./deploy.sh        # Linux/Mac
./deploy.bat       # Windows

# Or manually with Docker Compose
docker-compose up --build
```

### 3. Access Applications

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000

## 🏗️ Project Structure

```
openBiz_regisx/
├── frontend_ts/          # Next.js Frontend
│   ├── Dockerfile
│   ├── .dockerignore
│   └── next.config.js
├── backend_ts/           # Next.js Backend
│   ├── Dockerfile
│   ├── .dockerignore
│   └── next.config.js
├── docker-compose.yml    # Development
├── docker-compose.prod.yml # Production
├── nginx.conf           # Reverse proxy config
├── deploy.sh           # Linux/Mac deployment
└── deploy.bat          # Windows deployment
```

## 🔧 Development Commands

### Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up --build --force-recreate
```

### Individual Service Commands

```bash
# Build specific service
docker-compose build frontend
docker-compose build backend

# Start specific service
docker-compose up frontend
docker-compose up backend

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

## 🌐 Production Deployment

### Option 1: VPS/Cloud Server Deployment

#### 1. Prepare Your Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

#### 2. Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd openBiz_regisx

# Use production configuration
docker-compose -f docker-compose.prod.yml up -d --build
```

#### 3. Set up Domain and SSL

```bash
# Install Certbot for SSL
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Update nginx.conf with your domain and SSL paths
# Restart services
docker-compose -f docker-compose.prod.yml restart
```

### Option 2: AWS ECS Deployment

#### 1. Build and Push to ECR

```bash
# Create ECR repositories
aws ecr create-repository --repository-name openbiz-frontend
aws ecr create-repository --repository-name openbiz-backend

# Get login token
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-west-2.amazonaws.com

# Build and tag images
docker build -t openbiz-frontend ./frontend_ts
docker build -t openbiz-backend ./backend_ts

docker tag openbiz-frontend:latest <account-id>.dkr.ecr.us-west-2.amazonaws.com/openbiz-frontend:latest
docker tag openbiz-backend:latest <account-id>.dkr.ecr.us-west-2.amazonaws.com/openbiz-backend:latest

# Push images
docker push <account-id>.dkr.ecr.us-west-2.amazonaws.com/openbiz-frontend:latest
docker push <account-id>.dkr.ecr.us-west-2.amazonaws.com/openbiz-backend:latest
```

#### 2. Create ECS Task Definition

```json
{
	"family": "openbiz-app",
	"networkMode": "awsvpc",
	"requiresCompatibilities": ["FARGATE"],
	"cpu": "256",
	"memory": "512",
	"taskRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskRole",
	"executionRoleArn": "arn:aws:iam::<account-id>:role/ecsTaskExecutionRole",
	"containerDefinitions": [
		{
			"name": "frontend",
			"image": "<account-id>.dkr.ecr.us-west-2.amazonaws.com/openbiz-frontend:latest",
			"portMappings": [
				{
					"containerPort": 3000,
					"protocol": "tcp"
				}
			]
		},
		{
			"name": "backend",
			"image": "<account-id>.dkr.ecr.us-west-2.amazonaws.com/openbiz-backend:latest",
			"portMappings": [
				{
					"containerPort": 4000,
					"protocol": "tcp"
				}
			]
		}
	]
}
```

### Option 3: Vercel Deployment (Easiest for Next.js)

#### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend
cd frontend_ts

# Deploy
vercel --prod
```

#### Backend (Vercel)

```bash
# Navigate to backend
cd backend_ts

# Deploy
vercel --prod
```

### Option 4: Railway Deployment

#### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

#### 2. Deploy

```bash
# Login to Railway
railway login

# Create new project
railway new

# Deploy frontend
cd frontend_ts
railway up

# Deploy backend
cd ../backend_ts
railway up
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Backend (.env.local)

```env
NODE_ENV=production
PORT=4000
FRONTEND_URL=http://localhost:3000
```

### Docker Environment Variables

Update `docker-compose.yml` environment sections:

```yaml
services:
  frontend:
    environment:
      - NEXT_PUBLIC_API_URL=https://your-backend-domain.com
      - NEXT_PUBLIC_APP_URL=https://your-frontend-domain.com

  backend:
    environment:
      - FRONTEND_URL=https://your-frontend-domain.com
      - NODE_ENV=production
```

## 🔍 Monitoring and Logs

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend

# Last N lines
docker-compose logs --tail=100 frontend
```

### Health Checks

```bash
# Check container status
docker-compose ps

# Check container health
docker stats

# Execute commands in running container
docker-compose exec frontend sh
docker-compose exec backend sh
```

## 🛠️ Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process using port
sudo lsof -t -i tcp:3000 | xargs kill -9
sudo lsof -t -i tcp:4000 | xargs kill -9
```

#### Permission Denied

```bash
# Fix Docker permissions
sudo chown -R $USER:$USER .
sudo chmod +x deploy.sh
```

#### Build Failures

```bash
# Clean Docker system
docker system prune -a

# Remove all containers and rebuild
docker-compose down --rmi all
docker-compose up --build
```

#### Memory Issues

```bash
# Increase Docker memory limit in Docker Desktop settings
# Or add to docker-compose.yml:
services:
  frontend:
    deploy:
      resources:
        limits:
          memory: 1G
```

## 📊 Performance Optimization

### 1. Multi-stage Builds

- Already implemented in Dockerfiles
- Reduces final image size by excluding build dependencies

### 2. Layer Caching

```dockerfile
# Copy package files first for better caching
COPY package*.json ./
RUN npm ci
COPY . .
```

### 3. Production Optimizations

```javascript
// next.config.js
const nextConfig = {
	output: "standalone",
	compress: true,
	poweredByHeader: false,
	generateEtags: false,
};
```

## 🔒 Security Best Practices

### 1. Use Non-root User

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

### 2. Minimize Attack Surface

```dockerfile
# Use specific versions
FROM node:18-alpine

# Remove unnecessary packages
RUN apk del .build-deps
```

### 3. Environment Variables

- Never commit sensitive data
- Use Docker secrets for production
- Validate all environment variables

## 📝 Deployment Checklist

### Pre-deployment

- [ ] Update environment variables
- [ ] Test locally with production config
- [ ] Run security scans
- [ ] Update documentation

### Deployment

- [ ] Build and test images
- [ ] Deploy to staging first
- [ ] Run smoke tests
- [ ] Monitor logs during deployment

### Post-deployment

- [ ] Verify all services are running
- [ ] Test critical user journeys
- [ ] Monitor performance metrics
- [ ] Set up alerts and monitoring

## 📞 Support

For issues and questions:

1. Check this documentation
2. Review Docker logs
3. Check GitHub issues
4. Contact the development team

---

**Happy Deploying! 🚀**
