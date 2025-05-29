/* eslint-disable react/prop-types */
import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { subMonths, format } from "date-fns"
import { useMemo, useState } from "react"
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";

const chartConfig = {
  desktop: {
    label: "Earnings",
    color: "#13F287",
  },
  mobile: {
    label: "Spendings",
    color: "hsl(var(--chart-5))",
  },
}

export function ProfitChart({ earnings = [], payments = [], money }) {
  const [range, setRange] = useState("6months");

  const currentMonthDays = useMemo(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    return eachDayOfInterval({ start, end }).map(date => format(date, "yyyy-MM-dd"));
  }, []);

  const chartData = useMemo(() => {
    if (range === "month") {
      return currentMonthDays.map(day => {
        const earningsTotal = earnings
          .filter(e => e.completed && format(new Date(e.date), "yyyy-MM-dd") === day)
          .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

        const spendingTotal = payments
          .filter(p => p.completed && format(new Date(p.date), "yyyy-MM-dd") === day)
          .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

        return {
          date: format(new Date(day), "d"),
          desktop: earningsTotal || 0,
          mobile: spendingTotal || 0,
          profit: (earningsTotal || 0) - (spendingTotal || 0)
        };
      });
    }

    // 6 months calculation
    return Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return format(date, "yyyy-MM");
    }).reverse().map(month => {
      const earningsTotal = earnings
        .filter(e => e.completed && format(new Date(e.date), "yyyy-MM") === month)
        .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

      const spendingTotal = payments
        .filter(p => p.completed && format(new Date(p.date), "yyyy-MM") === month)
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

      return {
        month: format(new Date(month), "MMMM"),
        desktop: earningsTotal || 0,
        mobile: spendingTotal || 0,
        profit: (earningsTotal || 0) - (spendingTotal || 0)
      };
    });
  }, [range, currentMonthDays, earnings, payments]);

  const totalProfit = chartData.reduce((sum, entry) => sum + entry.profit, 0);
  const currentEntry = chartData[chartData.length - 1]?.profit || 0;
  const previousEntry = chartData[chartData.length - 2]?.profit || 0;
  const percentageChange = previousEntry
    ? ((currentEntry - previousEntry) / previousEntry * 100).toFixed(1)
    : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-4 border rounded-lg shadow-lg">
          <p className="font-bold text-xl mb-2">
            {range === "month" ? `Day ${label}` : label}
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-desktop)]" />
            Earnings: {money} {payload[1]?.value?.toLocaleString()}
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-[var(--color-mobile)]" />
            Spending: {money} {payload[0]?.value?.toLocaleString()}
          </p>
          <p className="text-xl font-semibold mt-2">
            Profit: {money} {(payload[1]?.value - payload[0]?.value).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };



  return (
    <Card className="h-full dark">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-foreground text-3xl">
              Total Profit: {money} {totalProfit.toLocaleString()}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {range === "month" ? "Daily Overview" : "6 Month Financial Overview"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={range === "month" ? "default" : "outline"}
              onClick={() => setRange("month")}
              size="sm"
            >
              Month
            </Button>
            <Button
              variant={range === "6months" ? "default" : "outline"}
              onClick={() => setRange("6months")}
              size="sm"
            >
              6 Months
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-12rem)]">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical stroke="rgba(208, 187, 187, 0.087)" />
              <XAxis
                dataKey={range === "month" ? "date" : "month"}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  range === "month" ? value : value.slice(0, 3)
                }
                stroke="currentColor"
                className="text-muted-foreground"
              />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                strokeWidth={2}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm my-2">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none text-foreground text-xl">
              {range === "month" ? "Daily" : "Monthly"} trend{" "}
              {currentEntry >= 0 ? "up" : "down"} by {Math.abs(percentageChange)}%{" "}
              {currentEntry >= 0 ? (
                <TrendingUp className="h-6 w-6 text-green-500" />
              ) : (
                <TrendingDown className="h-6 w-6 text-red-500" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {range === "month" ?
                format(new Date(), "MMMM yyyy") :
                `${chartData[0]?.month.slice(0, 3)} - ${chartData[chartData.length - 1]?.month.slice(0, 3)} ${new Date().getFullYear()}`
              }
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
