import { Tracker } from './Tracker.js';
import { Expense } from './Tracker.js';

describe('Tracker Class Unit Tests', () => {
    let tracker;

    beforeEach(() => {
        // This will now call our mock cleanly without failing!
        localStorage.clear();
        tracker = new Tracker();
    });

    test('should add an expense cleanly and update state array', () => {
        const item = tracker.addExpense('Coffee', '4.50', 'Food');
        
        expect(tracker.expenses.length).toBe(1);
        expect(tracker.expenses[0].description).toBe('Coffee');
        expect(tracker.expenses[0].amount).toBe(4.5);
        expect(tracker.expenses[0].category).toBe('Food');
        expect(item).toHaveProperty('id');
    });

    test('should correctly sum all structured values using reduce', () => {
        tracker.addExpense('Lunch', '15.00', 'Food');
        tracker.addExpense('Gas', '30.00', 'Transport');
        tracker.addExpense('Movie', '12.50', 'Entertainment');

        const total = tracker.calculateTotal();
        expect(total).toBe(57.50);
    });

    test('should slice items out dynamically by ID matching references', () => {
        const item1 = tracker.addExpense('Book', '20.00', 'Other');
        const item2 = tracker.addExpense('Subway', '5.00', 'Transport');

        tracker.removeExpense(item1.id);

        expect(tracker.expenses.length).toBe(1);
        expect(tracker.expenses[0].id).toBe(item2.id);
    });

    test('should properly filter entries without destructive structural mutation', () => {
        tracker.addExpense('Burger', '10.00', 'Food');
        tracker.addExpense('Bus fare', '2.50', 'Transport');
        
        tracker.currentFilter = 'Food';
        const targetedArray = tracker.getFilteredExpenses();

        expect(targetedArray.length).toBe(1);
        expect(targetedArray[0].description).toBe('Burger');
    });

    test('should preserve historical state values accurately in window.localStorage storage layers', () => {
        tracker.addExpense('Gym Membership', '50.00', 'Other');
        
        // Create an entirely new tracker instance to simulate a page refresh
        const persistentTracker = new Tracker();
        expect(persistentTracker.expenses.length).toBe(1);
        expect(persistentTracker.expenses[0].description).toBe('Gym Membership');
    });
});