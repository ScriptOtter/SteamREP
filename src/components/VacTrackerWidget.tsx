import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Container } from "./container";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "@/services/apiService";
import { PageLoader } from "./Loader";
import { cn } from "@/lib/utils";

export const description = "An interactive area chart";

interface IBans {
  createdAt: Date;
  number: number;
}

const chartConfig = {
  number: {
    label: "VAC Banned:",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function VacTrackerWidget() {
  const [chartData, setChartData] = useState<IBans[]>([]);
  const [timeRange, setTimeRange] = useState("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (timeRange === "") setTimeRange("7d");
  }, [timeRange]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_ENDPOINTS.getBans);

      setChartData(res.data);

      setLoading(false);
    };
    fetchData();
  }, []);
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.createdAt);

    const referenceDate = new Date(chartData[0].createdAt);
    let daysToSubtract = 7;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else daysToSubtract = chartData.length;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return date >= startDate;
  });
  const days = Number(timeRange.split("d")[0]);
  console.log(timeRange, days);
  return (
    <>
      {!loading ? (
        <div className="w-full flex justify-center text-white">
          <Container>
            <Card className="@container/card text-white">
              <CardHeader>
                <CardTitle>VAC Tracker</CardTitle>
                <CardDescription>
                  <span className="hidden @[540px]/card:block">
                    Total for the last {chartData.length} days
                  </span>
                  <span className="@[540px]/card:hidden">All time</span>
                </CardDescription>
                <CardAction>
                  <ToggleGroup
                    type="single"
                    value={timeRange}
                    onValueChange={setTimeRange}
                    variant="outline"
                    className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
                  >
                    <ToggleGroupItem
                      className={cn(
                        timeRange === `${chartData.length}d` && "bg-light-gray",
                        "cursor-pointer"
                      )}
                      value={`${chartData.length}d`}
                    >
                      All time
                    </ToggleGroupItem>
                    {days >= 30 && (
                      <ToggleGroupItem
                        className={cn(
                          timeRange === `30d` && "bg-light-gray",
                          "cursor-pointer"
                        )}
                        value="30d"
                      >
                        Last 30 days
                      </ToggleGroupItem>
                    )}
                    {days >= 7 && (
                      <ToggleGroupItem
                        className={cn(
                          timeRange === `7d` && "bg-light-gray",
                          "cursor-pointer"
                        )}
                        value="7d"
                      >
                        Last 7 days
                      </ToggleGroupItem>
                    )}
                  </ToggleGroup>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                      className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
                      size="sm"
                      aria-label="Select a value"
                    >
                      <SelectValue placeholder="All time" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl text-white">
                      <SelectItem
                        value={`${chartData.length}d`}
                        className="rounded-lg"
                      >
                        All time
                      </SelectItem>
                      {days >= 30 && (
                        <SelectItem value="30d" className="rounded-lg">
                          Last 30 days
                        </SelectItem>
                      )}
                      {days >= 7 && (
                        <SelectItem value="7d" className="rounded-lg">
                          Last 7 days
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </CardAction>
              </CardHeader>
              <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[350px] w-full "
                >
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-light-blue-2)"
                          stopOpacity={1.0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="createdAt"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                          indicator="dot"
                        />
                      }
                    />
                    <Area
                      dataKey="number"
                      type="natural"
                      fill="url(#fillDesktop)"
                      stroke="var(--color-light-blue)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </Container>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
}
