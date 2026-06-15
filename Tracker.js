export class Expense {
    constructor(description, amount, category) {
        this.id = Date.now().toString() + Math.random().toString(36).slice(2, 5);
        this.description = description;
        this.amount = parseFloat(amount);
        this.category = category;
        this.date = new Date().toLocaleDateString();
    }
}

export class Tracker {
    constructor() {
        // LocalStorage initialization using the Nullish Coalescing operator
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.currentFilter = 'All';
    }

    // Add Expense using the Spread Operator
    addExpense(description, amount, category) {
        const newExpense = new Expense(description, amount, category);
        this.expenses = [...this.expenses, newExpense];
        this.saveToLocalStorage();
        return newExpense;
    }

    // Remove Expense using Functional Filtering
    removeExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.saveToLocalStorage();
    }

    // Calculate Total Expenses using Functional Programming (Reduce)
    calculateTotal(filteredExpenses = this.expenses) {
        return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    // Filter Expenses
    getFilteredExpenses() {
        if (this.currentFilter === 'All') {
            return this.expenses;
        }
        return this.expenses.filter(expense => expense.category === this.currentFilter);
    }

    // Persist Data
    saveToLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    clearAll() {
        this.expenses = [];
        this.saveToLocalStorage();
    }
}
