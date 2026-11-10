import { useEffect, useId, useRef, useState } from "react";

import {
  MapPin,
  CalendarDays,
  UserRound,
  ChevronDown,
  ArrowRight,
  Check,
  Minus,
  Plus,
} from "lucide-react";

import "./BookingBar.css";

const DESTINATIONS = [
  { value: "Mountain Retreats", hint: "Alpine lodges and cabins" },
  { value: "Ocean Escapes", hint: "Beachfront villas and bays" },
  { value: "Forest Hideaways", hint: "Treehouses and woodland stays" },
];

const MAX_ADULTS = 8;
const MAX_CHILDREN = 6;

/* Local YYYY-MM-DD (toISOString would shift the day for some timezones) */
function todayString() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function guestSummary(adults, children) {
  const a = `${adults} ${adults === 1 ? "Adult" : "Adults"}`;
  if (!children) return a;
  return `${a}, ${children} ${children === 1 ? "Child" : "Children"}`;
}

/* Closes a popover on outside click or Escape */
function useDismiss(ref, open, onClose) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, ref, onClose]);
}

/*
  Date input that shows the text "Select date" until it is used,
  instead of the browser's "mm/dd/yyyy". It switches to a real
  date input on focus and opens the calendar.
*/
function DateInput({ id, label, value, onChange, min }) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const isDate = focused || Boolean(value);

  useEffect(() => {
    if (!focused) return;

    try {
      inputRef.current?.showPicker?.();
    } catch {
      /* some browsers only allow showPicker from a direct click: ignore */
    }
  }, [focused]);

  return (
    <div className="field-content">
      <label htmlFor={id}>{label}</label>

      <input
        ref={inputRef}
        id={id}
        type={isDate ? "date" : "text"}
        placeholder="Select date"
        readOnly={!isDate}
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={`${label} date`}
      />
    </div>
  );
}

/* Custom destination dropdown */
function DestinationField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const listId = useId();

  useDismiss(ref, open, () => setOpen(false));

  const choose = (v) => {
    onChange(v);
    setOpen(false);
  };

  const onListKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();

    const items = [...ref.current.querySelectorAll("[role='option']")];
    const i = items.indexOf(document.activeElement);
    const next =
      e.key === "ArrowDown"
        ? items[(i + 1) % items.length]
        : items[(i - 1 + items.length) % items.length];

    next?.focus();
  };

  return (
    <div
      ref={ref}
      className={`booking-field destination-field ${open ? "is-open" : ""}`}
    >
      <MapPin className="booking-icon" size={29} strokeWidth={1.5} />

      <div className="field-content">
        <label htmlFor="destination">Destination</label>

        <button
          type="button"
          id="destination"
          className={`field-trigger ${value ? "" : "is-placeholder"}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !open) {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          {value || "Where to?"}
        </button>
      </div>

      <ChevronDown className="field-chevron" size={18} />

      {open && (
        <div
          className="field-popover destination-popover"
          id={listId}
          role="listbox"
          aria-label="Destination"
          onKeyDown={onListKeyDown}
        >
          {DESTINATIONS.map((d) => {
            const selected = d.value === value;
            return (
              <button
                key={d.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={`popover-option ${selected ? "is-selected" : ""}`}
                onClick={() => choose(d.value)}
                autoFocus={selected}
              >
                <span className="popover-option-text">
                  <strong>{d.value}</strong>
                  <small>{d.hint}</small>
                </span>
                {selected && <Check size={16} strokeWidth={2} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* One row with a minus / count / plus stepper */
function Stepper({ label, sub, value, min, max, onChange }) {
  return (
    <div className="stepper-row">
      <div className="stepper-label">
        <strong>{label}</strong>
        <small>{sub}</small>
      </div>

      <div className="stepper-controls">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus size={15} strokeWidth={2} />
        </button>

        <span aria-live="polite">{value}</span>

        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
        >
          <Plus size={15} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/* Guests dropdown with adult / children steppers */
function GuestsField({ adults, children, onAdults, onChildren }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const panelId = useId();

  useDismiss(ref, open, () => setOpen(false));

  return (
    <div
      ref={ref}
      className={`booking-field guests-field ${open ? "is-open" : ""}`}
    >
      <UserRound className="booking-icon" size={29} strokeWidth={1.5} />

      <div className="field-content">
        <label htmlFor="guests">Guests</label>

        <button
          type="button"
          id="guests"
          className="field-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          {guestSummary(adults, children)}
        </button>
      </div>

      <ChevronDown className="field-chevron" size={18} />

      {open && (
        <div
          className="field-popover guests-popover"
          id={panelId}
          role="dialog"
          aria-label="Choose guests"
        >
          <Stepper
            label="Adults"
            sub="Ages 13+"
            value={adults}
            min={1}
            max={MAX_ADULTS}
            onChange={onAdults}
          />

          <Stepper
            label="Children"
            sub="Ages 0 to 12"
            value={children}
            min={0}
            max={MAX_CHILDREN}
            onChange={onChildren}
          />

          <button
            type="button"
            className="availability-button popover-done"
            onClick={() => setOpen(false)}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}

function BookingBar() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [error, setError] = useState("");

  const today = todayString();

  const handleCheckIn = (value) => {
    setCheckIn(value);
    setError("");

    /* keep the stay valid: drop a check-out that is now too early */
    if (checkOut && value && checkOut <= value) setCheckOut("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!destination) return setError("Please choose a destination.");
    if (!checkIn || !checkOut)
      return setError("Please select your check-in and check-out dates.");
    if (checkOut <= checkIn)
      return setError("Check-out must be after check-in.");

    setError("");

    const nights = Math.round(
      (new Date(checkOut) - new Date(checkIn)) / 86400000
    );

    alert(
      `Your demo search:\nDestination: ${destination}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut} (${nights} ${
        nights === 1 ? "night" : "nights"
      })\nGuests: ${guestSummary(adults, children)}`
    );
  };

  return (
    <form
      className="booking-bar"
      id="booking"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Destination */}
      <DestinationField
        value={destination}
        onChange={(v) => {
          setDestination(v);
          setError("");
        }}
      />

      {/* Check In */}
      <div className="booking-field date-field">
        <CalendarDays className="booking-icon" size={29} strokeWidth={1.5} />

        <DateInput
          id="check-in"
          label="Check In"
          value={checkIn}
          onChange={handleCheckIn}
          min={today}
        />
      </div>

      {/* Check Out */}
      <div className="booking-field date-field">
        <CalendarDays className="booking-icon" size={29} strokeWidth={1.5} />

        <DateInput
          id="check-out"
          label="Check Out"
          value={checkOut}
          onChange={(v) => {
            setCheckOut(v);
            setError("");
          }}
          min={checkIn || today}
        />
      </div>

      {/* Guests */}
      <GuestsField
        adults={adults}
        children={children}
        onAdults={setAdults}
        onChildren={setChildren}
      />

      {/* Availability CTA */}
      <button type="submit" className="availability-button">
        Check Availability
        <ArrowRight size={17} strokeWidth={1.8} />
      </button>

      {error && (
        <p className="booking-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default BookingBar;