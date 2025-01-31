"use client";

import { useOperationsStore } from "@/stores/operationsStore";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Loader from "./Loader";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const { isLoading } = useOperationsStore();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white flex p-14 rounded-lg shadow-md">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default EventCalendar;
