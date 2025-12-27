// Bangalore places database with costs, transport, and preferences
const placesData = {
    'cubbon-park': {
        name: 'Cubbon Park',
        type: 'outdoor',
        entryFee: 0,
        avgTime: 2,
        description: 'A beautiful public park in the heart of Bangalore',
        activities: ['Walking', 'Photography', 'Relaxation'],
        emotionalTags: ['romantic', 'alone', 'sad', 'happy', 'angry', 'neutral']
    },
    'lalbagh': {
        name: 'Lalbagh Botanical Garden',
        type: 'outdoor',
        entryFee: 20,
        avgTime: 3,
        description: 'Famous botanical garden with glass house and flower shows',
        activities: ['Nature Walk', 'Photography', 'Boating'],
        emotionalTags: ['romantic', 'alone', 'happy', 'neutral']
    },
    'bannerghatta': {
        name: 'Bannerghatta National Park',
        type: 'outdoor',
        entryFee: 80,
        avgTime: 4,
        description: 'Wildlife sanctuary with safari and zoo',
        activities: ['Safari', 'Zoo Visit', 'Butterfly Park'],
        emotionalTags: ['happy', 'romantic', 'neutral']
    },
    'nandi-hills': {
        name: 'Nandi Hills',
        type: 'outdoor',
        entryFee: 5,
        avgTime: 4,
        description: 'Scenic hill station perfect for sunrise views',
        activities: ['Trekking', 'Sunrise View', 'Paragliding'],
        emotionalTags: ['romantic', 'alone', 'sad', 'angry', 'happy', 'neutral']
    },
    'wonderla': {
        name: 'Wonderla Amusement Park',
        type: 'outdoor',
        entryFee: 1200,
        avgTime: 5,
        description: 'Thrilling amusement park with water rides',
        activities: ['Rides', 'Water Park', 'Entertainment'],
        emotionalTags: ['happy', 'romantic']
    },
    'isckon': {
        name: 'ISKCON Temple',
        type: 'indoor',
        entryFee: 0,
        avgTime: 2,
        description: 'Beautiful Krishna temple with spiritual atmosphere',
        activities: ['Prayer', 'Meditation', 'Prasadam'],
        emotionalTags: ['alone', 'sad', 'angry', 'neutral']
    },
    'tipu-sultan': {
        name: 'Tipu Sultan\'s Summer Palace',
        type: 'indoor',
        entryFee: 20,
        avgTime: 2,
        description: 'Historic palace with beautiful architecture',
        activities: ['History Tour', 'Photography', 'Architecture'],
        emotionalTags: ['alone', 'neutral', 'romantic']
    },
    'bangalore-palace': {
        name: 'Bangalore Palace',
        type: 'indoor',
        entryFee: 230,
        avgTime: 2,
        description: 'Royal palace with Tudor-style architecture',
        activities: ['Palace Tour', 'Photography', 'History'],
        emotionalTags: ['romantic', 'alone', 'neutral']
    },
    'vidhana-soudha': {
        name: 'Vidhana Soudha',
        type: 'indoor',
        entryFee: 0,
        avgTime: 1,
        description: 'Seat of Karnataka state legislature',
        activities: ['Architecture View', 'Photography'],
        emotionalTags: ['neutral', 'alone']
    },
    'innovative-film-city': {
        name: 'Innovative Film City',
        type: 'both',
        entryFee: 600,
        avgTime: 4,
        description: 'Entertainment complex with film sets and attractions',
        activities: ['Film Sets', 'Rides', 'Museums'],
        emotionalTags: ['happy', 'romantic']
    },
    'big-bull-temple': {
        name: 'Big Bull Temple',
        type: 'indoor',
        entryFee: 0,
        avgTime: 1,
        description: 'Famous temple with massive Nandi statue',
        activities: ['Prayer', 'Photography'],
        emotionalTags: ['alone', 'sad', 'angry', 'neutral']
    },
    'ulsoor-lake': {
        name: 'Ulsoor Lake',
        type: 'outdoor',
        entryFee: 0,
        avgTime: 2,
        description: 'Serene lake perfect for boating and relaxation',
        activities: ['Boating', 'Walking', 'Photography'],
        emotionalTags: ['romantic', 'alone', 'sad', 'angry', 'happy', 'neutral']
    },
    'mg-road': {
        name: 'MG Road & Commercial Street',
        type: 'outdoor',
        entryFee: 0,
        avgTime: 3,
        description: 'Shopping and dining hub of Bangalore',
        activities: ['Shopping', 'Dining', 'Street Food'],
        emotionalTags: ['happy', 'romantic', 'neutral']
    },
    'national-gallery': {
        name: 'National Gallery of Modern Art',
        type: 'indoor',
        entryFee: 20,
        avgTime: 2,
        description: 'Art gallery showcasing modern Indian art',
        activities: ['Art Viewing', 'Photography', 'Education'],
        emotionalTags: ['alone', 'sad', 'neutral', 'romantic']
    },
    'visvesvaraya-museum': {
        name: 'Visvesvaraya Industrial & Technological Museum',
        type: 'indoor',
        entryFee: 40,
        avgTime: 3,
        description: 'Interactive science and technology museum',
        activities: ['Science Exhibits', 'Interactive Learning', 'Education'],
        emotionalTags: ['happy', 'neutral']
    }
};

