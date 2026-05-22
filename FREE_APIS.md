# 🆓 Philadelphia Open Data API Guide

This application uses **100% free Philadelphia Open Data** for all datasets.

## ✅ What's Included (All Free)

| API | Purpose | Cost | Setup |
|-----|---------|------|-------|
| **Philadelphia Open Data** | Real estate transactions & public datasets | 🆓 FREE | No signup |
| **Cesium Ion** | 3D visualization | 🆓 FREE tier available | Token setup |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env

# 3. Add Cesium Ion token only
# Edit .env and add your token from https://cesium.com/ion/tokens

# 4. Start development
npm run dev
```

**That's it!** The app works out of the box with Philadelphia Open Data.

---

## 📊 Data Source

### Philadelphia Open Data (No API Key Required)
**Free public datasets for Philadelphia**

- ✅ Real estate transactions
- ✅ Neighborhood boundaries
- ✅ Housing statistics
- ✅ Building permits
- ✅ Zoning information

**Website:** https://data.phila.gov/  
**API Docs:** https://data.phila.gov/api/

**Example Dataset URLs:**
```
https://data.phila.gov/api/v2/catalog/datasets/real-estate-transactions/exports/json
https://data.phila.gov/api/v2/catalog/datasets/neighborhoods/exports/json
https://data.phila.gov/api/v2/catalog/datasets/housing-affordability-index/exports/json
```

---

## 💻 Code Integration

### Using Philadelphia Open Data

```typescript
import { fetchPhiladelphiaRealEstateData, fetchOpenDataPhillyNeighborhoods, fetchHousingAffordabilityData } from '@/layers/freeApis'

// Get real estate transactions from a specific year
const realEstate = await fetchPhiladelphiaRealEstateData(2024)

// Get neighborhood data
const neighborhoods = await fetchOpenDataPhillyNeighborhoods()

// Get housing affordability data
const housing = await fetchHousingAffordabilityData()
```

---

## 📋 Environment Variables

### Required
```
VITE_CESIUM_ION_TOKEN=  # Get from https://cesium.com/ion/tokens
```

### Automatic
```
VITE_PHILLY_DATA_API=https://data.phila.gov/api/v2
```

---

## 🔍 Available Functions

All functions are in `src/layers/freeApis.ts`:

1. **`fetchPhiladelphiaRealEstateData(year: number)`**
   - Returns real estate transactions for a given year
   - Automatically filters by year

2. **`fetchOpenDataPhillyNeighborhoods()`**
   - Returns neighborhood data

3. **`fetchHousingAffordabilityData()`**
   - Returns housing affordability metrics

---

## ✨ Why Philadelphia Open Data?

- ✅ **No signup required** - Public API
- ✅ **No API keys needed** - Completely open
- ✅ **Free unlimited requests** - No rate limits
- ✅ **Official data** - From Philadelphia city government
- ✅ **Complete historical data** - 2015-2024+
- ✅ **No organization/team required** - Use immediately

---

## 🆘 Troubleshooting

### "API returns empty data"
- Check the URL in the browser: `https://data.phila.gov/api/v2/catalog/datasets/real-estate-transactions/exports/json`
- Philadelphia Open Data may have data updates or API changes
- Check https://data.phila.gov for available datasets

### "Network errors when fetching"
- Verify you have internet connection
- Check CORS settings (Philadelphia Open Data allows CORS for public endpoints)
- Use browser DevTools > Network tab to debug

---

## 📚 Learn More

- **Philadelphia Open Data Portal:** https://data.phila.gov/
- **Full API Documentation:** https://data.phila.gov/api/
- **Cesium Documentation:** https://cesium.com/learn/
- **React Query Documentation:** https://tanstack.com/query

---

## 🎯 Next Steps

1. Start the app: `npm run dev`
2. Open browser: `http://localhost:5173`
3. Adjust timeline and click neighborhoods to see data
4. Check browser console for API responses
5. Modify color ramps or visualizations as needed

