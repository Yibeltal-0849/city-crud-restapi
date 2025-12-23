
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory storage for cities
let cities = [];
let currentId = 1;


class EthiopianCity {
  constructor(id, name, amharicName, region, zone, population, elevation, foundedYear, isCapital, isUNESCO, isHistoric, description) {
    this.id = id;
    this.name = name;
    this.amharicName = amharicName || name;
    this.region = region;
    this.zone = zone || null;
    this.population = population;
    this.elevation = elevation; // In meters
    this.foundedYear = foundedYear;
    this.isCapital = isCapital || false;
    this.isUNESCO = isUNESCO || false;
    this.isHistoric = isHistoric || false;
    this.description = description || '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.country = 'Ethiopia'; // Fixed country
  }
}

// Add cities with rich information
cities.push(new EthiopianCity(
  currentId++, 
  'Addis Ababa', 
  'አዲስ አበባ', 
  'Addis Ababa City Administration', 
  null, 
  3500000, 
  2355, 
  1886, 
  true, // Federal capital
  false,
  true,
  'Capital city of Ethiopia, diplomatic hub of Africa, home to AU headquarters'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Dire Dawa', 
  'ድሬ ዳዋ', 
  'Dire Dawa City Administration', 
  null, 
  493000, 
  1276, 
  1902, 
  false,
  false,
  true,
  'Second largest city, important industrial and commercial center'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Bahir Dar', 
  'ባሕር ዳር', 
  'Amhara', 
  'West Gojjam', 
  348429, 
  1800, 
  1963, 
  true, // Regional capital
  false,
  false,
  'Capital of Amhara region, on Lake Tana near Blue Nile Falls'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Mekele', 
  'መቀሌ', 
  'Tigray', 
  'Debubawi', 
  323700, 
  2084, 
  13, 
  true, // Regional capital
  false,
  true,
  'Capital of Tigray region, historical and educational center'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Gondar', 
  'ጎንደር', 
  'Amhara', 
  'North Gondar', 
  323900, 
  2133, 
  1635, 
  false,
  true, // UNESCO site
  true,
  'Former imperial capital known as the "Camelot of Africa" with royal castles'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Hawassa', 
  'አዋሣ', 
  'Sidama', 
  'Sidama', 
  398000, 
  1708, 
  1960, 
  true, // Regional capital
  false,
  false,
  'Capital of Sidama region, resort city on Lake Hawassa'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Adama', 
  'አዳማ', 
  'Oromia', 
  'East Shewa', 
  420000, 
  1712, 
  1917, 
  false,
  false,
  false,
  'Major transportation and industrial hub in the Great Rift Valley'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Jimma', 
  'ጅማ', 
  'Oromia', 
  'Jimma', 
  207573, 
  1780, 
  1830, 
  false,
  false,
  true,
  'Center of coffee production, former capital of Jimma Kingdom'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Harar', 
  'ሐረር', 
  'Harari', 
  null, 
  151977, 
  1885, 
  1520, 
  true, // Regional capital
  true, // UNESCO site
  true,
  'Walled city, fourth holiest city in Islam, known for hyena feeding tradition'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Lalibela', 
  'ላሊበላ', 
  'Amhara', 
  'North Wollo', 
  17700, 
  2500, 
  1181, 
  false,
  true, // UNESCO site
  true,
  'Home to 11 medieval rock-hewn churches, major pilgrimage site'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Axum', 
  'አክሱም', 
  'Tigray', 
  'Central', 
  66500, 
  2131, 
  -400, 
  false,
  true, // UNESCO site
  true,
  'Ancient capital of Aksumite Empire, home to ancient obelisks'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Arba Minch', 
  'አርባ ምንጭ', 
  'SNNPR', 
  'Gamo Gofa', 
  151013, 
  1285, 
  1960, 
  false,
  false,
  false,
  '"Forty Springs", gateway to Nechisar National Park between Lakes Abaya and Chamo'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Debre Markos', 
  'ደብረ ማርቆስ', 
  'Amhara', 
  'East Gojjam', 
  104000, 
  2446, 
  1853, 
  false,
  false,
  true,
  'Historical city, capital of Gojjam province'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Jijiga', 
  'ጅጅጋ', 
  'Somali', 
  'Fafan', 
  159000, 
  1609, 
  1890, 
  true, // Regional capital
  false,
  false,
  'Capital of Somali region, major trading center'
));

