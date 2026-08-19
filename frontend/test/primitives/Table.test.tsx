import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/Table/Table";

const renderFullTable = () =>
  render(
    <Table>
      <TableCaption>Invoice Summary</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>INV002</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total: 2 invoices</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  );

describe("Table", () => {
  test("renders table element with data-slot=table", () => {
    const { container } = renderFullTable();
    expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
  });

  test("renders scrollable wrapper with data-slot=table-container", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-container"]'),
    ).toBeInTheDocument();
  });

  test("table-container has overflow-x-auto for horizontal scroll", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-container"]'),
    ).toHaveClass("overflow-x-auto");
  });

  test("renders thead with data-slot=table-header", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-header"]'),
    ).toBeInTheDocument();
  });

  test("renders tbody with data-slot=table-body", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-body"]'),
    ).toBeInTheDocument();
  });

  test("renders tfoot with data-slot=table-footer", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-footer"]'),
    ).toBeInTheDocument();
  });

  test("renders caption text", () => {
    renderFullTable();
    expect(screen.getByText("Invoice Summary")).toBeInTheDocument();
  });

  test("TableCaption has data-slot=table-caption", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-caption"]'),
    ).toBeInTheDocument();
  });

  test("renders header column labels", () => {
    renderFullTable();
    expect(screen.getByText("Invoice")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  test("renders body cell data", () => {
    renderFullTable();
    expect(screen.getByText("INV001")).toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeInTheDocument();
    expect(screen.getByText("INV002")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("renders footer content", () => {
    renderFullTable();
    expect(screen.getByText("Total: 2 invoices")).toBeInTheDocument();
  });

  test("TableHead renders as th element", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector("th[data-slot='table-head']"),
    ).toBeInTheDocument();
  });

  test("TableCell renders as td element", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector("td[data-slot='table-cell']"),
    ).toBeInTheDocument();
  });

  test("TableRow renders with data-slot=table-row", () => {
    const { container } = renderFullTable();
    expect(
      container.querySelector('[data-slot="table-row"]'),
    ).toBeInTheDocument();
  });

  test("applies custom className to Table", () => {
    const { container } = render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('[data-slot="table"]')).toHaveClass(
      "custom-table",
    );
  });

  test("applies custom className to TableRow", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow className="highlight-row">
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('[data-slot="table-row"]')).toHaveClass(
      "highlight-row",
    );
  });

  test("applies custom className to TableCell", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container.querySelector('[data-slot="table-cell"]')).toHaveClass(
      "text-right",
    );
  });

  test("matches snapshot", () => {
    const { asFragment } = renderFullTable();
    expect(asFragment()).toMatchSnapshot();
  });
});