// Location coordinates for distance calculation (simplified)
const locationData = {
    'koramangala': { name: 'Koramangala', zone: 'south' },
    'indiranagar': { name: 'Indiranagar', zone: 'central' },
    'whitefield': { name: 'Whitefield', zone: 'east' },
    'marathahalli': { name: 'Marathahalli', zone: 'east' },
    'hebbal': { name: 'Hebbal', zone: 'north' },
    'jayanagar': { name: 'Jayanagar', zone: 'south' },
    'btm': { name: 'BTM Layout', zone: 'south' },
    'malleshwaram': { name: 'Malleshwaram', zone: 'north' },
    'rajajinagar': { name: 'Rajajinagar', zone: 'north' },
    'vijayanagar': { name: 'Vijayanagar', zone: 'west' },
    'electronic-city': { name: 'Electronic City', zone: 'south' },
    'yeshwanthpur': { name: 'Yeshwanthpur', zone: 'north' }
};

// Destination zones
const destinationZones = {
    'cubbon-park': 'central',
    'lalbagh': 'south',
    'bannerghatta': 'south',
    'nandi-hills': 'north',
    'wonderla': 'south',
    'isckon': 'south',
    'tipu-sultan': 'central',
    'bangalore-palace': 'central',
    'vidhana-soudha': 'central',
    'innovative-film-city': 'south',
    'big-bull-temple': 'south',
    'ulsoor-lake': 'central',
    'mg-road': 'central',
    'national-gallery': 'central',
    'visvesvaraya-museum': 'central'
};

