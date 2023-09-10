import React, { useState } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import "./App.Module.scss";
import { calculateAge } from "./utils/calculateAge";

export default function App() {
  const [error, setError] = useState<string[]>([]);
  const [response, setResponse] = useState<null | {
    days: number;
    months: number;
    years: number;
  }>(null);
  const [data, setData] = useState({ day: "", month: "", year: "" });

  const onChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const calculate = () => {
    setError([]);
    var error = false;
    if (parseInt(data.day) <= 0 || parseInt(data.day) > 31 || data.day === "") {
      setError((old) => [...old, "day"]);
      error = true;
    }
    if (
      parseInt(data.month) > 12 ||
      parseInt(data.month) <= 0 ||
      data.month === ""
    ) {
      setError((old) => [...old, "month"]);
      error = true;
    }
    if (data.year === "") {
      setError((old) => [...old, "year"]);
      error = true;
    }

    if (!error) {
      const age = calculateAge(
        new Date(
          parseInt(data.year),
          parseInt(data.month) - 1,
          parseInt(data.day)
        )
      );
      setResponse(age);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card__header">
          <div className="card__header__item">
            <label
              className={
                "card__header__item__label " +
                (error.includes("day") ? " error" : "")
              }
            >
              DAY
            </label>
            <input
              className={
                "card__header__item__input " +
                (error.includes("day") ? " error" : "")
              }
              placeholder="DD"
              onChange={onChange}
              name="day"
            />
            {error.includes("day") && (
              <label className="card__header__item__error">
                Must be a valid day
              </label>
            )}
          </div>

          <div className="card__header__item">
            <label
              className={
                "card__header__item__label " +
                (error.includes("month") ? " error" : "")
              }
            >
              MONTH
            </label>
            <input
              className={
                "card__header__item__input " +
                (error.includes("month") ? " error" : "")
              }
              placeholder="MM"
              onChange={onChange}
              name="month"
            />
            {error.includes("month") && (
              <label className="card__header__item__error">
                Must be a valid day
              </label>
            )}
          </div>

          <div className="card__header__item">
            <label
              className={
                "card__header__item__label " +
                (error.includes("year") ? " error" : "")
              }
            >
              YEAR
            </label>
            <input
              className={
                "card__header__item__input " +
                (error.includes("year") ? " error" : "")
              }
              placeholder="YYYY"
              onChange={onChange}
              name="year"
            />
            {error.includes("year") && (
              <label className="card__header__item__error">
                Must be a valid year
              </label>
            )}
          </div>
        </div>

        <div className="card__separator">
          <img
            className="card__separator__icon"
            onClick={calculate}
            src={arrow}
            alt="arrow"
          />
        </div>

        <div className="card__body">
          <div className="card__body__item">
            <label className="card__body__item__value">
              {response?.years ? response.years : "- -"}
            </label>
            <label className="card__body__item__label">years</label>
          </div>

          <div className="card__body__item">
            <label className="card__body__item__value">
              {response?.months ? response.months : "- -"}
            </label>
            <label className="card__body__item__label">months</label>
          </div>

          <div className="card__body__item">
            <label className="card__body__item__value">
              {response?.days ? response.days : "- -"}
            </label>
            <label className="card__body__item__label">days</label>
          </div>
        </div>
      </div>
    </div>
  );
}
