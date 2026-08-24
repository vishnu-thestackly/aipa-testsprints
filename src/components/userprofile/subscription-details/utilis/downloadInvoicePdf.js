import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadInvoicePdf = async (invoiceData) => {
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const invoiceElement = document.createElement("div");

  invoiceElement.style.position = "fixed";
  invoiceElement.style.left = "-9999px";
  invoiceElement.style.top = "0";
  invoiceElement.style.width = "640px";
  invoiceElement.style.background = "white";
  invoiceElement.style.padding = "32px";
  invoiceElement.style.fontFamily = "Arial, sans-serif";

  invoiceElement.innerHTML = `
    <div>
      <h1 style="font-size: 24px; margin-bottom: 20px;">
        INVOICE
      </h1>

      <hr />

      <div style="display:flex; justify-content:space-between; margin-top:20px;">
        <div>
          <strong>Address</strong>
          <p>-</p>
        </div>

        <div style="text-align:right;">
          <p>
            <strong>Date:</strong>
            ${formatDate(invoiceData?.date)}
          </p>

          <p>
            <strong>Invoice ID:</strong>
            ${invoiceData?.invoice_id ?? "-"}
          </p>
        </div>
      </div>

      <hr />

      <p>
        <strong>Name:</strong>
        ${invoiceData?.user_name ?? "-"}
      </p>

      <p>
        <strong>Email ID:</strong>
        ${invoiceData?.email ?? "-"}
      </p>

      <div style="
        margin-top:20px;
        padding:16px;
        background:#F5F7FF;
        border:1px solid #4866F6;
        border-radius:12px;
      ">
        <h3>${invoiceData?.plan_name ?? "-"}</h3>

        <p>
          ${invoiceData?.plan_description ?? "-"}
        </p>

        <p>
          <strong>Amount:</strong>
          ₹${invoiceData?.amount ?? 0}
        </p>

        <p>
          <strong>Billing Cycle:</strong>
          ${formatDate(invoiceData?.billing_cycle_start)}
          -
          ${formatDate(invoiceData?.billing_cycle_end)}
        </p>
      </div>

      <hr style="margin-top:20px;" />

      <div style="margin-top:20px;">
        <p>
          <strong>Payment ID:</strong>
          ${invoiceData?.payment_id ?? "-"}
        </p>

        <p>
          <strong>Payment Method:</strong>
          ${invoiceData?.payment_method ?? "-"}
        </p>
      </div>

      <div style="margin-top:30px; text-align:right;">
        <p>
          <strong>Total Plan Amount:</strong>
          ₹${invoiceData?.amount ?? 0}
        </p>

        <p>
          <strong>CGST:</strong>
          ₹${invoiceData?.cgst ?? 0}
        </p>

        <p>
          <strong>SGST:</strong>
          ₹${invoiceData?.sgst ?? 0}
        </p>

        <p>
          <strong>Discount:</strong>
          ₹${invoiceData?.discount ?? 0}
        </p>

        <hr />

        <p style="font-size:18px;">
          <strong>Grand Total:</strong>
          ₹${invoiceData?.grand_total ?? 0}
        </p>
      </div>

      <p style="
        text-align:center;
        color:#4866F6;
        font-size:18px;
        margin-top:30px;
      ">
        Thankyou for the Purchase!!
      </p>
    </div>
  `;

  document.body.appendChild(invoiceElement);

  try {
    const canvas = await html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `Invoice-${invoiceData?.invoice_id ?? "invoice"}.pdf`
    );
  } finally {
    document.body.removeChild(invoiceElement);
  }
};