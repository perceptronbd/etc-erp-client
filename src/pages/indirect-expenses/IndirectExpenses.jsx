import React, { useState } from "react";
import { formatDate } from "../../utils/dateFormat";
import { Button, Container, FormInput } from "../../components";
import { addExpensesApi } from "../../api/indirect-expenses/indirectExpenses";
import { toast } from "sonner";

const IndirectExpenses = () => {
  const currentDate = new Date();
  const options = { month: "long" };
  const currentMonth = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    officeRent: "",
    utility: "",
    salary: "",
    otherExpenses: "",
    inputTitle: "",
    inputCost: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formatedData = {
      officeRent: parseInt(formValues.officeRent),
      utility: parseInt(formValues.utility),
      salary: parseInt(formValues.salary),
      otherExpenses: parseInt(formValues.otherExpenses),
      inputTitle: formValues.inputTitle,
      inputCost: parseInt(formValues.inputCost),
    };
    try {
      const res = await addExpensesApi(formatedData);
      if (res.status === 200 || res.status === 201) {
        setLoading(false);
        toast.success("Expenses added successfully");
        setFormValues({
          officeRent: "",
          utility: "",
          salary: "",
          otherExpenses: "",
          inputTitle: "",
          inputCost: "",
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
        <p className="text-lg font-medium">Indirect Expenses</p>
        <p className="text-sm">For the month of {currentMonth}</p>
      </div>

      <div className="rounded-lg bg-white p-5">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="officeRent"
              label="Office Rent"
              placeholder="Office Rent"
              pattern="[0-9]+"
              name="officeRent"
              errorMessage="Please enter a valid number"
              required
              value={formValues.officeRent}
              onChange={handleInputChange}
            />
            <FormInput
              id="utility"
              label="Utility"
              placeholder="Utility"
              pattern="[0-9]+"
              name="utility"
              errorMessage="Please enter a valid number"
              required
              value={formValues.utility}
              onChange={handleInputChange}
            />
            <FormInput
              id="salary"
              label="Salary"
              placeholder="Salary"
              pattern="[0-9]+"
              name="salary"
              errorMessage="Please enter a valid number"
              required
              value={formValues.salary}
              onChange={handleInputChange}
            />
            <FormInput
              id="otherExpenses"
              label="Other Expenses"
              placeholder="Other Expenses"
              pattern="[0-9]+"
              name="otherExpenses"
              errorMessage="Please enter a valid number"
              required
              value={formValues.otherExpenses}
              onChange={handleInputChange}
            />
            <FormInput
              id="inputTitle"
              label="Input Title"
              placeholder="Input Title"
              name="inputTitle"
              errorMessage="Please enter a valid input"
              required
              value={formValues.inputTitle}
              onChange={handleInputChange}
            />

            <FormInput
              id="inputCost"
              label="Input Cost"
              placeholder="Input Cost"
              pattern="[0-9]+"
              name="inputCost"
              errorMessage="Please enter a valid number"
              required
              value={formValues.inputCost}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-4 text-end">
            <div />
            <Button className="mt-6 " type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default IndirectExpenses;
