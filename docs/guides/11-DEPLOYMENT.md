# Azure Deployment Guide

Complete guide to deploying PackEdge on Microsoft Azure.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Azure Cloud                           │
├──────────────────┬──────────────────────────────────────┤
│ Static Web Apps  │   App Service                         │
│ (Frontend)       │   (Strapi Backend)                    │
│ React SPA        │   - Port 1337                         │
│ - CDN            │   - Node 18 LTS                       │
└──────────────────┴──────────────────────────────────────┘
              │                          │
              └──────────────┬───────────┘
                             │
                 ┌───────────▼────────────┐
                 │  Azure Database for    │
                 │  PostgreSQL            │
                 │  - Port 5432           │
                 │  - Encrypted           │
                 └────────────────────────┘
                             │
              ┌──────────────┴───────────────┐
              │                              │
     ┌────────▼────────┐        ┌───────────▼──────┐
     │ Azure Blob      │        │ Azure Monitor &  │
     │ Storage         │        │ Log Analytics    │
     │ (File uploads)  │        │ (Monitoring)     │
     └─────────────────┘        └──────────────────┘
```

---

## 📋 Prerequisites

- Azure account with active subscription
- Azure CLI installed (`az --version`)
- Git and GitHub account
- Node.js 18+ (for local testing)

### Install Azure CLI

```bash
# macOS
brew install azure-cli

# Windows (PowerShell as Admin)
choco install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

---

## 🔑 Step 1: Setup Azure Resources

### 1.1 Create Resource Group

```bash
# Set variables
$RESOURCE_GROUP="packedge-rg"
$LOCATION="eastus"  # or your preferred location

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

### 1.2 Create Azure Database for PostgreSQL

```bash
# Variables
$DB_SERVER="packedge-database"
$DB_ADMIN="dbadmin"
$DB_PASSWORD="Y0urStr0ng!Passw0rd123"

# Create PostgreSQL server
az postgres flexible-server create \
  --resource-group $RESOURCE_GROUP \
  --name $DB_SERVER \
  --location $LOCATION \
  --admin-user $DB_ADMIN \
  --admin-password $DB_PASSWORD \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --version 14 \
  --high-availability Disabled

# Create database
az postgres flexible-server db create \
  --database-name packedge \
  --server-name $DB_SERVER \
  --resource-group $RESOURCE_GROUP

# Get connection string
az postgres flexible-server show-connection-string \
  --server-name $DB_SERVER
```

**Output:** Save the connection string - you'll need it later!

### 1.3 Create App Service Plan

```bash
# Create App Service Plan (Linux)
az appservice plan create \
  --name packedge-plan \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku B1 \
  --is-linux
```

### 1.4 Create App Service for Backend

```bash
# Create App Service
az webapp create \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --plan packedge-plan \
  --runtime "NODE|18-lts"

# Set startup command
az webapp config set \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --startup-file "npm run start"
```

### 1.5 Create Static Web Apps for Frontend

```bash
# Create Static Web App
az staticwebapp create \
  --name packedge-frontend \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --source https://github.com/yourusername/PackEdge \
  --branch main \
  --app-location "frontend/dist" \
  --api-location ""
```

---

## 🔐 Step 2: Configure Environment Variables

### Backend Environment Variables

```bash
# Set environment variables for App Service
az webapp config appsettings set \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --settings \
    NODE_ENV="production" \
    DATABASE_URL="your-azure-connection-string" \
    JWT_SECRET="$(openssl rand -base64 32)" \
    ADMIN_JWT_SECRET="$(openssl rand -base64 32)" \
    PORT="8080" \
    HOST="0.0.0.0"
```

### Storage Account for File Uploads

```bash
# Create Storage Account
az storage account create \
  --name packedgeblob \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --kind StorageV2

# Get connection string
STORAGE_CONN_STRING=$(az storage account show-connection-string \
  --name packedgeblob \
  --resource-group $RESOURCE_GROUP \
  --query connectionString -o tsv)

# Create container
az storage container create \
  --name packedge \
  --account-name packedgeblob

# Add to App Service
az webapp config appsettings set \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --settings \
    AZURE_STORAGE_CONNECTION_STRING="$STORAGE_CONN_STRING" \
    AZURE_STORAGE_CONTAINER="packedge"
```

---

## 🚀 Step 3: Setup GitHub Actions Secrets

### Add Azure Publish Profile

```bash
# Get publish profile for backend
az webapp deployment list-publishing-profiles \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --query "[?publishMethod=='MSDeploy'].*.publishingProfile" \
  -o tsv > backend-publish-profile.xml
```

**Add to GitHub Secrets:**
1. Go to GitHub repo Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Add:
   - **Name:** `AZURE_PUBLISH_PROFILE_BACKEND`
   - **Value:** Contents of `backend-publish-profile.xml`

### Add Static Web Apps Token

```bash
# Get deployment token
az staticwebapp secrets list \
  --name packedge-frontend \
  --resource-group $RESOURCE_GROUP
```

**Add to GitHub Secrets:**
- **Name:** `AZURE_STATIC_WEB_APPS_TOKEN`
- **Value:** Your deployment token

---

## 📤 Step 4: Deploy

### Manual Deployment (First Time)

```bash
# Backend
cd backend
npm install
npm run build
az webapp up \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP

# Frontend
cd ../frontend
npm install
npm run build
# Push to trigger GitHub Actions
```

### Automatic Deployment (GitHub Actions)

Push to `main` branch:

```bash
git add .
git commit -m "Deploy to Azure"
git push origin main
```

GitHub Actions will automatically:
1. Build backend and frontend
2. Run tests
3. Deploy to Azure App Service (backend)
4. Deploy to Azure Static Web Apps (frontend)

---

## ✅ Step 5: Verify Deployment

### Check Backend

```bash
# Get backend URL
az webapp show \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --query defaultHostName

