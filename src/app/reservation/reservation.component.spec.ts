import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReservationComponent } from './reservation.component';

describe('ReservationComponent', () => {
  let component: ReservationComponent;
  let fixture: ComponentFixture<ReservationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationComponent],
      imports: [
        IonicModule.forRoot(),
        FormsModule, // Nécessaire pour ngModel
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.car).toBeDefined();
    expect(component.car?.name).toBe('Corolla');
    expect(component.car?.price).toBe(20000);
    expect(component.reservation.withDriver).toBeFalse();
    expect(component.reservation.totalPrice).toBe(20000);
  });

  it('should update totalPrice when driver option changes', () => {
    // Simuler le changement d'option de chauffeur
    component.reservation.withDriver = true;
    component.onDriverOptionChange();
    expect(component.reservation.totalPrice).toBe(30000);

    // Revenir à l'option sans chauffeur
    component.reservation.withDriver = false;
    component.onDriverOptionChange();
    expect(component.reservation.totalPrice).toBe(20000);
  });

  it('should calculate duration correctly', () => {
    // Définir des dates de début et de fin
    const startDate = new Date('2025-09-23');
    const endDate = new Date('2025-09-25');
    component.reservation.startDate = startDate;
    component.reservation.endDate = endDate;

    // Vérifier que la durée est de 2 jours
    const duration = component.getDuration();
    expect(duration).toBe(2);
  });

  it('should return today\'s date as min date for start date', () => {
    const today = new Date().toISOString().split('T')[0];
    const minDate = component.getTodayDate().split('T')[0];
    expect(minDate).toBe(today);
  });
});
