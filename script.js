// Multi-step form navigation
let currentStep = 1;
let planningMode = null; // 'mood' or 'destination'

// Initialize landing screen on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('landingScreen').classList.add('active');
});

function selectPlanningMode(mode) {
    planningMode = mode;
    document.getElementById('landingScreen').classList.remove('active');
    document.getElementById('mainHeader').classList.remove('hidden');
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('formStep1').classList.add('active');
    document.getElementById('step1').classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function nextStep(step) {
    // Validate current step before proceeding
    if (step === 2 && !document.getElementById('currentLocation').value) {
        alert('Please select your location');
        return;
    }
    if (step === 3 && !document.getElementById('destination').value) {
        alert('Please select a destination');
        return;
    }
    if (step === 4 && !document.getElementById('budget').value) {
        alert('Please enter your budget');
        return;
    }
    if (step === 5 && (!document.getElementById('people').value || document.getElementById('people').value < 1)) {
        alert('Please enter number of people');
        return;
    }
    if (step === 6 && !document.getElementById('tripHours').value) {
        alert('Please select trip duration');
        return;
    }
    
    // Hide current step
    document.getElementById(`formStep${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Show next step
    currentStep = step;
    document.getElementById(`formStep${currentStep}`).classList.add('active');
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`formStep${currentStep}`).classList.remove('active');
    document.getElementById(`step${currentStep}`).classList.remove('active');
    
    // Show previous step
    currentStep = step;
    document.getElementById(`formStep${currentStep}`).classList.add('active');
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function setBudget(amount) {
    document.getElementById('budget').value = amount;
}

function showForm() {
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('resultsContainer').style.display = 'none';
    // Reset form
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach(step => step.classList.remove('active'));
    document.getElementById('formStep1').classList.add('active');
    document.getElementById('step1').classList.add('active');
    document.getElementById('travelForm').reset();
}

function calculateTrip() {
    try {
        console.log('calculateTrip called');
        
        // Get all form values
        const currentLocationEl = document.getElementById('currentLocation');
        const destinationEl = document.getElementById('destination');
        const budgetEl = document.getElementById('budget');
        const peopleEl = document.getElementById('people');
        const tripHoursEl = document.getElementById('tripHours');
        const preferenceEl = document.querySelector('input[name="preference"]:checked');
        
        if (!currentLocationEl || !destinationEl || !budgetEl || !peopleEl || !tripHoursEl || !preferenceEl) {
            alert('Error: Some form fields are missing. Please refresh the page.');
            console.error('Missing form elements:', { currentLocationEl, destinationEl, budgetEl, peopleEl, tripHoursEl, preferenceEl });
            return;
        }
        
        const currentLocation = currentLocationEl.value;
        const destination = destinationEl.value;
        const budget = parseInt(budgetEl.value);
        const preference = preferenceEl.value;
        const people = parseInt(peopleEl.value);
        const tripHours = parseInt(tripHoursEl.value);
        
        // Get health, safety, and travel preferences
        const anxietyLevel = document.getElementById('anxietyLevel')?.value || 'none';
        const motionSickness = document.querySelector('input[name="motionSickness"]:checked')?.value || 'none';
        const foodSensitivity = document.querySelector('input[name="foodSensitivity"]:checked')?.value || 'none';
        const safetyPriority = document.querySelector('input[name="safetyPriority"]:checked')?.value || 'standard';
        const noCrowds = document.getElementById('noCrowds')?.checked || false;
        const noParty = document.getElementById('noParty')?.checked || false;
        const slowPace = document.getElementById('slowPace')?.checked || false;
        const natureOnly = document.getElementById('natureOnly')?.checked || false;
        const trekPreference = document.querySelector('input[name="trekPreference"]:checked')?.value || 'include';
        
        const travelPreferences = {
            anxietyLevel,
            motionSickness,
            foodSensitivity,
            safetyPriority,
            noCrowds,
            noParty,
            slowPace,
            natureOnly,
            trekPreference,
            emotionalState
        };
        
        console.log('Form values:', { currentLocation, destination, budget, preference, people, tripHours, travelPreferences });
        
        if (!currentLocation || !destination || !budget || budget <= 0 || !tripHours || !people || people <= 0) {
            alert('Please fill all required fields correctly:\n- Select your location\n- Select destination\n- Enter budget\n- Enter number of people\n- Select trip duration');
            return;
        }
        
        // Get emotional state (optional, defaults to neutral)
        const emotionalState = document.getElementById('emotionalState')?.value || 'neutral';
        
        // Get destination data
        let destData = placesData[destination];
        if (!destData) {
            alert('Invalid destination selected.');
            return;
        }
        
        // Check if destination matches emotional state, suggest alternative if not
        if (emotionalState && emotionalState !== 'neutral' && destData.emotionalTags) {
            if (!destData.emotionalTags.includes(emotionalState)) {
                // Find alternative destinations that match emotional state
                const matchingDestinations = Object.keys(placesData).filter(key => {
                    const place = placesData[key];
                    return place.emotionalTags && place.emotionalTags.includes(emotionalState);
                });
                
                if (matchingDestinations.length > 0) {
                    const altKey = matchingDestinations[0];
                    const altPlace = placesData[altKey];
                    const emotionText = {
                        'romantic': 'a romantic date',
                        'alone': 'alone time',
                        'sad': 'when feeling sad',
                        'happy': 'feeling happy',
                        'angry': 'when you need to calm down'
                    }[emotionalState] || 'your mood';
                    
                    if (confirm(`"${destData.name}" might not be ideal for your current mood. Would you like to visit "${altPlace.name}" instead? It's perfect for ${emotionText}!`)) {
                        destination = altKey;
                        destData = altPlace;
                        document.getElementById('destination').value = altKey;
                    }
                }
            }
        }
    
    // Filter places based on trip hours
    const filteredNearbyPlaces = filterPlacesByTime(nearbyPlaces[destination] || [], tripHours);
    
    // Get transport options filtered by preferences
    const transportOptions = getTransportOptions(currentLocation, destination, people, travelPreferences);
    
    // Calculate costs
    const entryFee = destData.entryFee * people;
    // Allocate 25-30% of budget for food, with reasonable limits
    const foodCost = Math.min(budget * 0.3, Math.max(budget * 0.25, 100 * people));
    const remainingBudget = budget - entryFee - foodCost;
    
    // Select best transport option - always choose the cheapest (best budget option)
    // Sort by cost to get cheapest first
    transportOptions.sort((a, b) => a.cost - b.cost);
    const selectedTransport = transportOptions[0]; // Cheapest option
    
    const transportCost = selectedTransport.cost;
    const totalCost = entryFee + transportCost + foodCost;
    const remainingAfterMain = budget - totalCost;
    
    // Find nearby places that fit the remaining budget, trip hours, and preferences
    const suggestedPlaces = [];
    let additionalCost = 0;
    let totalTimeUsed = destData.avgTime;
    
    for (const place of filteredNearbyPlaces) {
        // Skip if doesn't match preference
        if (preference !== 'both' && place.type !== preference) continue;
        
        // Filter by emotional state - get place data to check emotional tags
        if (travelPreferences.emotionalState && travelPreferences.emotionalState !== 'neutral') {
            const placeKey = Object.keys(placesData).find(key => placesData[key].name === place.name);
            if (placeKey) {
                const placeData = placesData[placeKey];
                if (placeData.emotionalTags && !placeData.emotionalTags.includes(travelPreferences.emotionalState)) {
                    continue; // Skip places that don't match emotional state
                }
            } else {
                // If place not in main data, check by name patterns
                const placeNameLower = place.name.toLowerCase();
                if (travelPreferences.emotionalState === 'romantic' && 
                    (placeNameLower.includes('shopping') || placeNameLower.includes('commercial'))) {
                    continue; // Skip shopping areas for romantic
                }
                if (travelPreferences.emotionalState === 'sad' && 
                    (placeNameLower.includes('party') || placeNameLower.includes('entertainment'))) {
                    continue; // Skip party areas when sad
                }
                if (travelPreferences.emotionalState === 'angry' && 
                    (placeNameLower.includes('shopping') || placeNameLower.includes('crowded'))) {
                    continue; // Skip crowded places when angry
                }
            }
        }
        
        // Skip trekking places if excluded
        if (travelPreferences.trekPreference === 'exclude' && 
            (place.name.toLowerCase().includes('trek') || 
             place.name.toLowerCase().includes('hiking') ||
             place.name.toLowerCase().includes('hill'))) continue;
        
        // Skip if silent travel mode - no crowds
        if (travelPreferences.noCrowds && 
            (place.name.toLowerCase().includes('shopping') ||
             place.name.toLowerCase().includes('commercial') ||
             place.name.toLowerCase().includes('market'))) continue;
        
        // Skip party/entertainment areas if no party mode
        if (travelPreferences.noParty && 
            (place.name.toLowerCase().includes('entertainment') ||
             place.name.toLowerCase().includes('party'))) continue;
        
        // Nature only mode - only include nature places
        if (travelPreferences.natureOnly && 
            !(place.name.toLowerCase().includes('park') ||
              place.name.toLowerCase().includes('lake') ||
              place.name.toLowerCase().includes('garden') ||
              place.name.toLowerCase().includes('hill') ||
              place.type === 'outdoor')) continue;
        
        if (totalTimeUsed + place.time <= tripHours) {
            const placeCost = place.cost * people;
            if (additionalCost + placeCost <= remainingAfterMain * 0.8) {
                suggestedPlaces.push(place);
                additionalCost += placeCost;
                totalTimeUsed += place.time;
                
                // If slow pace, limit to fewer places
                if (travelPreferences.slowPace && suggestedPlaces.length >= 2) break;
            }
        }
    }
    
    // Get restaurant recommendations based on budget and food sensitivity
    const restaurantBudget = remainingAfterMain - additionalCost;
    const restaurants = getRestaurantRecommendations(destination, restaurantBudget, people, travelPreferences);
    
    // Display results
    displayResults({
        currentLocation: locationData[currentLocation].name,
        destination: destData.name,
        destinationData: destData,
        budget,
        people,
        tripHours,
        entryFee,
        transportCost,
        selectedTransport,
        transportOptions,
        foodCost,
        totalCost,
        remainingAfterMain,
        suggestedPlaces,
        additionalCost,
        restaurants,
        preference,
        totalTimeUsed,
        travelPreferences
    });
    } catch (error) {
        console.error('Error calculating trip:', error);
        alert('An error occurred while calculating your trip. Please try again.');
    }
}

