import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  InventoryItem,
  formatCurrency,
  formatDate,
  groupByCategory,
  totalValue,
} from "./types";

/* ═══════════════════ Config ═══════════════════ */

const ACCENT = [43, 103, 119] as const; // #2B6777
const DARK = [23, 23, 23] as const;
const MID = [115, 115, 115] as const;
const LIGHT_BG = [248, 248, 248] as const;
const WHITE = [255, 255, 255] as const;
const ROW_ALT = [245, 249, 250] as const;

const MARGIN = 20;
const PAGE_W = 210; // A4 mm
const CONTENT_W = PAGE_W - MARGIN * 2;

/* ═══════════════════ Public API ═══════════════════ */

interface UserInfo {
  displayName: string;
  email: string;
}

export function exportInventoryPDF(
  items: InventoryItem[],
  userInfo: UserInfo
): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const generatedDate = new Date();
  const dateStr = formatDate(generatedDate);
  const timeStr = generatedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const grouped = groupByCategory(items);
  const categories = Object.keys(grouped).sort();

  // --- Cover page ---
  drawCoverPage(doc, items, userInfo, dateStr, timeStr, categories);

  // --- Table of Contents ---
  doc.addPage();
  drawTOC(doc, categories, grouped);

  // --- Item tables by category ---
  let itemIndex = 1;
  categories.forEach((cat, catIdx) => {
    doc.addPage();
    const catItems = grouped[cat];

    // Category header
    doc.setFillColor(...ACCENT);
    doc.rect(MARGIN, MARGIN, CONTENT_W, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(...WHITE);
    doc.text(
      `${cat}  (${catItems.length} item${catItems.length !== 1 ? "s" : ""})`,
      MARGIN + 4,
      MARGIN + 7
    );

    // Table
    autoTable(doc, {
      startY: MARGIN + 14,
      head: [["#", "Item Name", "Room", "Purchase Date", "Store", "Value", "Insured"]],
      body: catItems.map((item) => [
        String(itemIndex++),
        item.name,
        item.room ?? "—",
        formatDate(item.purchaseDate),
        item.store,
        formatCurrency(item.price),
        item.isInsured ? "Yes" : "No",
      ]),
      foot: [[
        "",
        { content: `${cat} Subtotal`, colSpan: 4, styles: { halign: "right" as const, fontStyle: "bold" as const } },
        "",
        { content: formatCurrency(totalValue(catItems)), styles: { fontStyle: "bold" as const } },
        "",
      ]],
      theme: "grid",
      styles: {
        fontSize: 9,
        cellPadding: 3,
        textColor: [...DARK],
        lineColor: [220, 220, 220] as [number, number, number],
        lineWidth: 0.25,
      },
      headStyles: {
        fillColor: [...ACCENT],
        textColor: [...WHITE],
        fontStyle: "bold",
        fontSize: 9,
      },
      footStyles: {
        fillColor: [235, 245, 248] as [number, number, number],
        textColor: [...DARK],
      },
      alternateRowStyles: {
        fillColor: [...ROW_ALT],
      },
      margin: { left: MARGIN, right: MARGIN },
    });

    // Grand total on the last category
    if (catIdx === categories.length - 1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const finalY = ((doc as any).lastAutoTable?.finalY as number) ?? 200;
      const y = finalY + 6;
      doc.setFillColor(...ACCENT);
      doc.rect(MARGIN, y, CONTENT_W, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...WHITE);
      doc.text("Grand Total", MARGIN + 4, y + 7);
      doc.text(formatCurrency(totalValue(items)), PAGE_W - MARGIN - 4, y + 7, {
        align: "right",
      });
    }
  });

  // --- Add footers to all pages ---
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(doc, i, pageCount, dateStr);
  }

  doc.save(`EvacLog_Inventory_${generatedDate.toISOString().slice(0, 10)}.pdf`);
}

/* ═══════════════════ Cover Page ═══════════════════ */

