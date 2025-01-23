import React, { useState, forwardRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  onChange?: (date: Date | null) => void;
  value?: Date | null;
  className?: string;
  calendarClassName?: string;
  buttonClassName?: string;
  headerClassName?: string;
  gridClassName?: string;
  dayClassName?: string;
  triggerClassName?: string;
  label?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      onChange,
      value,
      className,
      calendarClassName,
      headerClassName,
      gridClassName,
      dayClassName,
      triggerClassName,
      label,
      ...props
    },
    ref,
  ) => {
    const [currentView, setCurrentView] = useState<Date>(value || new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      value || null,
    );

    const isValidDate = (date: Date | null): boolean =>
      date instanceof Date && !isNaN(date.getTime());

    const formatDate = (date: Date | null) => {
      if (!isValidDate(date)) return "";
      return new Intl.DateTimeFormat("pt-BR").format(date as Date);
    };

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const changeMonth = (increment: number) => {
      if (!isValidDate(currentView)) return;
      setCurrentView(
        new Date(
          currentView.getFullYear(),
          currentView.getMonth() + increment,
          1,
        ),
      );
    };

    const changeYear = (increment: number) => {
      if (!isValidDate(currentView)) return;
      setCurrentView(
        new Date(
          currentView.getFullYear() + increment,
          currentView.getMonth(),
          1,
        ),
      );
    };

    const handleDateSelect = (date: Date) => {
      if (!isValidDate(date)) return;
      setSelectedDate(date);
      if (onChange) {
        onChange(date);
      }
    };

    const CalendarHeader = () => (
      <div
        className={cn(
          "flex items-center justify-between border-b p-2",
          headerClassName,
        )}
      >
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => changeYear(-1)}
            aria-label="Ano anterior"
          >
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="-ml-3 h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => changeMonth(-1)}
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            {isValidDate(currentView)
              ? `${months[currentView.getMonth()]} ${currentView.getFullYear()}`
              : ""}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => changeMonth(1)}
            aria-label="Próximo mês"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => changeYear(1)}
            aria-label="Próximo ano"
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="-ml-3 h-4 w-4" />
          </Button>
        </div>
      </div>
    );

    const CalendarGrid = () => {
      if (!isValidDate(currentView)) return null;

      const firstDayOfMonth = new Date(
        currentView.getFullYear(),
        currentView.getMonth(),
        1,
      );
      const daysInMonth = new Date(
        currentView.getFullYear(),
        currentView.getMonth() + 1,
        0,
      ).getDate();
      const days = [];

      for (let i = 1; i <= daysInMonth; i++) {
        const currentDate = new Date(
          currentView.getFullYear(),
          currentView.getMonth(),
          i,
        );
        days.push(
          <button
            type="button"
            key={i}
            onClick={() => handleDateSelect(currentDate)}
            className={cn(
              "rounded-md p-2 text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
              selectedDate &&
                formatDate(selectedDate) === formatDate(currentDate)
                ? "bg-blue-100"
                : "",
              dayClassName,
            )}
            aria-label={`Selecionar ${formatDate(currentDate)}`}
          >
            {i}
          </button>,
        );
      }

      return (
        <div className={cn("p-2", gridClassName)}>
          <div className="grid grid-cols-7 gap-1">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium">
                {day}
              </div>
            ))}
            {Array(firstDayOfMonth.getDay())
              .fill(null)
              .map((_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}
            {days}
          </div>
        </div>
      );
    };

    return (
      <div className={cn("w-full max-w-sm", className)}>
        <label
          htmlFor={props.id || "date-input"}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type="hidden"
          id={props.id || "date-input"}
          ref={ref}
          value={selectedDate ? formatDate(selectedDate) : ""}
          {...props}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal",
                triggerClassName,
              )}
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedDate ? formatDate(selectedDate) : "Selecione uma data"}
              <Calendar className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className={cn("w-auto p-0", calendarClassName)}
            align="start"
          >
            <div className="w-[320px]">
              <CalendarHeader />
              <CalendarGrid />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