# Test API
curl https://packedge-backend.azurewebsites.net/api/products
```

### Check Frontend

```bash
# Get frontend URL
az staticwebapp show \
  --name packedge-frontend \
  --resource-group $RESOURCE_GROUP \
  --query "defaultDomain"
```

### Check Database Logs

```bash
# View recent logs
az webapp log tail \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP
```

---

## 🔒 Step 6: Security Configuration

### Enable HTTPS

```bash
# Backend already uses HTTPS
# Frontend via Azure Static Web Apps (automatic)
```

### Configure CORS

Update `backend/config/server.js`:

```javascript
module.exports = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 1337,
  admin: {
    auth: {
      secret: process.env.ADMIN_JWT_SECRET,
    },
  },
  api: {
    rest: {
      prefix: '/api',
    },
  },
  middleware: {
    cors: {
      enabled: true,
      origin: [
        'https://packedge-frontend.azurestaticapps.net',
        'https://packedge.com',
      ],
      credentials: true,
    },
  },
};
```

### Configure Firewall

```bash
# Allow only necessary IPs
az postgres flexible-server firewall-rule create \
  --resource-group $RESOURCE_GROUP \
  --name packedge-database \
  --rule-name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0
```

---

## 📊 Step 7: Monitor and Logging

### Setup Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
  --app packedge-backend-insights \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP \
  --application-type web

# Get instrumentation key
az monitor app-insights component show \
  --app packedge-backend-insights \
  --resource-group $RESOURCE_GROUP \
  --query "instrumentationKey"
```

### Enable App Service Logs

```bash
# Enable logging
az webapp log config \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --application-logging filesystem \
  --detailed-error-messages true \
  --failed-request-tracing true \
  --web-server-logging filesystem

# View logs
az webapp log tail \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP
```

### Setup Alerts

```bash
# Create alert for high CPU
az monitor metrics alert create \
  --name packedge-high-cpu \
  --resource-group $RESOURCE_GROUP \
  --scopes "/subscriptions/{subscription-id}/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/serverfarms/packedge-plan" \
  --condition "avg Percentage_CPU > 80" \
  --window-size 5m \
  --evaluation-frequency 1m
```

---

## 💰 Cost Optimization

### Recommended SKUs

| Service | SKU | Cost | Notes |
|---------|-----|------|-------|
| App Service | B1 | ~$12/month | Sufficient for small apps |
| PostgreSQL | Burstable B1ms | ~$30/month | Auto-scaling available |
| Static Web Apps | Free tier | $0 | Includes 1GB bandwidth |
| Storage Account | Standard LRS | ~$1/month | For file uploads |

### Reduce Costs

```bash
# Use reserved instances
az appservice plan update \
  --resource-group $RESOURCE_GROUP \
  --name packedge-plan \
  --sku B1

# Enable auto-shutdown (non-production)
# In Azure Portal: App Service → Settings → Auto-shutdown
```

---

## 🔄 Continuous Integration/Deployment

### GitHub Actions Workflow Status

View at: `https://github.com/yourusername/PackEdge/actions`

### Rollback Deployment

```bash
# View deployment history
az webapp deployment list \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP

# Swap slots (if using slots)
az webapp deployment slot swap \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --slot staging
```

---

## 🐛 Troubleshooting

### Deployment Fails

```bash
# Check logs
az webapp log tail --name packedge-backend --resource-group $RESOURCE_GROUP

# Restart app
az webapp restart --name packedge-backend --resource-group $RESOURCE_GROUP
```

### Database Connection Error

```bash
# Test connection
psql "host=packedge-database.postgres.database.azure.com \
      port=5432 \
      database=packedge \
      user=dbadmin@packedge-database \
      password=yourpassword"

# Check firewall rules
az postgres flexible-server firewall-rule list \
  --resource-group $RESOURCE_GROUP \
  --server-name packedge-database
```

### Static Web App Not Loading

```bash
# Check build logs
az staticwebapp show \
  --name packedge-frontend \
  --resource-group $RESOURCE_GROUP

# Check routing
# Ensure frontend build output is in frontend/dist
```

---

## 📚 Useful Commands

```bash
# List all resources
az resource list --resource-group $RESOURCE_GROUP --output table

# Get connection strings
az webapp config connection-string list \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP

# Update runtime
az webapp config appsettings set \
  --name packedge-backend \
  --resource-group $RESOURCE_GROUP \
  --settings WEBSITE_NODE_DEFAULT_VERSION=~18

# Stream live logs
az webapp log stream --name packedge-backend --resource-group $RESOURCE_GROUP
```

---

## 🚀 Next Steps

1. ✅ Create Azure resources
2. ✅ Setup GitHub Actions
3. ✅ Configure environment variables
4. ✅ Deploy backend and frontend
5. ✅ Verify everything works
6. ✅ Setup monitoring and alerts
7. ⏭️ Setup custom domain (packedge.com)
8. ⏭️ Configure SSL/TLS certificates
9. ⏭️ Setup backup and recovery

---

## 📖 References

- [Azure Documentation](https://docs.microsoft.com/azure/)
- [Azure App Service Node.js](https://docs.microsoft.com/azure/app-service/app-service-web-nodejs-get-started)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Database for PostgreSQL](https://docs.microsoft.com/azure/postgresql/)
- [GitHub Actions with Azure](https://github.com/marketplace/actions/azure-app-service-settings)

---

**Last Updated:** April 6, 2026
