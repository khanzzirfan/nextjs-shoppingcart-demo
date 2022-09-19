import { fireEvent, render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByTestId("headerwrapper");
    const productItem = screen.getByTestId("productitem-1");
    const button = screen.getByTestId("button-1");
    expect(heading).toBeInTheDocument();
    expect(productItem).toBeInTheDocument();

    fireEvent.click(button);
  });
});