// 1. Real estate transactions for a year
const realEstate = await fetchPhiladelphiaRealEstateData(2024)
// Returns array of property transactions

// 2. Census demographic data
const census = await fetchCensusData('YOUR_API_KEY', 2020)
// Returns population, income, housing unit data

// 3. Gentrification score (combines all data)
const indicators = await fetchGentrificationIndicators('YOUR_API_KEY')
// Returns: { rentChange, propertyValueChange, populationChange, incomeChange }
```

---

## 📈 Data Quality Notes

### Philadelphia Open Data
- ✅ Official city data
- ✅ Updated regularly
- ✅ Covers 2015-2024
- ✅ No rate limits for public access

### US Census Bureau
- ✅ Authoritative demographic data
- ✅ 2020 Census data available
- ✅ American Community Survey (annual)
- ⚠️ Rate limited (check docs)

### Combining Data Sources
The app intelligently combines:
- Real estate transactions (prices, volume)
- Census data (population, income)
- Open data (permits, zoning)

To calculate a **Displacement Pressure Score** 0-100.

---

## ⚠️ Rate Limits

| API | Limit | Behavior |
|-----|-------|----------|
| Philadelphia Open Data | None (public) | No restrictions |
| US Census Bureau | ~120 requests/min | Added automatic retry |
| Mapbox | 100k/month (free) | Returns 429 if exceeded |

---

## 🐛 Troubleshooting

### "Census API not configured"
```
⚠️ Census API key not configured. Sign up free: https://api.census.gov/data/key_signup.html
```
**Solution:** Add API key to `.env` or remove if not needed.

### "Philadelphia data not loading"
**Solution:** Check network tab in browser DevTools. Philadelphia Open Data sometimes has uptime issues.

### "Rate limit exceeded"
**Solution:** Add exponential backoff retry logic (already included in freeApis.ts).

---

## 🎯 Comparison: CARTO vs Free Alternatives

| Feature | CARTO | Free APIs |
|---------|-------|-----------|
| **Cost** | Paid ($) | 🆓 FREE |
| **Real Estate Data** | ✅ Yes | ✅ Yes (Philly Open Data) |
| **Demographics** | ✅ Yes | ✅ Yes (Census Bureau) |
| **Rate Limits** | Depends on plan | None for Philly data |
| **Requires Organization** | ✅ Yes | ❌ No |
| **Historical Data** | ✅ 2015-2024 | ✅ 2015-2024 |

---

## 🚀 Scaling with Free APIs

### Small Projects (< 1M requests/month)
✅ Use free tier APIs directly

### Medium Projects (1M-10M requests/month)
✅ Add caching layer
✅ Batch API requests
✅ Consider upgrading Mapbox

### Large Projects (> 10M requests/month)
⚠️ Consider upgrading to paid tiers or hybrid approach

---

## 📚 Additional Free Data Sources

If you need more data, check:
- **USGS Maps**: https://maps.usgs.gov/
- **OpenStreetMap**: https://www.openstreetmap.org/
- **GeoNames**: https://www.geonames.org/
- **Zillow API**: https://www.zillow.com/howto/api/ (check current status)
- **Overpass API**: https://overpass-api.de/

---

## 💡 Tips for Success

1. **Cache Results**: Store API responses locally to reduce calls
2. **Batch Requests**: Combine multiple queries into one request
3. **Use Historical Data**: Philadelphia Open Data has years of data
4. **Combine Sources**: Use Census for demographics + Open Data for transactions
5. **Test Early**: Check API availability before building features

---

## 📞 Support

If you have questions about:
- **Cesium**: https://cesium.com/docs/
- **Census Bureau API**: https://api.census.gov/data/
- **Philadelphia Open Data**: https://data.phila.gov/
- **This project**: Check DEVELOPMENT.md and ARCHITECTURE.md

---

**✅ You now have a fully functional webapp with 100% free APIs!**

No CARTO needed. No organization required. Just great geospatial data for Philadelphia.

Happy coding! 🎉
