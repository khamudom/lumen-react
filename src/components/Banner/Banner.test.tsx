import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Banner, BannerDescription, BannerTitle } from "./Banner";

describe("Banner", () => {
  it("renders with status role by default", () => {
    render(
      <Banner>
        <BannerTitle>API preview mode</BannerTitle>
        <BannerDescription>Mock fallbacks disabled</BannerDescription>
      </Banner>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("API preview mode")).toBeInTheDocument();
  });

  it("uses alert role for danger variant", () => {
    render(
      <Banner variant="danger">
        <BannerTitle>Service outage</BannerTitle>
      </Banner>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    render(
      <Banner variant="warning">
        <BannerTitle>Notice</BannerTitle>
      </Banner>,
    );
    expect(screen.getByRole("status")).toHaveClass("lumen-banner--warning");
  });

  it("calls onDismiss from dismiss button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Banner onDismiss={onDismiss}>
        <BannerTitle>Preview mode</BannerTitle>
      </Banner>,
    );

    await user.click(screen.getByRole("button", { name: /dismiss banner/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not render dismiss button without onDismiss", () => {
    render(
      <Banner>
        <BannerTitle>Preview mode</BannerTitle>
      </Banner>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Banner ref={ref}>
        <BannerTitle>Content</BannerTitle>
      </Banner>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
