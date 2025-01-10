"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { getPercentageSpaceUsed, getSpaceAvailable } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";

function DashboardChart({ totalSize }: { totalSize: number }) {
  const percentageSpaceUsed = getPercentageSpaceUsed(totalSize);
  const radialChartEndAngle = (percentageSpaceUsed / 100) * 360;

  const chartData = [
    { files: "all", size: { percentageSpaceUsed }, fill: "var(--color-all)" },
  ];

  const chartConfig = {
    size: {
      label: "Space Used",
    },
    files: {
      label: "All Files",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-primary flex flex-col border-transparent">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={radialChartEndAngle}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-white/50 last:fill-primary"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="files" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-4xl font-semibold fill-foreground"
                        >
                          {chartData[0].size.percentageSpaceUsed}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-sm font-medium fill-foreground/50"
                        >
                          Space Used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-base">
        <div className="flex items-center gap-2 font-medium leading-none text-foreground/50">
          Available Storage
        </div>
        <div className="leading-none font-medium tracking-wide">
          {getSpaceAvailable(totalSize)} GB / 2 GB
        </div>
      </CardFooter>
    </Card>
  );
}
export default DashboardChart;
