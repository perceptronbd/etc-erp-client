import React, { useState } from "react";
import { Button, Container, FormInput } from "../../components";
import { toast } from "sonner";
import { addOthersIncomeApi } from "../../api/others-income/others-income";

const OthersIncome = () => {
  const currentDate = new Date();
  const options = { month: "long" };
  const currentMonth = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    incomeTitle: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formatedData = {
      incomeTitle: formValues.incomeTitle,
      amount: parseInt(formValues.amount),
    };
    try {
      const res = await addOthersIncomeApi(formatedData);
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        toast.success("Others income added successfully");
        setFormValues({
          incomeTitle: "",
          amount: "",
        });
      } else if (res.status === 400) {
        setLoading(false);
        toast.error(res.data.message);
      } else {
        setLoading(false);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding expenses:", error);
      setLoading(false);
      toast.error("An error occurred while adding expenses");
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
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="incomeTitle"
              label="Income Title"
              placeholder="Income Title"
              name="incomeTitle"
              errorMessage="Please enter a valid input"
              required
              value={formValues.incomeTitle}
              onChange={handleInputChange}
            />

            <FormInput
              id="amount"
              label="Amount"
              placeholder="Amount"
              pattern="[0-9]+"
              name="amount"
              errorMessage="Please enter a valid number"
              required
              value={formValues.amount}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full text-end">
            <Button className="mt-6 w-1/2" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default OthersIncome;
