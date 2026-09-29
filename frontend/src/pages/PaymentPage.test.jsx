import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import api from "../config/api";

const mockNavigate = jest.fn();

jest.mock("../config/api", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  MemoryRouter: ({ children }) => children,
  useLocation: () => ({
    state: {
      property,
      propertyId: property._id,
      bookingDetails: {
        checkIn: "2030-06-10",
        checkOut: "2030-06-15",
        guests: 2,
      },
    },
  }),
  useNavigate: () => mockNavigate,
}));

const property = {
  _id: "property-a",
  title: "Test Property",
  price: 100,
  images: [],
  location: { city: "Test City", country: "Test Country" },
};

const renderPaymentPage = () =>
  render(
    <MemoryRouter
      initialEntries={[{
        pathname: "/payment",
        state: {
          property,
          propertyId: property._id,
          bookingDetails: {
            checkIn: "2030-06-10",
            checkOut: "2030-06-15",
            guests: 2,
          },
        },
      }]}
    >
      <PaymentPage />
    </MemoryRouter>
  );

const submitPayment = () => {
  fireEvent.change(screen.getByPlaceholderText("1234 5678 9012 3456"), {
    target: { value: "4242424242424242" },
  });
  fireEvent.change(screen.getByPlaceholderText("MM/YY"), {
    target: { value: "12/30" },
  });
  fireEvent.change(screen.getByPlaceholderText("123"), {
    target: { value: "123" },
  });
  fireEvent.change(screen.getByPlaceholderText("John Doe"), {
    target: { value: "Test Guest" },
  });
  fireEvent.submit(screen.getByRole("button", { name: /pay/i }));
};
test("shows an availability error and does not navigate when booking dates are unavailable", async () => {
  api.post.mockRejectedValueOnce({
    response: {
      status: 409,
      data: { message: "These dates are not available." },
    },
  });

  renderPaymentPage();
  submitPayment();

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "These dates are not available."
  );
  expect(mockNavigate).not.toHaveBeenCalledWith("/trips", expect.anything());
});

test("keeps the existing success navigation for a successful booking", async () => {
  jest.useFakeTimers();
  api.post.mockResolvedValueOnce({ data: { _id: "booking-a" } });

  renderPaymentPage();
  submitPayment();

  await act(async () => {});
  expect(api.post).toHaveBeenCalledWith("/api/bookings", {
    property: property._id,
    checkIn: "2030-06-10",
    checkOut: "2030-06-15",
    numGuests: 2,
  });

  await act(async () => {
    jest.advanceTimersByTime(1500);
  });

  expect(mockNavigate).toHaveBeenCalledWith("/trips", {
    state: { paymentSuccess: true, propertyId: property._id },
  });
  jest.useRealTimers();
});