// Transport options with realistic costs (Bangalore rates) - filtered by preferences
function getTransportOptions(from, to, people, preferences = {}) {
    const fromZone = locationData[from]?.zone || 'central';
    const toZone = destinationZones[to] || 'central';
    
    // Calculate base distance (simplified - same zone = short, different = long)
    const isSameZone = fromZone === toZone;
    const isAdjacent = (fromZone === 'central' && ['north', 'south', 'east', 'west'].includes(toZone)) ||
                       (toZone === 'central' && ['north', 'south', 'east', 'west'].includes(fromZone));
    
    let baseDistance = 'medium';
    if (isSameZone) baseDistance = 'short';
    else if (isAdjacent) baseDistance = 'medium';
    else baseDistance = 'long';
    
    // Special cases for far destinations
    if (to === 'nandi-hills' || to === 'bannerghatta' || to === 'wonderla') {
        baseDistance = 'long';
    }
    
    const transportOptions = [];
    
    // Auto-rickshaw (per trip, can fit 3 people)
    if (baseDistance === 'short') {
        transportOptions.push({
            name: 'Auto-rickshaw',
            cost: Math.ceil(people / 3) * 120, // ₹120 per auto, 3 people per auto
            time: '30-45 min',
            icon: '🛺',
            note: people > 3 ? `(${Math.ceil(people / 3)} autos needed)` : ''
        });
    } else if (baseDistance === 'medium') {
        transportOptions.push({
            name: 'Auto-rickshaw',
            cost: Math.ceil(people / 3) * 200, // ₹200 per auto
            time: '45-60 min',
            icon: '🛺',
            note: people > 3 ? `(${Math.ceil(people / 3)} autos needed)` : ''
        });
    } else {
        transportOptions.push({
            name: 'Auto-rickshaw',
            cost: Math.ceil(people / 3) * 350, // ₹350 per auto
            time: '60-90 min',
            icon: '🛺',
            note: people > 3 ? `(${Math.ceil(people / 3)} autos needed)` : ''
        });
    }
    
    // Ola/Uber (per trip, can fit 4 people in sedan)
    if (baseDistance === 'short') {
        transportOptions.push({
            name: 'Ola/Uber (Sedan)',
            cost: Math.ceil(people / 4) * 180, // ₹180 per cab, 4 people per cab
            time: '25-40 min',
            icon: '🚗',
            note: people > 4 ? `(${Math.ceil(people / 4)} cabs needed)` : ''
        });
    } else if (baseDistance === 'medium') {
        transportOptions.push({
            name: 'Ola/Uber (Sedan)',
            cost: Math.ceil(people / 4) * 320, // ₹320 per cab
            time: '40-60 min',
            icon: '🚗',
            note: people > 4 ? `(${Math.ceil(people / 4)} cabs needed)` : ''
        });
    } else {
        transportOptions.push({
            name: 'Ola/Uber (Sedan)',
            cost: Math.ceil(people / 4) * 550, // ₹550 per cab
            time: '60-90 min',
            icon: '🚗',
            note: people > 4 ? `(${Math.ceil(people / 4)} cabs needed)` : ''
        });
    }
    
    // Namma Metro (Rapid Transit) - per person
    const metroAvailable = (fromZone === 'central' || toZone === 'central' || 
                           fromZone === 'south' || toZone === 'south' ||
                           fromZone === 'north' || toZone === 'north');
    
    if (metroAvailable) {
        let metroCost = 0;
        if (baseDistance === 'short') {
            metroCost = 20 * people; // ₹20 per person for short distance
        } else if (baseDistance === 'medium') {
            metroCost = 35 * people; // ₹35 per person for medium distance
        } else {
            metroCost = 50 * people; // ₹50 per person for long distance
        }
        
        transportOptions.push({
            name: 'Namma Metro (Rapid Transit)',
            cost: metroCost,
            time: '30-50 min',
            icon: '🚇',
            note: 'Fastest option'
        });
    }
    
    // Metro + Auto (if metro available)
    if (metroAvailable) {
        transportOptions.push({
            name: 'Metro + Auto',
            cost: (baseDistance === 'short' ? 20 : baseDistance === 'medium' ? 35 : 50) * people + Math.ceil(people / 3) * 60,
            time: '40-60 min',
            icon: '🚇🛺',
            note: 'Metro + last mile auto'
        });
    }
    
    // BMTC Bus (per person)
    transportOptions.push({
        name: 'BMTC Bus',
        cost: 25 * people, // ₹25 per person
        time: baseDistance === 'short' ? '45-60 min' : baseDistance === 'medium' ? '60-90 min' : '90-120 min',
        icon: '🚌',
        note: 'Most economical'
    });
    
    // Bike/Scooter (self-drive) - per person (fuel cost)
    transportOptions.push({
        name: 'Bike/Scooter (Self-drive)',
        cost: 40 * people, // ₹40 per person for fuel
        time: baseDistance === 'short' ? '30-45 min' : baseDistance === 'medium' ? '45-60 min' : '60-90 min',
        icon: '🏍️',
        note: 'If you have your own vehicle'
    });
    
    // Filter based on anxiety level and preferences (rule-based logic)
    let filteredOptions = [...transportOptions];
    
    // If high anxiety or first solo trip - avoid crowded public transport
    if (preferences.anxietyLevel === 'high') {
        filteredOptions = filteredOptions.filter(opt => 
            !opt.name.includes('Bus') && 
            !opt.name.includes('Metro')
        );
    } else if (preferences.anxietyLevel === 'medium') {
        // Medium anxiety - avoid buses but Metro is OK
        filteredOptions = filteredOptions.filter(opt => 
            !opt.name.includes('Bus')
        );
    }
    
    // If motion sickness - prefer smoother rides
    if (preferences.motionSickness === 'severe') {
        filteredOptions = filteredOptions.filter(opt => 
            !opt.name.includes('Bus') && 
            !opt.name.includes('Bike')
        );
        // Prioritize cabs and metro
        filteredOptions.sort((a, b) => {
            const aSmooth = a.name.includes('Ola') || a.name.includes('Uber') || a.name.includes('Metro') ? 0 : 1;
            const bSmooth = b.name.includes('Ola') || b.name.includes('Uber') || b.name.includes('Metro') ? 0 : 1;
            return aSmooth - bSmooth;
        });
    }
    
    // If high safety priority - prefer pre-booked cabs, avoid night travel
    if (preferences.safetyPriority === 'high') {
        filteredOptions = filteredOptions.filter(opt => 
            opt.name.includes('Ola') || 
            opt.name.includes('Uber') || 
            opt.name.includes('Auto') // Autos are generally safe during day
        );
    }
    
    // Sort by cost (cheapest first) after filtering
    filteredOptions.sort((a, b) => a.cost - b.cost);
    
    return filteredOptions.length > 0 ? filteredOptions : transportOptions; // Fallback to all options if filtered too much
}

