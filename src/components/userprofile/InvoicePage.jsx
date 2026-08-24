import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getInvoice } from "../../api/authApi";
import InvoicePopup from "./InvoicePopup";

export default function InvoicePage() {
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("payment_id");

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!paymentId) {
        console.error("Payment ID not found");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching invoice for:", paymentId);

        const response = await getInvoice(paymentId);

        console.log("Invoice API Response:", response);

        setInvoiceData(response);
      } catch (error) {
        console.error("Invoice API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading invoice...
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Invoice data not found.
      </div>
    );
  }

  return (
    <InvoicePopup
      invoiceData={invoiceData}
      onClose={() => window.history.back()}
    />
  );
}