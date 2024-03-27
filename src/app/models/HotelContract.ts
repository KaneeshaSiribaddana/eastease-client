import {IHotel} from './Hotel';

export interface HotelContract {
    id: number;
    startDate: string; 
    endDate: string; 
    status: boolean;
    discounts?: Discount[];
    hotel?: IHotel;
    supplements?: Supplement[];
    seasons?: Season[];
    roomTypes?: RoomType[];
  }
  
  // discount.model.ts
  export interface Discount {
    id: number;
    name: string;
    description: string;
    percentage: number;
    startDate: string; 
    endDate: string;
  }
  
  // room-type.model.ts
  export interface RoomType {
    id: number;
    name: string;
    description: string;
    numberOfRooms: number;
    occupancy: number;
  }
  
  // supplement.model.ts
  export interface Supplement {
    id: number;
    name: string;
    description: string;
    status: boolean;
    contracts?: HotelContract[];
  }
  
  // season-supplement.model.ts
  export interface SeasonSupplement {
    id: number;
    season: Season;
    supplement: Supplement;
    price: number;
  }

  export interface Season {
    id?: number; 
    name: string;
    startDate: string;
    endDate: string; 
    markup: number;
  }
  