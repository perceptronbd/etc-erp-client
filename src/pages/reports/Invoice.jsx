import React from "react";
import { Button, Container } from "../../components";
import { ChevronLeft, ChevronRight } from "lucide-react";

const InvoiceHeader = ({
  companyName,
  streetAddress,
  cityStateZip,
  phoneNumber,
  emailAddress,
  logoSrc,
}) => (
  <div className="flex justify-between p-5">
    <div>
      <h1 className="font-semibold uppercase text-gray-400">Invoice</h1>
      <div className="mt-6 text-sm leading-6">
        <p className="flex items-center">
          <ChevronLeft size={16} />
          {companyName}
          <ChevronRight size={16} />
        </p>
        <p className="flex items-center">
          <ChevronLeft size={16} />
          {streetAddress}
          <ChevronRight size={16} />
        </p>
        <p className="flex items-center">
          <ChevronLeft size={16} />
          {cityStateZip}
          <ChevronRight size={16} />
        </p>
        <p className="flex items-center">
          <ChevronLeft size={16} />
          {phoneNumber}
          <ChevronRight size={16} />
        </p>
        <p className="flex items-center">
          <ChevronLeft size={16} />
          {emailAddress}
          <ChevronRight size={16} />
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-6">
      <div>
        <img
          src={logoSrc}
          alt="Logo"
          className="mx-auto h-24 w-24 rounded-full border bg-gray-200"
        />
      </div>
      <div className="border-b-2 text-center">Date</div>
      <div className="border-b-2 text-center">Invoice No.</div>
      <p className="flex items-center text-xs">
        <ChevronLeft size={16} />
        Payment terms (due on reciept, due in X days)
        <ChevronRight size={16} />
      </p>
    </div>
  </div>
);

const BillShipTo = ({ title, contactName, companyName, address, phone, email }) => (
  <div>
    <h6 className="border-b-2 font-semibold uppercase">{title}</h6>
    <div className="mt-4 text-sm leading-6">
      <p className="flex items-center">
        <ChevronLeft size={16} />
        {contactName}
        <ChevronRight size={16} />
      </p>
      <p className="flex items-center">
        <ChevronLeft size={16} />
        {companyName}
        <ChevronRight size={16} />
      </p>
      <p className="flex items-center">
        <ChevronLeft size={16} />
        {address}
        <ChevronRight size={16} />
      </p>
      <p className="flex items-center">
        <ChevronLeft size={16} />
        {phone}
        <ChevronRight size={16} />
      </p>
      <p className="flex items-center">
        <ChevronLeft size={16} />
        {email}
        <ChevronRight size={16} />
      </p>
    </div>
  </div>
);

const Invoice = () => {
  const invoiceData = {
    companyName: "Your Company Name",
    streetAddress: "123 Street Address",
    cityStateZip: "City, state, Zip/Postal Code",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    logoSrc: "#", // Replace "#" with the actual URL of your logo image
    date: "2024-05-09",
    invoiceNumber: "INV-001",
    paymentTerms: "Due on receipt",
    billTo: {
      contactName: "John Doe",
      clientCompanyName: "Client Company",
      billToAddress: "456 Bill To Address",
      billToPhone: "123-456-7890",
      billToEmail: "john.doe@example.com",
    },
    shipTo: {
      nameDept: "Jane Smith / Shipping Dept",
      clientCompanyName: "Client Company",
      shipToAddress: "789 Ship To Address",
      shipToPhone: "987-654-3210",
    },
    items: [
      {
        description: "Item 1",
        quantity: 2,
        unitPrice: 50,
        total: 100,
      },
      {
        description: "Item 2",
        quantity: 1,
        unitPrice: 75,
        total: 75,
      },
      {
        description: "Item 3",
        quantity: 3,
        unitPrice: 30,
        total: 90,
      },
    ],
    subtotal: 265,
    discount: 15,
    subtotalLessDiscount: 250,
    taxRate: 0.1,
    totalTax: 25,
    shippingHandling: 10,
    paymentDue: 285,
  };
  const {
    companyName,
    streetAddress,
    cityStateZip,
    phoneNumber,
    emailAddress,
    logoSrc,
    date,
    invoiceNumber,
    paymentTerms,
    billTo,
    shipTo,
    items,
    subtotal,
    discount,
    subtotalLessDiscount,
    taxRate,
    totalTax,
    shippingHandling,
    paymentDue,
  } = invoiceData;

  return (
    <Container className={"w-fit justify-start"}>
      <div>
        <h3 className="my-5 text-lg font-medium">Invoice</h3>
      </div>
      <div className="max-h-[90vh] w-[900px] overflow-y-auto rounded-lg bg-white p-5 text-sm">
        <div className="border p-5 shadow">
          <div className="block h-5 w-full bg-red-500" />
          <InvoiceHeader
            companyName={companyName}
            streetAddress={streetAddress}
            cityStateZip={cityStateZip}
            phoneNumber={phoneNumber}
            emailAddress={emailAddress}
            logoSrc={logoSrc}
          />
          <div className="p-5">
            <div className="grid grid-cols-2 gap-6">
              <BillShipTo
                title="Bill to"
                contactName={billTo.contactName}
                companyName={billTo.clientCompanyName}
                address={billTo.billToAddress}
                phone={billTo.billToPhone}
                email={billTo.billToEmail}
              />
              <BillShipTo
                title="Ship to"
                contactName={shipTo.nameDept}
                companyName={shipTo.clientCompanyName}
                address={shipTo.shipToAddress}
                phone={shipTo.shipToPhone}
              />
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-red-500 text-white">
              <th className="px-4 py-1">Description</th>
              <th className="px-4 py-1">Quantity</th>
              <th className="px-4 py-1">Unit Price</th>
              <th className="px-4 py-1">Total</th>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-1">{item.description}</td>
                  <td className="border px-4 py-1">{item.quantity}</td>
                  <td className="border px-4 py-1">{item.unitPrice}</td>
                  <td className="border px-4 py-1">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-4 grid grid-cols-2 text-sm">
            <p className="text-sm font-medium">Remarks/Payment Instructions</p>
            <div className="grid justify-items-end gap-3 border-b-black pb-4 text-sm font-medium uppercase">
              <div className="flex gap-4">
                Subtotal: <p className="w-24 border-b-2">{subtotal}</p>
              </div>
              <div className="flex gap-4">
                Discount : <p className="w-24 border-b-2">{discount}</p>
              </div>
              <div className="flex gap-4">
                Subtotal Less Discount: <p className="w-24 border-b-2">{subtotalLessDiscount}</p>
              </div>
              <div className="flex gap-4">
                Tax Rate: <p className="w-24 border-b-2">{taxRate}</p>
              </div>
              <div className="flex gap-4">
                Total Tax: <p className="w-24 border-b-2">{totalTax}</p>
              </div>
              <div className="flex gap-4">
                Shipping/Handling: <p className="w-24 border-b-2">{shippingHandling}</p>
              </div>
              <div className="flex w-full justify-end gap-4 border-t border-t-black pt-2 font-semibold">
                Payment Due: <p className="w-24 ">{paymentDue}</p>
              </div>
            </div>
          </div>
          <div className="block h-5 w-full bg-red-500" />
        </div>
        <Button className="mt-5 bg-purple-500">Download PDF</Button>
      </div>
    </Container>
  );
};

export default Invoice;
