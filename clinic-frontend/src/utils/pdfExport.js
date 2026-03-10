import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Enhanced PDF export with professional formatting
 */
export const generateConsultationPDF = async (
  consultation,
  doctor_name = "Doctor",
) => {
  try {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let y = margin;

    // Header
    pdf.setFillColor(59, 130, 246);
    pdf.rect(margin, y, contentWidth, 15, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(18);
    pdf.setFont(undefined, "bold");
    pdf.text("CLINIC CONSULTATION REPORT", pageWidth / 2, y + 10, {
      align: "center",
    });

    y += 25;

    // Patient Information Section
    pdf.setTextColor(59, 130, 246);
    pdf.setFontSize(12);
    pdf.setFont(undefined, "bold");
    pdf.text("👤 PATIENT INFORMATION", margin, y);

    y += 8;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");

    const patientInfo = [
      { label: "Name:", value: consultation.patient_name },
      {
        label: "Consultation Date:",
        value: new Date(consultation.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      {
        label: "Time:",
        value: new Date(consultation.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      },
      { label: "Doctor:", value: doctor_name },
    ];

    patientInfo.forEach(({ label, value }) => {
      pdf.text(`${label} ${value}`, margin + 5, y);
      y += 6;
    });

    y += 5;

    // Consultation Notes Section
    pdf.setTextColor(59, 130, 246);
    pdf.setFontSize(12);
    pdf.setFont(undefined, "bold");
    pdf.text("📝 CONSULTATION NOTES", margin, y);

    y += 8;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont(undefined, "normal");

    const noteLines = pdf.splitTextToSize(
      consultation.notes || "No notes provided",
      contentWidth - 5,
    );
    noteLines.forEach((line) => {
      if (y > pageHeight - margin - 30) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin + 5, y);
      y += 5;
    });

    y += 5;

    // Medicines Section
    pdf.setTextColor(34, 197, 94);
    pdf.setFontSize(12);
    pdf.setFont(undefined, "bold");
    pdf.text("💊 PRESCRIBED MEDICINES", margin, y);

    y += 8;

    if (consultation.medicines && consultation.medicines.length > 0) {
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);

      consultation.medicines.forEach((medicine, index) => {
        if (y > pageHeight - margin - 30) {
          pdf.addPage();
          y = margin;
        }

        // Medicine box
        pdf.setDrawColor(34, 197, 94);
        pdf.rect(margin, y - 3, contentWidth, 4, "S");

        pdf.setFont(undefined, "bold");
        pdf.text(`${index + 1}. ${medicine.medicine_name}`, margin + 5, y);

        y += 6;

        pdf.setFont(undefined, "normal");
        pdf.setTextColor(100, 100, 100);

        const instructionLines = pdf.splitTextToSize(
          `Instructions: ${medicine.instructions}`,
          contentWidth - 10,
        );

        instructionLines.forEach((line) => {
          if (y > pageHeight - margin - 10) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, margin + 8, y);
          y += 4;
        });

        y += 3;
      });
    } else {
      pdf.setFont(undefined, "italic");
      pdf.setTextColor(150, 150, 150);
      pdf.text("No medicines prescribed", margin + 5, y);
      y += 6;
    }

    y += 10;

    // Footer
    pdf.setTextColor(150, 150, 150);
    pdf.setFontSize(8);
    pdf.setFont(undefined, "normal");
    pdf.text(
      `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" },
    );

    const filename = `consultation-${consultation.patient_name.replace(/\s+/g, "-")}-${consultation.id}.pdf`;
    pdf.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error("Error generating PDF:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Generate PDF from HTML element with enhanced styling
 */
export const generatePDFFromElement = async (elementId, filename) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      useCORS: true,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
    return { success: true, filename };
  } catch (error) {
    console.error("Error generating PDF from element:", error);
    return { success: false, error: error.message };
  }
};