cities.push(new EthiopianCity(
  currentId++, 
  'Assosa', 
  'አሶሳ', 
  'Benishangul-Gumuz', 
  'Assosa', 
  28500, 
  1570, 
  1987, 
  true, // Regional capital
  false,
  false,
  'Capital of Benishangul-Gumuz region'
));

// Helper function to validate city data
const validateCityData = (cityData, isUpdate = false) => {
  const errors = [];
  
  if (!isUpdate || cityData.name !== undefined) {
    if (!cityData.name || typeof cityData.name !== 'string' || cityData.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
  }
  
  if (cityData.population !== undefined && (typeof cityData.population !== 'number' || cityData.population < 0)) {
    errors.push('Population must be a non-negative number');
  }
  
  if (cityData.foundedYear !== undefined && (typeof cityData.foundedYear !== 'number')) {
    errors.push('Founded year must be a number');
  }
  
  if (cityData.elevation !== undefined && (typeof cityData.elevation !== 'number')) {
    errors.push('Elevation must be a number');
  }
  
  return errors;
};

// GET /api/cities - Get all  cities with advanced filtering
app.get('/api/cities', (req, res) => {
  try {
    const { 
      region, 
      minPopulation, 
      maxPopulation, 
      minElevation, 
      maxElevation,
      isCapital,
      isUNESCO,
      isHistoric,
      search,
      sortBy = 'name',
      order = 'asc'
    } = req.query;
    
    let filteredCities = [...cities];
    
    // Region filter
    if (region) {
      filteredCities = filteredCities.filter(city => 
        city.region.toLowerCase().includes(region.toLowerCase())
      );
    }
    
    // Population range filter
    if (minPopulation) {
      const minPop = parseInt(minPopulation);
      if (!isNaN(minPop)) {
        filteredCities = filteredCities.filter(city => city.population >= minPop);
      }
    }
    
    if (maxPopulation) {
      const maxPop = parseInt(maxPopulation);
      if (!isNaN(maxPop)) {
        filteredCities = filteredCities.filter(city => city.population <= maxPop);
      }
    }
    
    // Elevation range filter
    if (minElevation) {
      const minElev = parseInt(minElevation);
      if (!isNaN(minElev)) {
        filteredCities = filteredCities.filter(city => city.elevation >= minElev);
      }
    }
    
    if (maxElevation) {
      const maxElev = parseInt(maxElevation);
      if (!isNaN(maxElev)) {
        filteredCities = filteredCities.filter(city => city.elevation <= maxElev);
      }
    }
    
    // Boolean filters
    if (isCapital === 'true') {
      filteredCities = filteredCities.filter(city => city.isCapital);
    }
    
    if (isUNESCO === 'true') {
      filteredCities = filteredCities.filter(city => city.isUNESCO);
    }
    
    if (isHistoric === 'true') {
      filteredCities = filteredCities.filter(city => city.isHistoric);
    }
    
    // Search filter (by name or Amharic name)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCities = filteredCities.filter(city => 
        city.name.toLowerCase().includes(searchLower) ||
        city.amharicName.includes(search) ||
        city.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Sorting
    filteredCities.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'name' || sortBy === 'amharicName' || sortBy === 'region') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
    
    res.json({
      success: true,
      count: filteredCities.length,
      data: filteredCities
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// GET /api/cities/:id - Get single city by ID
app.get('/api/cities/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid city ID'
      });
    }
    
    const city = cities.find(c => c.id === id);
    
    if (!city) {
      return res.status(404).json({
        success: false,
        error: `City with ID ${id} not found`
      });
    }
    
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// GET /api/cities/name/:name - Get city by name (case insensitive)
app.get('/api/cities/name/:name', (req, res) => {
  try {
    const name = req.params.name.toLowerCase();
    const city = cities.find(c => c.name.toLowerCase() === name);
    
    if (!city) {
      return res.status(404).json({
        success: false,
        error: `City with name "${req.params.name}" not found`
      });
    }
    
    res.json({
      success: true,
      data: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// POST /api/cities - Create a new city
app.post('/api/cities', (req, res) => {
  try {
    const cityData = req.body;
    
    // Set country to Ethiopia by default
    cityData.country = 'Ethiopia';
    
    // Validate required fields
    const validationErrors = validateCityData(cityData);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    // Check if city with same name already exists
    const existingCity = cities.find(city => 
      city.name.toLowerCase() === cityData.name.toLowerCase()
    );
    
    if (existingCity) {
      return res.status(409).json({
        success: false,
        error: `City with name "${cityData.name}" already exists`
      });
    }
    
    // Create new city with auto-incremented ID
    const newCity = new EthiopianCity(
      currentId++,
      cityData.name.trim(),
      cityData.amharicName || cityData.name.trim(),
      cityData.region || 'Unknown',
      cityData.zone || null,
      cityData.population || 0,
      cityData.elevation || 0,
      cityData.foundedYear || null,
      cityData.isCapital || false,
      cityData.isUNESCO || false,
      cityData.isHistoric || false,
      cityData.description || ''
    );
    
    cities.push(newCity);
    
    res.status(201).json({
      success: true,
      message: 'Ethiopian city created successfully',
      data: newCity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// PUT /api/cities/:id - Update entire city
app.put('/api/cities/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid city ID'
      });
    }
    
    const cityIndex = cities.findIndex(c => c.id === id);
    
    if (cityIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `City with ID ${id} not found`
      });
    }
    
    const cityData = req.body;
    cityData.country = 'Ethiopia'; 
    
    // Validate all required fields for PUT (full update)
    const validationErrors = validateCityData(cityData);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    // Check for duplicate city (excluding current city)
    const duplicateCity = cities.find(city => 
      city.id !== id &&
      city.name.toLowerCase() === cityData.name.toLowerCase()
    );
    
    if (duplicateCity) {
      return res.status(409).json({
        success: false,
        error: 'Another city with the same name already exists'
      });
    }
    
    // Update the city
    const updatedCity = new EthiopianCity(
      id,
      cityData.name.trim(),
      cityData.amharicName || cityData.name.trim(),
      cityData.region || 'Unknown',
      cityData.zone || null,
      cityData.population || 0,
      cityData.elevation || 0,
      cityData.foundedYear || null,
      cityData.isCapital || false,
      cityData.isUNESCO || false,
      cityData.isHistoric || false,
      cityData.description || ''
    );
    
    // Preserve createdAt
    updatedCity.createdAt = cities[cityIndex].createdAt;
    updatedCity.updatedAt = new Date();
    
    cities[cityIndex] = updatedCity;
    
    res.json({
      success: true,
      message: 'City updated successfully',
      data: updatedCity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// PATCH /api/cities/:id - Partially update a city
app.patch('/api/cities/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid city ID'
      });
    }
    
    const cityIndex = cities.findIndex(c => c.id === id);
    
    if (cityIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `City with ID ${id} not found`
      });
    }
    
    const cityData = req.body;
    
    // Validate only provided fields for PATCH
    const validationErrors = validateCityData(cityData, true);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }
    
    // Check for duplicate if name is being updated
    if (cityData.name) {
      const duplicateCity = cities.find(city => 
        city.id !== id &&
        city.name.toLowerCase() === cityData.name.toLowerCase().trim()
      );
      
      if (duplicateCity) {
        return res.status(409).json({
          success: false,
          error: 'Another city with the same name already exists'
        });
      }
    }
    
    // Update only provided fields
    const currentCity = cities[cityIndex];
    const updatedCity = {
      ...currentCity,
      ...(cityData.name && { name: cityData.name.trim() }),
      ...(cityData.amharicName && { amharicName: cityData.amharicName }),
      ...(cityData.region && { region: cityData.region }),
      ...(cityData.zone && { zone: cityData.zone }),
      ...(cityData.population !== undefined && { population: cityData.population }),
      ...(cityData.elevation !== undefined && { elevation: cityData.elevation }),
      ...(cityData.foundedYear !== undefined && { foundedYear: cityData.foundedYear }),
      ...(cityData.isCapital !== undefined && { isCapital: cityData.isCapital }),
      ...(cityData.isUNESCO !== undefined && { isUNESCO: cityData.isUNESCO }),
      ...(cityData.isHistoric !== undefined && { isHistoric: cityData.isHistoric }),
      ...(cityData.description && { description: cityData.description }),
      updatedAt: new Date()
    };
    
    cities[cityIndex] = updatedCity;
    
    res.json({
      success: true,
      message: 'City updated successfully',
      data: updatedCity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// DELETE /api/cities/:id - Delete a city
app.delete('/api/cities/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid city ID'
      });
    }
    
    const cityIndex = cities.findIndex(c => c.id === id);
    
    if (cityIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `City with ID ${id} not found`
      });
    }
    
    const deletedCity = cities.splice(cityIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'City deleted successfully',
      data: deletedCity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});



// GET /api/cities/ethiopia/regional-capitals - Get all regional capitals
app.get('/api/cities/ethiopia/regional-capitals', (req, res) => {
  try {
    const regionalCapitals = cities.filter(city => city.isCapital);
    
    res.json({
      success: true,
      count: regionalCapitals.length,
      data: regionalCapitals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// GET /api/cities/ethiopia/unesco-sites - Get UNESCO World Heritage cities
app.get('/api/cities/ethiopia/unesco-sites', (req, res) => {
  try {
    const unescoCities = cities.filter(city => city.isUNESCO);
    
    // Add UNESCO-specific information
    const enhancedCities = unescoCities.map(city => ({
      ...city,
      unescoDetails: getUnescoDetails(city.name)
    }));
    
    res.json({
      success: true,
      count: enhancedCities.length,
      data: enhancedCities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Helper function for UNESCO details
const getUnescoDetails = (cityName) => {
  const unescoData = {
    'Gondar': {
      siteName: 'Fasil Ghebbi',
      yearListed: 1979,
      criteria: 'Cultural (ii)(iii)',
      description: 'Royal fortress-city with castles built between 1636-1855'
    },
    'Harar': {
      siteName: 'Harar Jugol',
      yearListed: 2006,
      criteria: 'Cultural (ii)(iii)(iv)(v)',
      description: 'Fortified historic town with 82 mosques and 102 shrines'
    },
    'Lalibela': {
      siteName: 'Rock-Hewn Churches',
      yearListed: 1978,
      criteria: 'Cultural (i)(ii)(iii)',
      description: '11 medieval monolithic cave churches'
    },
    'Axum': {
      siteName: 'Aksum',
      yearListed: 1980,
      criteria: 'Cultural (i)(iv)',
      description: 'Ruins of ancient Aksumite civilization'
    }
  };
  return unescoData[cityName] || null;
};

// GET /api/cities/ethiopia/historical - Get historical cities
app.get('/api/cities/ethiopia/historical', (req, res) => {
  try {
    const historicalCities = cities.filter(city => city.isHistoric);
    
    res.json({
      success: true,
      count: historicalCities.length,
      data: historicalCities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// GET /api/cities/ethiopia/by-region/:region - Get cities by specific region
app.get('/api/cities/ethiopia/by-region/:region', (req, res) => {
  try {
    const region = req.params.region;
    const regionCities = cities.filter(city => 
      city.region.toLowerCase().includes(region.toLowerCase())
    );
    
    if (regionCities.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No cities found in region "${region}"`
      });
    }
    
    res.json({
      success: true,
      region: region,
      count: regionCities.length,
      data: regionCities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// GET /api/cities/ethiopia/high-altitude - Get cities above 2000m
app.get('/api/cities/ethiopia/high-altitude', (req, res) => {
  try {
    const minElevation = parseInt(req.query.min) || 2000;
    const highAltitudeCities = cities.filter(city => city.elevation >= minElevation);
    
    res.json({
      success: true,
      minElevation: minElevation,
      count: highAltitudeCities.length,
      data: highAltitudeCities.sort((a, b) => b.elevation - a.elevation)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// GET /api/cities/ethiopia/statistics - Get statistical summary
app.get('/api/cities/ethiopia/statistics', (req, res) => {
  try {
    const ethiopianCities = cities;
    
    const totalPopulation = ethiopianCities.reduce((sum, city) => sum + city.population, 0);
    const avgPopulation = Math.round(totalPopulation / ethiopianCities.length);
    const highestCity = [...ethiopianCities].sort((a, b) => b.elevation - a.elevation)[0];
    const largestCity = [...ethiopianCities].sort((a, b) => b.population - a.population)[0];
    const oldestCity = [...ethiopianCities].filter(c => c.foundedYear).sort((a, b) => a.foundedYear - b.foundedYear)[0];
    
    const stats = {
      totalCities: ethiopianCities.length,
      totalPopulation: totalPopulation,
      averagePopulation: avgPopulation,
      regionalCapitals: ethiopianCities.filter(c => c.isCapital).length,
      unescoSites: ethiopianCities.filter(c => c.isUNESCO).length,
      historicalCities: ethiopianCities.filter(c => c.isHistoric).length,
      highestCity: {
        name: highestCity.name,
        elevation: highestCity.elevation
      },
      largestCity: {
        name: largestCity.name,
        population: largestCity.population
      },
      oldestCity: oldestCity ? {
        name: oldestCity.name,
        foundedYear: oldestCity.foundedYear
      } : null,
      regions: [...new Set(ethiopianCities.map(c => c.region))]
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Root endpoint 
app.get('/', (req, res) => {
  res.json({
    message: 'Ethiopian Cities Management API 🇪🇹',
    description: 'API for managing Ethiopian cities with regional, historical, and geographical data',
    endpoints: {
      basic_crud: {
        GET_all_cities: '/api/cities',
        GET_single_city: '/api/cities/:id',
        GET_city_by_name: '/api/cities/name/:name',
        POST_create_city: '/api/cities',
        PUT_update_city: '/api/cities/:id',
        PATCH_partial_update: '/api/cities/:id',
        DELETE_city: '/api/cities/:id'
      },
      ethiopian_specific: {
        GET_regional_capitals: '/api/cities/ethiopia/regional-capitals',
        GET_unesco_sites: '/api/cities/ethiopia/unesco-sites',
        GET_historical_cities: '/api/cities/ethiopia/historical',
        GET_cities_by_region: '/api/cities/ethiopia/by-region/:region',
        GET_high_altitude_cities: '/api/cities/ethiopia/high-altitude',
        GET_statistics: '/api/cities/ethiopia/statistics'
      },
      filtering_options: 'Use query parameters: region, minPopulation, maxPopulation, minElevation, maxElevation, isCapital, isUNESCO, isHistoric, search, sortBy, order'
    },
    note: 'All data is stored in memory and will reset on server restart',
    current_city_count: cities.length
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    suggestion: 'Visit / for available endpoints'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🇪🇹 Ethiopian Cities API Server Running 🇪🇹`);
  console.log(`=========================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
  console.log(`Initialized with ${cities.length} Ethiopian cities`);
  console.log(`=========================================`);
});