export interface Reservation {
  carId: number;
  withDriver: boolean;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  paymentMethod: 'wave';
  downPayment: number; // percentage (10 or 30)
  totalPrice: number;
  startDateDisplay: string;
  endDateDisplay: string;
}

export interface ReservationOption {
  id: string;
  label: string;
  price: number;
  icon?: string;
}