function filterPlacesByTime(places, maxHours) {
    return places.filter(place => place.time <= maxHours);
}

function getRestaurantRecommendations(destination, budget, people) {
    const destinationZone = destinationZones[destination] || 'central';
    const perPersonBudget = budget / people;
    
    const restaurants = [];
    
    // Fine dining (₹500+ per person)
    if (perPersonBudget >= 500) {
        restaurants.push({
            name: 'Fine Dining Restaurants',
            examples: getRestaurantsByCategory(destinationZone, 'fine-dining'),
            cost: 500 * people,
            category: 'fine-dining',
            description: 'Upscale restaurants with excellent ambiance'
        });
    }
    
    // Casual dining (₹300-500 per person)
    if (perPersonBudget >= 300) {
        restaurants.push({
            name: 'Casual Dining Restaurants',
            examples: getRestaurantsByCategory(destinationZone, 'casual'),
            cost: 350 * people,
            category: 'casual',
            description: 'Comfortable restaurants with good food'
        });
    }
    
    // Budget-friendly (₹150-300 per person)
    if (perPersonBudget >= 150) {
        restaurants.push({
            name: 'Budget-Friendly Restaurants',
            examples: getRestaurantsByCategory(destinationZone, 'budget'),
            cost: 200 * people,
            category: 'budget',
            description: 'Affordable local eateries and cafes'
        });
    }
    
    // Street food (₹50-150 per person)
    if (perPersonBudget >= 50) {
        restaurants.push({
            name: 'Street Food & Local Eateries',
            examples: getRestaurantsByCategory(destinationZone, 'street'),
            cost: 100 * people,
            category: 'street',
            description: 'Delicious local street food and quick bites'
        });
    }
    
    return restaurants;
}

