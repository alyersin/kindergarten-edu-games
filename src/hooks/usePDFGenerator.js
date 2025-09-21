"use client";

import { useToast } from "@chakra-ui/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const usePDFGenerator = () => {
  const toast = useToast();

  const downloadImage = async (generatedWorksheet) => {
    if (!generatedWorksheet) {
      toast({
        title: "⚠️ Eroare",
        description: "Generează mai întâi o fișă!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    try {
      toast({
        title: "🖼️ Se generează imaginea...",
        description: "Te rugăm să aștepți câteva secunde",
        status: "info",
        duration: 3000,
        position: "top",
      });

      const element = document.querySelector(".pdf-content");
      if (!element) {
        toast({
          title: "❌ Eroare",
          description: "Nu s-a găsit conținutul pentru previzualizare",
          status: "error",
          duration: 5000,
          position: "top",
        });
        return;
      }

      // Wait a bit for the element to be fully rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Force inline styles on the element before capturing
      console.log("Forcing inline styles for image...");
      element.style.backgroundColor = "white";
      element.style.color = "black";
      element.style.visibility = "visible";
      element.style.opacity = "1";
      element.style.display = "block";
      element.style.position = "static";

      // Force styles on all children
      const allChildren = element.querySelectorAll("*");
      allChildren.forEach((child) => {
        child.style.visibility = "visible";
        child.style.opacity = "1";
        child.style.color = "black";
        if (
          child.style.backgroundColor &&
          child.style.backgroundColor !== "white"
        ) {
          child.style.backgroundColor = "transparent";
        }
      });

      // Scroll to element to ensure it's visible
      element.scrollIntoView({ behavior: "instant", block: "start" });
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Try capturing the element
      const targetElement = element.offsetHeight > 0 ? element : document.body;
      console.log(
        "Target element for image capture:",
        targetElement === element ? "original element" : "document.body"
      );

      const canvas = await html2canvas(targetElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: true,
        letterRendering: true,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        removeContainer: false,
      });

      console.log("Image canvas created:", {
        width: canvas.width,
        height: canvas.height,
      });

      // Convert to image
      const imgData = canvas.toDataURL("image/jpeg", 0.9);
      console.log("Image data length:", imgData.length);

      // Download image
      const link = document.createElement("a");
      link.download = `worksheet-${Date.now()}.jpg`;
      link.href = imgData;
      link.click();

      toast({
        title: "✅ Succes",
        description: "Imaginea a fost descărcată cu succes!",
        status: "success",
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "❌ Eroare",
        description: "Eroare la generarea imaginii: " + error.message,
        status: "error",
        duration: 5000,
        position: "top",
      });
    }
  };

  const downloadPDF = async (printRef, generatedWorksheet) => {
    if (!generatedWorksheet) {
      toast({
        title: "⚠️ Eroare",
        description: "Generează mai întâi o fișă!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    try {
      toast({
        title: "📄 Se generează PDF-ul...",
        description: "Te rugăm să aștepți câteva secunde",
        status: "info",
        duration: 3000,
        position: "top",
      });

      const element = printRef.current;

      if (!element) {
        console.error("Element not found for PDF generation");
        toast({
          title: "❌ Eroare",
          description: "Elementul pentru PDF nu a fost găsit!",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      console.log("Element found:", element);
      console.log("Element dimensions:", {
        width: element.scrollWidth,
        height: element.scrollHeight,
        offsetWidth: element.offsetWidth,
        offsetHeight: element.offsetHeight,
      });

      // Log element structure
      console.log("Element tag name:", element.tagName);
      console.log("Element class name:", element.className);
      console.log("Element computed style:", window.getComputedStyle(element));
      console.log(
        "Element first 500 chars of innerHTML:",
        element.innerHTML.substring(0, 500)
      );

      // Check if element has visible content
      const hasContent = element.children.length > 0;
      const hasText =
        element.textContent && element.textContent.trim().length > 0;
      console.log("Element content check:", {
        hasChildren: hasContent,
        childrenCount: element.children.length,
        hasText: hasText,
        textLength: element.textContent ? element.textContent.trim().length : 0,
        innerHTML: element.innerHTML.substring(0, 200) + "...",
      });

      if (!hasContent && !hasText) {
        console.error("Element has no visible content");
        toast({
          title: "❌ Eroare",
          description: "Elementul nu are conținut vizibil!",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      // Wait a bit for the element to be fully rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Force inline styles on the element before capturing
      console.log("Forcing inline styles...");
      element.style.backgroundColor = "white";
      element.style.color = "black";
      element.style.visibility = "visible";
      element.style.opacity = "1";
      element.style.display = "block";
      element.style.position = "static";

      // Force styles on all children
      const allChildren = element.querySelectorAll("*");
      allChildren.forEach((child) => {
        child.style.visibility = "visible";
        child.style.opacity = "1";
        child.style.color = "black";
        if (
          child.style.backgroundColor &&
          child.style.backgroundColor !== "white"
        ) {
          child.style.backgroundColor = "transparent";
        }
      });

      // Scroll to element to ensure it's visible
      element.scrollIntoView({ behavior: "instant", block: "start" });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Increased wait time

      // Try simple approach first
      console.log("Attempting simple html2canvas...");
      console.log("Element to capture:", element.outerHTML.substring(0, 1000));

      let canvas;

      try {
        // Force the element to be visible and have content
        element.style.display = "block";
        element.style.visibility = "visible";
        element.style.opacity = "1";
        element.style.position = "relative";
        element.style.zIndex = "9999";

        // Wait for any images to load
        const images = element.querySelectorAll("img");
        if (images.length > 0) {
          await Promise.all(
            Array.from(images).map(
              (img) =>
                new Promise((resolve) => {
                  if (img.complete) {
                    resolve();
                  } else {
                    img.onload = resolve;
                    img.onerror = resolve;
                    setTimeout(resolve, 2000); // Timeout after 2 seconds
                  }
                })
            )
          );
        }

        // Try capturing the element first, fallback to document.body if needed
        const targetElement =
          element.offsetHeight > 0 ? element : document.body;
        console.log(
          "Target element for capture:",
          targetElement === element ? "original element" : "document.body"
        );

        canvas = await html2canvas(targetElement, {
          scale: 1, // Reduced scale to avoid issues
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: true, // Enable logging to debug
          letterRendering: true,
          foreignObjectRendering: true,
          imageTimeout: 30000, // Increased timeout
          removeContainer: false,
          width: targetElement.scrollWidth || targetElement.offsetWidth,
          height: targetElement.scrollHeight || targetElement.offsetHeight,
          scrollX: 0,
          scrollY: 0,
        });
      } catch (error) {
        console.error("html2canvas failed:", error);
        toast({
          title: "❌ Eroare",
          description: "Eroare la generarea canvas-ului: " + error.message,
          status: "error",
          duration: 5000,
          position: "top",
        });
        return;
      }

      console.log("Canvas created:", {
        width: canvas.width,
        height: canvas.height,
      });

      // Check if canvas is too large (might be capturing too much)
      if (canvas.width > 2000 || canvas.height > 2000) {
        console.warn(
          "Canvas is very large, might be capturing too much content"
        );
      }

      // Check if canvas has any non-white pixels (more lenient check)
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(
        0,
        0,
        Math.min(50, canvas.width),
        Math.min(50, canvas.height)
      );
      const data = imageData.data;
      let hasNonWhitePixels = false;
      let nonWhiteCount = 0;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Check if pixel is not white (more lenient tolerance)
        if (a > 10 && (r < 240 || g < 240 || b < 240)) {
          hasNonWhitePixels = true;
          nonWhiteCount++;
        }
      }

      console.log("Canvas content check:", {
        hasNonWhitePixels,
        nonWhiteCount,
        totalPixels: data.length / 4,
        sampleSize: `${Math.min(50, canvas.width)}x${Math.min(
          50,
          canvas.height
        )}`,
        canvasSize: `${canvas.width}x${canvas.height}`,
      });

      // Only show error if canvas is completely empty or very small
      if (!hasNonWhitePixels && (canvas.width < 100 || canvas.height < 100)) {
        console.error("Canvas appears to be too small or empty");
        toast({
          title: "❌ Eroare",
          description: "Canvas-ul este prea mic sau gol!",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      // Use PNG for better quality, especially for number tracing with images
      const imgData = canvas.toDataURL("image/png", 1.0); // Maximum quality
      console.log("Image data length:", imgData.length);
      console.log("Canvas dimensions:", {
        width: canvas.width,
        height: canvas.height,
      });

      // Verify image data is not empty
      if (!imgData || imgData.length < 1000) {
        console.error("Image data is too small or empty");
        toast({
          title: "❌ Eroare",
          description: "Datele imaginii sunt prea mici sau goale!",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      // Save canvas as image for debugging (temporary)
      const link = document.createElement("a");
      link.download = "debug-canvas.png";
      link.href = imgData;
      // Uncomment next line to auto-download for debugging
      // link.click(); // Dezactivat - PDF funcționează acum

      // Use orientation from user settings
      const isLandscape = generatedWorksheet.orientation === "landscape";

      console.log("PDF orientation:", isLandscape ? "landscape" : "portrait");
      const pdf = new jsPDF(isLandscape ? "l" : "p", "mm", "a4");

      const imgWidth = isLandscape ? 295 : 210; // A4 width in mm (landscape vs portrait)
      const pageHeight = isLandscape ? 210 : 295; // A4 height in mm (landscape vs portrait)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      console.log("PDF dimensions:", {
        imgWidth,
        imgHeight,
        pageHeight,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      });

      let heightLeft = imgHeight;
      let position = 0;

      console.log("Adding image to PDF...");
      console.log("Image data preview:", imgData.substring(0, 100) + "...");

      try {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        console.log("First page added successfully");
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      } catch (error) {
        console.error("Error adding image to PDF:", error);
        toast({
          title: "❌ Eroare",
          description: "Eroare la adăugarea imaginii în PDF: " + error.message,
          status: "error",
          duration: 5000,
          position: "top",
        });
        return;
      }

      console.log("PDF generation completed");

      // Verify PDF has content
      const pdfOutput = pdf.output("datauristring");
      console.log("PDF output length:", pdfOutput.length);

      if (pdfOutput.length < 1000) {
        console.error("PDF output is too small");
        toast({
          title: "❌ Eroare",
          description: "PDF-ul generat este prea mic sau gol!",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }

      const fileName = `${generatedWorksheet.title.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;

      console.log("Saving PDF:", fileName);
      pdf.save(fileName);

      toast({
        title: "✅ PDF Downloadat!",
        description: `Fișa a fost salvată ca ${fileName}`,
        status: "success",
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "❌ Eroare la generarea PDF",
        description: "A apărut o problemă. Încearcă din nou!",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  const printWorksheet = (printRef) => {
    if (!printRef || !printRef.current) {
      toast({
        title: "⚠️ Eroare",
        description: "Elementul pentru print nu a fost găsit!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    window.print();
  };

  return {
    downloadPDF,
    downloadImage,
    printWorksheet,
  };
};
