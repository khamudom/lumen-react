import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

describe("Card", () => {
  it("renders composable structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <p>$12,400</p>
        </CardContent>
        <CardFooter>
          <span>Updated today</span>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: /revenue/i })).toBeInTheDocument();
    expect(screen.getByText("Last 30 days")).toBeInTheDocument();
    expect(screen.getByText("$12,400")).toBeInTheDocument();
    expect(screen.getByText("Updated today")).toBeInTheDocument();
  });

  it("applies interactive class", () => {
    const { container } = render(<Card interactive>Content</Card>);
    expect(container.firstChild).toHaveClass("lumen-card--interactive");
  });
});