function drawCoverPage(
  doc: jsPDF,
  items: InventoryItem[],
  userInfo: UserInfo,
  dateStr: string,
  timeStr: string,
  categories: string[]
) {
  const centerX = PAGE_W / 2;

  // Accent bar at top
  doc.setFillColor(...ACCENT);
  doc.rect(0, 0, PAGE_W, 50, "F");

  // Branding
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...WHITE);
  doc.text("EvacLog", centerX, 25, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Home Inventory Report", centerX, 35, { align: "center" });

  // Subtitle
  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  doc.setFont("helvetica", "italic");
  doc.text("For Insurance Documentation", centerX, 65, { align: "center" });

  // Report metadata
  let y = 82;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MID);
  doc.text(`Prepared for: ${userInfo.displayName}`, centerX, y, { align: "center" });
  y += 6;
  doc.text(`Email: ${userInfo.email}`, centerX, y, { align: "center" });
  y += 6;
  doc.text(`Generated: ${dateStr} at ${timeStr}`, centerX, y, { align: "center" });

  // Summary stats box
  y = 110;
  const boxH = 52;
  doc.setFillColor(...LIGHT_BG);
  doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 3, 3, "F");
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(MARGIN, y, CONTENT_W, boxH, 3, 3, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text("Inventory Summary", MARGIN + 6, y + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MID);

  const insuredCount = items.filter((i) => i.isInsured).length;
  const insuredPct = items.length > 0 ? Math.round((insuredCount / items.length) * 100) : 0;

  const stats = [
    `Total Items: ${items.length}`,
    `Total Value: ${formatCurrency(totalValue(items))}`,
    `Insured Items: ${insuredCount} (${insuredPct}%)`,
    `Categories: ${categories.length}`,
  ];

  const col1X = MARGIN + 10;
  const col2X = centerX + 5;
  stats.forEach((stat, i) => {
    const x = i % 2 === 0 ? col1X : col2X;
    const row = Math.floor(i / 2);
    doc.text(stat, x, y + 22 + row * 10);
  });

  // Confidentiality notice
  doc.setFontSize(8);
  doc.setTextColor(...MID);
  doc.text("Confidential — Generated by EvacLog", centerX, 280, {
    align: "center",
  });
}

/* ═══════════════════ Table of Contents ═══════════════════ */

function drawTOC(
  doc: jsPDF,
  categories: string[],
  grouped: Record<string, InventoryItem[]>
) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...ACCENT);
  doc.text("Table of Contents", MARGIN, MARGIN + 10);

  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, MARGIN + 14, PAGE_W - MARGIN, MARGIN + 14);

  let y = MARGIN + 26;

  // Header row
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text("Category", MARGIN + 4, y);
  doc.text("Items", PAGE_W / 2, y, { align: "center" });
  doc.text("Value", PAGE_W - MARGIN - 4, y, { align: "right" });
  y += 4;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.25);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  categories.forEach((cat, i) => {
    const catItems = grouped[cat];
    const [r, g, b] = i % 2 === 0 ? LIGHT_BG : WHITE;
    doc.setFillColor(r, g, b);
    doc.rect(MARGIN, y - 4, CONTENT_W, 8, "F");

    doc.setTextColor(...DARK);
    doc.text(cat, MARGIN + 4, y);
    doc.text(String(catItems.length), PAGE_W / 2, y, { align: "center" });
    doc.text(formatCurrency(totalValue(catItems)), PAGE_W - MARGIN - 4, y, {
      align: "right",
    });
    y += 8;
  });

  // Total row
  y += 2;
  doc.setDrawColor(...ACCENT);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...ACCENT);
  doc.text("Total", MARGIN + 4, y);

  const allItems = Object.values(grouped).flat();
  doc.text(String(allItems.length), PAGE_W / 2, y, { align: "center" });
  doc.text(formatCurrency(totalValue(allItems)), PAGE_W - MARGIN - 4, y, {
    align: "right",
  });
}

/* ═══════════════════ Footer ═══════════════════ */

function drawFooter(
  doc: jsPDF,
  pageNum: number,
  totalPages: number,
  dateStr: string
) {
  const y = 290;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.25);
  doc.line(MARGIN, y - 4, PAGE_W - MARGIN, y - 4);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MID);
  doc.text(
    `EvacLog Inventory Report · Generated ${dateStr} · Page ${pageNum} of ${totalPages}`,
    PAGE_W / 2,
    y,
    { align: "center" }
  );
  doc.setFontSize(6);
  doc.text("Confidential — For authorized use only", PAGE_W / 2, y + 4, {
    align: "center",
  });
}