// Nearby budget-friendly places
const nearbyPlaces = {
    'cubbon-park': [
        { name: 'Vidhana Soudha', cost: 0, time: 0.5, type: 'indoor' },
        { name: 'MG Road Shopping', cost: 0, time: 1, type: 'outdoor' },
        { name: 'High Court Building', cost: 0, time: 0.5, type: 'indoor' }
    ],
    'lalbagh': [
        { name: 'Big Bull Temple', cost: 0, time: 0.5, type: 'indoor' },
        { name: 'Jayanagar Shopping', cost: 0, time: 1, type: 'outdoor' },
        { name: 'Basavanagudi', cost: 0, time: 0.5, type: 'outdoor' }
    ],
    'bannerghatta': [
        { name: 'Butterfly Park', cost: 50, time: 1, type: 'outdoor' },
        { name: 'Bannerghatta Lake', cost: 0, time: 1, type: 'outdoor' }
    ],
    'nandi-hills': [
        { name: 'Tipu\'s Drop', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'Nandi Temple', cost: 0, time: 0.5, type: 'indoor' }
    ],
    'isckon': [
        { name: 'Lalbagh Garden', cost: 20, time: 1, type: 'outdoor' },
        { name: 'Big Bull Temple', cost: 0, time: 0.5, type: 'indoor' }
    ],
    'tipu-sultan': [
        { name: 'Cubbon Park', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'Vidhana Soudha', cost: 0, time: 0.5, type: 'indoor' }
    ],
    'bangalore-palace': [
        { name: 'Cubbon Park', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'MG Road', cost: 0, time: 0.5, type: 'outdoor' }
    ],
    'ulsoor-lake': [
        { name: 'MG Road', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'Indiranagar Shopping', cost: 0, time: 1, type: 'outdoor' }
    ],
    'mg-road': [
        { name: 'Cubbon Park', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'Commercial Street', cost: 0, time: 1, type: 'outdoor' }
    ],
    'national-gallery': [
        { name: 'Cubbon Park', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'Vidhana Soudha', cost: 0, time: 0.5, type: 'indoor' }
    ],
    'visvesvaraya-museum': [
        { name: 'Cubbon Park', cost: 0, time: 0.5, type: 'outdoor' },
        { name: 'Vidhana Soudha', cost: 0, time: 0.5, type: 'indoor' }
    ]
};

