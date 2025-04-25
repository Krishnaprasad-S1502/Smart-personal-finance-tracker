// Smart Personal Finance Tracker - JavaScript Logic

let transactions = [];

function addTransaction() {
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
  };

  transactions.push(transaction);
  updateUI();
  clearForm();
}

function updateUI() {
  const transactionList = document.getElementById("transaction-list");
  const totalIncomeEl = document.getElementById("total-income");
  const totalExpenseEl = document.getElementById("total-expense");
  const balanceEl = document.getElementById("balance");

  transactionList.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add(transaction.type);
    li.innerHTML = `
      ${transaction.description} - $${transaction.amount.toFixed(2)}
      <button onclick="deleteTransaction(${transaction.id})">Delete</button>
    `;

    transactionList.appendChild(li);

    if (transaction.type === "income") {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  totalIncomeEl.textContent = `$${totalIncome.toFixed(2)}`;
  totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
  balanceEl.textContent = `$${(totalIncome - totalExpense).toFixed(2)}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateUI();
}

function clearForm() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "income";
}

// Initial console message for debugging
console.log("Smart Personal Finance Tracker is ready!");
