import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

describe("Avatar", () => {
  it("renders fallback text", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders image with alt text", () => {
    render(
      <Avatar>
        <AvatarImage src="/photo.jpg" alt="Profile photo" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByAltText("Profile photo")).toBeInTheDocument();
  });

  it("hides fallback after image loads", () => {
    render(
      <Avatar>
        <AvatarImage src="/photo.jpg" alt="Profile photo" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );

    fireEvent.load(screen.getByAltText("Profile photo"));
    expect(screen.queryByText("AB")).not.toBeInTheDocument();
  });

  it("shows fallback when image fails to load", () => {
    render(
      <Avatar>
        <AvatarImage src="/photo.jpg" alt="Profile photo" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );

    fireEvent.error(screen.getByAltText("Profile photo"));
    expect(screen.getByText("AB")).toBeInTheDocument();
    expect(screen.queryByAltText("Profile photo")).not.toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(
      <Avatar ref={ref}>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