function displayResults(data) {
    try {
        const resultsContent = document.getElementById('resultsContent');
        if (!resultsContent) {
            console.error('Results container not found');
            return;
        }
        
        // Calculate best budget restaurant before template
        let bestRestaurantText = '';
        if (data.restaurants && data.restaurants.length > 0) {
            const sortedRestaurants = [...data.restaurants].sort((a, b) => a.cost - b.cost);
            const bestRestaurant = sortedRestaurants[0];
            bestRestaurantText = `
                    <div class="tip-item">
                        <strong>🍽️ Best Budget Restaurant:</strong> ${bestRestaurant.name} - ₹${bestRestaurant.cost.toLocaleString()} for ${data.people} ${data.people === 1 ? 'person' : 'people'}
                    </div>
            `;
        }
        
        // Calculate transport savings
        let transportSavingsText = '';
        if (data.transportOptions && data.transportOptions.length > 1) {
            const maxCost = Math.max(...data.transportOptions.map(t => t.cost));
            const savings = maxCost - data.transportCost;
            transportSavingsText = ` (saves you ₹${savings.toLocaleString()} compared to most expensive option)`;
        }
        
        let html = `
        <div class="results-header">
            <h2>Your TravelWise Itinerary</h2>
            <p>From ${data.currentLocation} to ${data.destination}</p>
            <div class="trip-info">
                <span>⏰ ${data.tripHours} Hours</span>
                <span>👥 ${data.people} ${data.people === 1 ? 'Person' : 'People'}</span>
                ${data.travelPreferences && data.travelPreferences.emotionalState && data.travelPreferences.emotionalState !== 'neutral' ? `
                <span class="emotional-badge emotional-${data.travelPreferences.emotionalState}">
                    ${data.travelPreferences.emotionalState === 'romantic' ? '💕 Romantic Date' : 
                      data.travelPreferences.emotionalState === 'alone' ? '🌙 Alone Time' : 
                      data.travelPreferences.emotionalState === 'sad' ? '😢 Healing Journey' : 
                      data.travelPreferences.emotionalState === 'happy' ? '😊 Happy Vibes' : 
                      data.travelPreferences.emotionalState === 'angry' ? '😠 Calming Space' : ''}
                </span>
                ` : ''}
            </div>
        </div>
        
        <div class="budget-summary">
            <div class="budget-item">
                <div class="budget-item-label">Total Budget</div>
                <div class="budget-item-value">₹${data.budget.toLocaleString()}</div>
            </div>
            <div class="budget-item">
                <div class="budget-item-label">Total Cost</div>
                <div class="budget-item-value">₹${(data.totalCost + data.additionalCost).toLocaleString()}</div>
            </div>
            <div class="budget-item">
                <div class="budget-item-label">Remaining</div>
                <div class="budget-item-value">₹${(data.budget - data.totalCost - data.additionalCost).toLocaleString()}</div>
            </div>
        </div>
        
        <div class="budget-breakdown">
            <h3>💰 Budget Breakdown</h3>
            <div class="breakdown-item">
                <span>Entry Fees</span>
                <span>₹${data.entryFee.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span>Transportation (Best Budget: ${data.selectedTransport.name})</span>
                <span>₹${data.transportCost.toLocaleString()}</span>
            </div>
            <div class="breakdown-item">
                <span>Food & Dining</span>
                <span>₹${data.foodCost.toLocaleString()}</span>
            </div>
            ${data.additionalCost > 0 ? `
            <div class="breakdown-item">
                <span>Additional Places (${data.suggestedPlaces.length} places)</span>
                <span>₹${data.additionalCost.toLocaleString()}</span>
            </div>
            ` : ''}
            <div class="breakdown-item total">
                <span>Total</span>
                <span>₹${(data.totalCost + data.additionalCost).toLocaleString()}</span>
            </div>
        </div>
        
        <div class="best-budget-summary">
            <h3>💡 Best Budget Recommendations</h3>
            <div class="budget-tips">
                <div class="tip-item">
                    <strong>🚗 Best Transport:</strong> ${data.selectedTransport.name} - Only ₹${data.transportCost.toLocaleString()}${transportSavingsText}
                </div>
                ${bestRestaurantText}
                ${data.suggestedPlaces && data.suggestedPlaces.length > 0 ? `
                <div class="tip-item">
                    <strong>📍 Additional Places:</strong> Visit ${data.suggestedPlaces.length} nearby places for just ₹${data.additionalCost.toLocaleString()}
                </div>
                ` : ''}
            </div>
        </div>
        
        ${data.travelPreferences ? `
        <div class="preferences-applied">
            <h3>🎯 Your Preferences Applied</h3>
            <div class="preferences-list">
                ${data.travelPreferences.anxietyLevel !== 'none' ? `
                <div class="preference-item">
                    <span class="pref-icon">😌</span>
                    <div>
                        <strong>Anxiety Level:</strong> ${data.travelPreferences.anxietyLevel === 'high' ? 'High - Avoiding crowded transport' : data.travelPreferences.anxietyLevel === 'medium' ? 'Moderate - Preferring direct routes' : 'Low'}
                    </div>
                </div>
                ` : ''}
                ${data.travelPreferences.motionSickness !== 'none' ? `
                <div class="preference-item">
                    <span class="pref-icon">🚗</span>
                    <div>
                        <strong>Motion Sickness:</strong> ${data.travelPreferences.motionSickness === 'severe' ? 'Severe - Only smooth rides selected' : 'Mild - Avoiding bumpy routes'}
                    </div>
                </div>
                ` : ''}
                ${data.travelPreferences.foodSensitivity !== 'none' ? `
                <div class="preference-item">
                    <span class="pref-icon">🍽️</span>
                    <div>
                        <strong>Food Sensitivity:</strong> ${data.travelPreferences.foodSensitivity === 'sensitive' ? 'Sensitive - Light, easy-to-digest food only' : 'Light food preferred - Avoiding street food'}
                    </div>
                </div>
                ` : ''}
                ${data.travelPreferences.safetyPriority === 'high' ? `
                <div class="preference-item">
                    <span class="pref-icon">👩</span>
                    <div>
                        <strong>Safety Priority:</strong> High - Pre-booked cabs preferred, avoiding late-night travel
                    </div>
                </div>
                ` : ''}
                ${data.travelPreferences.noCrowds || data.travelPreferences.noParty || data.travelPreferences.slowPace || data.travelPreferences.natureOnly ? `
                <div class="preference-item">
                    <span class="pref-icon">🌿</span>
                    <div>
                        <strong>Silent Travel Mode:</strong> 
                        ${data.travelPreferences.noCrowds ? 'No crowds • ' : ''}
                        ${data.travelPreferences.noParty ? 'No party areas • ' : ''}
                        ${data.travelPreferences.slowPace ? 'Slow pace • ' : ''}
                        ${data.travelPreferences.natureOnly ? 'Nature only' : ''}
                    </div>
                </div>
                ` : ''}
                ${data.travelPreferences.trekPreference === 'exclude' ? `
                <div class="preference-item">
                    <span class="pref-icon">⛰️</span>
                    <div>
                        <strong>Trekking:</strong> Excluded from itinerary
                    </div>
                </div>
                ` : ''}
                ${data.travelPreferences.emotionalState && data.travelPreferences.emotionalState !== 'neutral' ? `
                <div class="preference-item">
                    <span class="pref-icon">💝</span>
                    <div>
                        <strong>Emotional State:</strong> 
                        ${data.travelPreferences.emotionalState === 'romantic' ? '💕 Romantic Date - Places perfect for couples' : 
                          data.travelPreferences.emotionalState === 'alone' ? '🌙 Alone Time - Peaceful solo journey spots' : 
                          data.travelPreferences.emotionalState === 'sad' ? '😢 Healing Journey - Comforting & peaceful places' : 
                          data.travelPreferences.emotionalState === 'happy' ? '😊 Happy Vibes - Fun & exciting places' : 
                          data.travelPreferences.emotionalState === 'angry' ? '😠 Calming Space - Peaceful spots to vent & relax' : ''}
                    </div>
                </div>
                ` : ''}
            </div>
            <div class="info-box" style="margin-top: 15px;">
                <p><strong>💡 Our Approach:</strong> We use rule-based logic inspired by behavioral and travel psychology, not black-box AI. Your preferences directly shape your itinerary.</p>
            </div>
        </div>
        ` : ''}
        
        <div class="itinerary">
            <div class="itinerary-item">
                <div class="itinerary-item-header">
                    <span>🎯</span>
                    <h3>Main Destination: ${data.destination}</h3>
                </div>
                <p class="description">${data.destinationData.description}</p>
                <div class="itinerary-details">
                    <div class="detail-item">
                        <div class="detail-label">Entry Fee (per person)</div>
                        <div class="detail-value">₹${data.destinationData.entryFee}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Total Entry Fee</div>
                        <div class="detail-value">₹${data.entryFee}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Time Required</div>
                        <div class="detail-value">${data.destinationData.avgTime} hours</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">${data.destinationData.type === 'outdoor' ? '🌳 Outdoor' : data.destinationData.type === 'indoor' ? '🏛️ Indoor' : '🌍 Both'}</div>
                    </div>
                </div>
                <div class="activities">
                    <strong>Activities:</strong> ${data.destinationData.activities.join(', ')}
                </div>
            </div>
    `;
    
    // Transport section
    html += `
            <div class="itinerary-item">
                <div class="itinerary-item-header">
                    <span>🚗</span>
                    <h3>Transportation Options</h3>
                </div>
                <div class="transport-options">
                    <div class="recommended-transport">
                        <div class="recommended-badge">💰 Best Budget Option</div>
                        <div class="transport-option featured">
                            <div>
                                <div class="transport-option-name">${data.selectedTransport.icon} ${data.selectedTransport.name}</div>
                                <div class="transport-option-time">Time: ${data.selectedTransport.time} ${data.selectedTransport.note ? '• ' + data.selectedTransport.note : ''}</div>
                            </div>
                            <div class="transport-option-cost">₹${data.transportCost.toLocaleString()}</div>
                        </div>
                    </div>
                    <h4>All Available Options (Sorted by Cost):</h4>
    `;
    
    data.transportOptions.forEach((option, index) => {
        if (option.name !== data.selectedTransport.name) {
            html += `
                <div class="transport-option">
                    <div>
                        <div class="transport-option-name">${option.icon} ${option.name}</div>
                        <div class="transport-option-time">Time: ${option.time} ${option.note ? '• ' + option.note : ''}</div>
                    </div>
                    <div class="transport-option-cost">₹${option.cost.toLocaleString()}</div>
                </div>
            `;
        }
    });
    
    html += `</div></div>`;
    
    // Nearby places
    if (data.suggestedPlaces.length > 0) {
        html += `
            <div class="itinerary-item">
                <div class="itinerary-item-header">
                    <span>📍</span>
                    <h3>Additional Places to Visit</h3>
                </div>
                <p class="description">Make the most of your ${data.tripHours}-hour trip with these nearby attractions:</p>
        `;
        
        data.suggestedPlaces.forEach((place, index) => {
            html += `
                <div class="place-option">
                    <div>
                        <div class="place-name">${index + 1}. ${place.name}</div>
                        <div class="place-info">
                            ${place.type === 'outdoor' ? '🌳 Outdoor' : '🏛️ Indoor'} • Time: ${place.time} hours
                        </div>
                    </div>
                    <div class="place-cost">₹${(place.cost * data.people).toLocaleString()} ${data.people > 1 ? `(${data.people} people)` : ''}</div>
                </div>
            `;
        });
        
        html += `
                <div class="additional-cost">
                    <strong>Total Additional Cost for All Places:</strong> ₹${data.additionalCost.toLocaleString()}
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="itinerary-item">
                <div class="itinerary-item-header">
                    <span>📍</span>
                    <h3>Additional Places to Visit</h3>
                </div>
                <p class="description">No additional places suggested within your remaining budget and time. Focus on enjoying your main destination!</p>
            </div>
        `;
    }
    
    // Restaurants section
    if (data.restaurants.length > 0) {
        html += `
            <div class="itinerary-item">
                <div class="itinerary-item-header">
                    <span>🍽️</span>
                    <h3>Restaurant Recommendations</h3>
                </div>
                <p class="description">Best restaurants near your destination within your budget (sorted from budget-friendly to premium):</p>
        `;
        
        // Sort restaurants by cost (cheapest first)
        const sortedRestaurants = [...data.restaurants].sort((a, b) => a.cost - b.cost);
        
        sortedRestaurants.forEach((restaurant, index) => {
            const isBestBudget = index === 0;
            html += `
                <div class="restaurant-card ${isBestBudget ? 'best-budget' : ''}">
                    ${isBestBudget ? '<div class="best-budget-badge">💰 Best Budget Option</div>' : ''}
                    <div class="restaurant-header">
                        <h4>${restaurant.name}</h4>
                        <span class="restaurant-cost">₹${restaurant.cost.toLocaleString()} ${data.people > 1 ? `(${data.people} people)` : ''}</span>
                    </div>
                    <p class="restaurant-description">${restaurant.description}</p>
                    <div class="restaurant-examples">
                        <strong>📍 Recommended Restaurants:</strong>
                        <div class="restaurant-list">
                            ${restaurant.examples.map(r => `
                                <div class="restaurant-item">
                                    <div class="restaurant-item-header">
                                        <strong class="restaurant-name">${r.name}</strong>
                                        <span class="restaurant-cuisine">${r.cuisine}</span>
                                    </div>
                                    <div class="famous-dish">
                                        <span class="dish-icon">🍽️</span>
                                        <span class="dish-label">Famous Dish:</span>
                                        <strong class="dish-name">${r.famousDish || 'Signature Special'}</strong>
                                    </div>
                                    <div class="restaurant-price">₹${r.avgCost} per person</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    // Total cost summary
    const finalTotal = data.totalCost + data.additionalCost;
    html += `
            <div class="total-cost">
                <div class="total-cost-label">Total Trip Cost</div>
                <div class="total-cost-value">₹${finalTotal.toLocaleString()}</div>
            </div>
    `;
    
    if (data.budget - finalTotal > 0) {
        html += `
            <div class="savings">
                💰 You'll save ₹${(data.budget - finalTotal).toLocaleString()} from your budget!
            </div>
        `;
    }
    
    html += `</div>`;
    
        resultsContent.innerHTML = html;
        
        // Show results, hide form
        const formContainer = document.getElementById('formContainer');
        const resultsContainer = document.getElementById('resultsContainer');
        
        if (formContainer && resultsContainer) {
            formContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            console.error('Form or results container not found');
        }
    } catch (error) {
        console.error('Error displaying results:', error);
        alert('An error occurred while displaying results. Please try again.');
    }
}

// Form submission handler - multiple approaches to ensure it works
function attachFormHandlers() {
    const form = document.getElementById('travelForm');
    const submitButton = document.querySelector('.btn-primary[type="button"]');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted via submit event');
            calculateTrip();
        });
    }
    
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Form submitted via button click');
            calculateTrip();
        });
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachFormHandlers);
} else {
    // DOM is already loaded
    attachFormHandlers();
}
