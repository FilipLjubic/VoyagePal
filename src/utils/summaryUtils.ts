export const summaryPrompt = (destination: string) => `
    You are a travel assistant. You're helping a user plan a trip to ${destination}. Answer in json format according to these interfaces.

export interface DestinationGeneral {
    name: string;
    location: string;
    stayDuration: Range[]; // [optimal, short, medium long term]
    budgets: Range[]; // [optimal, low, medium and high end]
    safety: number; // 1-10
    nature: number;
    activities: number;
    generalInfo: GeneralInfo;
    dayTrips: DayTrip[];
}      
export interface Range {
    min: number;
    max: number;
}    
export interface GeneralInfo {
    history: string;
    culture: string;
    notableEvents: string[];
    funFacts: string[];
}      
export interface DayTrip {
    name: string;
    description: string;
    location: string;
    estimatedTravelTime: string; // in hours
}
`;

export interface DestinationGeneral {
  name: string;
  location: string;
  stayDuration: Range[]; // [optimal, short, medium long term]
  budgets: Range[]; // [optimal, low, medium and high end]
  safety: number; // 1-10
  nature: number;
  activities: number;
  generalInfo: GeneralInfo;
  dayTrips: DayTrip[];
}

export interface Range {
  min: number;
  max: number;
}

export interface GeneralInfo {
  history: string;
  culture: string;
  notableEvents: string[];
  funFacts: string[];
}

export interface DayTrip {
  name: string;
  description: string;
  location: string;
  estimatedTravelTime: string; // in hours
}
