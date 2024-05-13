import React, { useState } from "react";
import { Button, Container, FormInput } from "../../components";
import { toast } from "sonner";
import { X } from "lucide-react";
import { addExpensesApi } from "../../api/indirect-expenses/indirectExpenses";

const IndirectExpenses = () => {
  const currentDate = new Date();
  const options = { month: "long" };
  const currentMonth = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      expenseTitle: "",
      amount: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExpenses = [...expenses];

    if (name === "amount" && value === "") {
      updatedExpenses[index][name] = 0; // Set value to 0 to avoid NaN errors
    } else if (name === "expenseTitle") {
      updatedExpenses[index][name] = value;
    } else {
      updatedExpenses[index][name] = parseInt(value); // convert value to a number
    }

    setExpenses(updatedExpenses);
  };

  const handleAddExpense = () => {
    const previousExpenses = expenses[expenses.length - 1];
    if (!previousExpenses || (previousExpenses.expenseTitle && previousExpenses.amount)) {
      setExpenses([
        ...expenses,
        {
          expenseTitle: "",
          amount: 0,
        },
      ]);
    } else {
      toast.error("Please fill out the previous expenses before adding a new one.");
    }
  };

  const handleRemoveExpense = (index) => {
    if (index !== 0) {
      const updatedExpenses = expenses.filter((_, idx) => idx !== index);
      setExpenses(updatedExpenses);
    } else {
      setExpenses([
        {
          expenseTitle: "",
          amount: "",
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form inputs
      const invalidInputIndex = expenses.findIndex(
        (expense) => !expense.expenseTitle || !expense.amount || isNaN(expense.amount)
      );

      if (invalidInputIndex !== -1) {
        setLoading(false);
        toast.error("Please provide valid inputs for all expenses .");
        return;
      }

      const res = await addExpensesApi({ expenseItems: expenses });

      if (res.status === 200 || res.status === 201) {
        toast.success("Expenses added successfully");
        setExpenses([
          {
            expenseTitle: "",
            amount: 0,
          },
        ]);
      } else if (res.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding expenses :", error);
      toast.error("An error occurred while adding expenses ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="w-fit items-start justify-start">
      <div className="mb-2 text-start">
        <p className="text-lg font-medium">Indirect Expenses</p>
        <p className="text-sm">For the month of {currentMonth}</p>
      </div>

      <div className="rounded-lg bg-white p-5">
        <form onSubmit={handleSubmit}>
          {expenses.map((expense, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="grid grid-cols-2 gap-x-4">
                <FormInput
                  id={`expenseTitle-${idx}`}
                  label="Expense Title"
                  placeholder="Expense Title"
                  name="expenseTitle"
                  errorMessage="Please enter a valid input"
                  required
                  value={expense.expenseTitle}
                  onChange={(e) => handleInputChange(e, idx)}
                />

                <FormInput
                  id={`amount-${idx}`}
                  label="Amount"
                  placeholder="Amount"
                  pattern="[0-9]+"
                  name="amount"
                  errorMessage="Please enter a valid number"
                  required
                  value={expense.amount === 0 ? "" : expense.amount}
                  onChange={(e) => handleInputChange(e, idx)}
                  type="number"
                />
              </div>
              <Button
                className="hover: border border-rose-400 bg-white text-rose-400 hover:bg-rose-400 hover:text-white disabled:cursor-not-allowed"
                type="button"
                onClick={() => handleRemoveExpense(idx)}
                disabled={
                  loading ||
                  (idx === 0 &&
                    expense.expenseTitle === "" &&
                    (expense.amount === "" || expense.amount === 0))
                }
              >
                <X size={18} />
              </Button>
            </div>
          ))}

          <div className="mt-2 grid w-full grid-cols-1 gap-4 text-end">
            <Button
              className="w-full "
              type="button"
              onClick={handleAddExpense}
              disabled={loading}
              variant="primary"
            >
              Add Expense
            </Button>
            <Button className="w-full " type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default IndirectExpenses;
