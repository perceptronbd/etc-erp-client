import React, { useState } from "react";
import { Button, Container, FormInput } from "../../components";
import { toast } from "sonner";
import { addOthersIncomeApi } from "../../api/others-income/others-income";
import { X } from "lucide-react";

const OthersIncome = () => {
  const currentDate = new Date();
  const options = { month: "long" };
  const currentMonth = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  const [loading, setLoading] = useState(false);
  const [incomeSources, setIncomeSources] = useState([
    {
      incomeTitle: "",
      amount: "",
    },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedIncomeSources = [...incomeSources];

    if (name === "amount" && value === "") {
      updatedIncomeSources[index][name] = 0; // Set value to 0 to avoid NaN errors
    } else if (name === "incomeTitle") {
      updatedIncomeSources[index][name] = value;
    } else {
      updatedIncomeSources[index][name] = parseInt(value); // convert value to a number
    }

    setIncomeSources(updatedIncomeSources);
  };

  const handleAddIncomeSource = () => {
    const previousIncomeSource = incomeSources[incomeSources.length - 1];
    if (
      !previousIncomeSource ||
      (previousIncomeSource.incomeTitle && previousIncomeSource.amount)
    ) {
      setIncomeSources([
        ...incomeSources,
        {
          incomeTitle: "",
          amount: 0,
        },
      ]);
    } else {
      toast.error("Please fill out the previous income source before adding a new one.");
    }
  };

  const handleRemoveIncomeSource = (index) => {
    if (index !== 0) {
      const updatedIncomeSources = incomeSources.filter((_, idx) => idx !== index);
      setIncomeSources(updatedIncomeSources);
    } else {
      setIncomeSources([
        {
          incomeTitle: "",
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
      const invalidInputIndex = incomeSources.findIndex(
        (source) => !source.incomeTitle || !source.amount || isNaN(source.amount)
      );

      if (invalidInputIndex !== -1) {
        setLoading(false);
        toast.error("Please provide valid inputs for all income sources.");
        return;
      }

      const res = await addOthersIncomeApi({ incomeItems: incomeSources });

      if (res.status === 200 || res.status === 201) {
        toast.success("Income sources added successfully");
        setIncomeSources([
          {
            incomeTitle: "",
            amount: 0,
          },
        ]);
      } else if (res.status === 400) {
        toast.error(res.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding income sources:", error);
      toast.error("An error occurred while adding income sources");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="w-fit items-start justify-start">
      <div className="mb-2 text-start">
        <p className="text-lg font-medium">Others Income</p>
        <p className="text-sm">For the month of {currentMonth}</p>
      </div>

      <div className="rounded-lg bg-white p-5">
        <form onSubmit={handleSubmit}>
          {incomeSources.map((source, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="grid grid-cols-2 gap-x-4">
                <FormInput
                  id={`incomeTitle-${idx}`}
                  label="Income Title"
                  placeholder="Income Title"
                  name="incomeTitle"
                  errorMessage="Please enter a valid input"
                  required
                  value={source.incomeTitle}
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
                  value={source.amount === 0 ? "" : source.amount}
                  onChange={(e) => handleInputChange(e, idx)}
                  type="number"
                />
              </div>
              <Button
                className="hover: border border-rose-400 bg-white text-rose-400 hover:bg-rose-400 hover:text-white disabled:cursor-not-allowed"
                type="button"
                onClick={() => handleRemoveIncomeSource(idx)}
                disabled={loading}
              >
                <X size={18} />
              </Button>
            </div>
          ))}

          <div className="mt-2 grid w-full grid-cols-1 gap-4 text-end">
            <Button
              className="w-full"
              type="button"
              onClick={handleAddIncomeSource}
              disabled={loading}
              variant="primary"
            >
              Add Income Source
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

export default OthersIncome;