// Restaurant database by zone and category with famous dishes
const restaurantsData = {
    'central': {
        'fine-dining': [
            { name: 'Karavalli', cuisine: 'Coastal Indian', avgCost: 800, famousDish: 'Kerala Fish Curry & Appam' },
            { name: 'The Black Pearl', cuisine: 'Continental', avgCost: 1200, famousDish: 'Grilled Lamb Chops' },
            { name: 'Truffles', cuisine: 'Multi-cuisine', avgCost: 600, famousDish: 'Truffles Burger' },
            { name: 'Farzi Cafe', cuisine: 'Modern Indian', avgCost: 900, famousDish: 'Dal Chawal Arancini' }
        ],
        'casual': [
            { name: 'MTR', cuisine: 'South Indian', avgCost: 300, famousDish: 'Rava Idli & Filter Coffee' },
            { name: 'Vidyarthi Bhavan', cuisine: 'South Indian', avgCost: 250, famousDish: 'Masala Dosa' },
            { name: 'Koshy\'s', cuisine: 'Continental', avgCost: 400, famousDish: 'Chicken Steak & Chips' },
            { name: 'CTR (Central Tiffin Room)', cuisine: 'South Indian', avgCost: 200, famousDish: 'Benne Masala Dosa' }
        ],
        'budget': [
            { name: 'Brahmins Coffee Bar', cuisine: 'South Indian', avgCost: 100, famousDish: 'Khara Bath & Kesari Bath' },
            { name: 'SLV Coffee Bar', cuisine: 'South Indian', avgCost: 120, famousDish: 'Vada & Filter Coffee' },
            { name: 'New Shanti Sagar', cuisine: 'Vegetarian', avgCost: 150, famousDish: 'North Indian Thali' },
            { name: 'Adigas', cuisine: 'South Indian', avgCost: 180, famousDish: 'Set Dosa & Sambar' }
        ],
        'street': [
            { name: 'VV Puram Food Street', cuisine: 'Street Food', avgCost: 80, famousDish: 'Gobi Manchurian & Dahi Puri' },
            { name: 'Commercial Street Food Stalls', cuisine: 'Street Food', avgCost: 60, famousDish: 'Pav Bhaji & Chaat' },
            { name: 'MG Road Food Court', cuisine: 'Multi-cuisine', avgCost: 100, famousDish: 'Bhel Puri & Pani Puri' }
        ]
    },
    'south': {
        'fine-dining': [
            { name: 'The Ritz-Carlton', cuisine: 'Fine Dining', avgCost: 1500, famousDish: 'Tandoori Lobster & Biryani' },
            { name: 'Fava', cuisine: 'Mediterranean', avgCost: 1000, famousDish: 'Hummus & Lamb Kebabs' },
            { name: 'The Leela Palace', cuisine: 'Multi-cuisine', avgCost: 1200, famousDish: 'Dum Biryani & Kebabs' }
        ],
        'casual': [
            { name: 'Meghana Foods', cuisine: 'Andhra', avgCost: 350, famousDish: 'Andhra Chicken Biryani' },
            { name: 'Biryani Pot', cuisine: 'Hyderabadi', avgCost: 400, famousDish: 'Hyderabadi Dum Biryani' },
            { name: 'Nagarjuna', cuisine: 'Andhra', avgCost: 300, famousDish: 'Andhra Meals & Chicken Curry' },
            { name: 'A2B', cuisine: 'South Indian', avgCost: 250, famousDish: 'South Indian Thali' }
        ],
        'budget': [
            { name: 'Udupi Garden', cuisine: 'South Indian', avgCost: 150, famousDish: 'Udupi Thali' },
            { name: 'Hotel Dwaraka', cuisine: 'South Indian', avgCost: 180, famousDish: 'Masala Dosa & Idli' },
            { name: 'Sagar Ratna', cuisine: 'South Indian', avgCost: 200, famousDish: 'South Indian Breakfast Combo' }
        ],
        'street': [
            { name: 'Jayanagar 4th Block Food Street', cuisine: 'Street Food', avgCost: 70, famousDish: 'Gobi Manchurian & Momos' },
            { name: 'BTM Food Stalls', cuisine: 'Street Food', avgCost: 60, famousDish: 'Chaat & Pani Puri' },
            { name: 'Basavanagudi Food Street', cuisine: 'Street Food', avgCost: 80, famousDish: 'Dosa & Vada Pav' }
        ]
    },
    'north': {
        'fine-dining': [
            { name: 'The Gateway Hotel', cuisine: 'Multi-cuisine', avgCost: 1000, famousDish: 'Butter Chicken & Naan' },
            { name: 'The Chancery Pavilion', cuisine: 'Fine Dining', avgCost: 1200, famousDish: 'Tandoori Platter' }
        ],
        'casual': [
            { name: 'Malleshwaram Tiffin Room', cuisine: 'South Indian', avgCost: 250, famousDish: 'Bisi Bele Bath' },
            { name: 'Veena Stores', cuisine: 'South Indian', avgCost: 150, famousDish: 'Idli Vada & Coffee' },
            { name: 'SLV Idli', cuisine: 'South Indian', avgCost: 120, famousDish: 'Idli & Sambar' }
        ],
        'budget': [
            { name: 'Hotel Udupi Sri Krishna Bhavan', cuisine: 'South Indian', avgCost: 150, famousDish: 'Udupi Meals' },
            { name: 'Brahmins Coffee Bar', cuisine: 'South Indian', avgCost: 100, famousDish: 'Khara Bath & Kesari Bath' }
        ],
        'street': [
            { name: 'Malleshwaram Food Street', cuisine: 'Street Food', avgCost: 70, famousDish: 'Dahi Puri & Bhel Puri' },
            { name: 'Hebbal Food Stalls', cuisine: 'Street Food', avgCost: 60, famousDish: 'Pav Bhaji & Chaat' }
        ]
    },
    'east': {
        'fine-dining': [
            { name: 'The Oberoi', cuisine: 'Fine Dining', avgCost: 1500, famousDish: 'Tandoori Special & Biryani' },
            { name: 'ITC Gardenia', cuisine: 'Multi-cuisine', avgCost: 1200, famousDish: 'Dum Pukht Biryani' }
        ],
        'casual': [
            { name: 'Absolute Barbecues', cuisine: 'BBQ', avgCost: 600, famousDish: 'BBQ Platter & Grilled Meats' },
            { name: 'Barbeque Nation', cuisine: 'BBQ', avgCost: 650, famousDish: 'Live Grill & BBQ Buffet' },
            { name: 'Mainland China', cuisine: 'Chinese', avgCost: 500, famousDish: 'Hakka Noodles & Manchurian' }
        ],
        'budget': [
            { name: 'Cafe Coffee Day', cuisine: 'Cafe', avgCost: 200, famousDish: 'Cappuccino & Sandwiches' },
            { name: 'Domino\'s', cuisine: 'Pizza', avgCost: 250, famousDish: 'Margherita & Pepperoni Pizza' }
        ],
        'street': [
            { name: 'Whitefield Food Stalls', cuisine: 'Street Food', avgCost: 80, famousDish: 'Gobi Manchurian & Momos' },
            { name: 'Marathahalli Food Court', cuisine: 'Street Food', avgCost: 70, famousDish: 'Chaat & Pani Puri' }
        ]
    },
    'west': {
        'fine-dining': [
            { name: 'The Lalit', cuisine: 'Multi-cuisine', avgCost: 1000, famousDish: 'Tandoori Special & Biryani' }
        ],
        'casual': [
            { name: 'Rajdhani', cuisine: 'Gujarati Thali', avgCost: 400, famousDish: 'Gujarati Thali (Unlimited)' },
            { name: 'Sattvam', cuisine: 'Vegetarian', avgCost: 350, famousDish: 'Vegetarian Thali' }
        ],
        'budget': [
            { name: 'Udupi Upahar', cuisine: 'South Indian', avgCost: 180, famousDish: 'Udupi Meals & Dosa' }
        ],
        'street': [
            { name: 'Vijayanagar Food Street', cuisine: 'Street Food', avgCost: 70, famousDish: 'Dahi Puri & Bhel Puri' }
        ]
    }
};

function getRestaurantsByCategory(zone, category) {
    return restaurantsData[zone]?.[category] || restaurantsData['central'][category] || [];
}

