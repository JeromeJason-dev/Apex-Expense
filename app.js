import { Tracker } from './Tracker.js';

// --- DOM INTERACTION LOGIC ---
// Only runs if executed inside a real browser environment (prevents failure during Node/Jest execution)
if (typeof document !== 'undefined' && document.getElementById('expense-form')) {
    const tracker = new Tracker();

    const form = document.getElementById('expense-form');
    const descInput = document.getElementById('desc-input');
    const amountInput = document.getElementById('amount-input');
    const categoryInput = document.getElementById('category-input');
    const filterSelect = document.getElementById('filter-category');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');
    const emptyState = document.getElementById('empty-state');
    const clearBtn = document.getElementById('clear-btn');

    const render = () => {
        const displayedExpenses = tracker.getFilteredExpenses();
        expenseList.innerHTML = '';

        if (displayedExpenses.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
            
            // Render list using array mapping/looping and object destructuring
            displayedExpenses.forEach(expense => {
                const { id, description, amount, category } = expense; // Destructuring
                
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50 transition';
                tr.innerHTML = `
                    <td class="px-4 py-3 font-medium text-gray-800">${description}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">${category}</span>
                    </td>
                    <td class="px-4 py-3 font-semibold text-gray-900">$${amount.toFixed(2)}</td>
                    <td class="px-4 py-3 text-right">
                        <button data-id="${id}" class="delete-btn text-red-500 hover:text-red-700 font-medium text-sm transition">
                            Delete
                        </button>
                    </td>
                `;
                expenseList.appendChild(tr);
            });
        }

        // Display updated total
        const total = tracker.calculateTotal(displayedExpenses);
        totalAmountDisplay.textContent = `${total.toFixed(2)}`;
    };

    // Form Event Handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        tracker.addExpense(descInput.value, amountInput.value, categoryInput.value);
        form.reset();
        render();
    });

    // Delete Event Handler (Event Delegation)
    expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            tracker.removeExpense(id);
            render();
        }
    });

    // Filter Change Event Handler
    filterSelect.addEventListener('change', (e) => {
        tracker.currentFilter = e.target.value;
        render();
    });

    clearBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all expenses?')) {
        tracker.clearAll();
        render();
        }
    });

    // Initial load view
    render();
}