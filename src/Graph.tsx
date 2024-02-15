/**
 * Copyright 2023-2024 Highway9 Networks Inc.
 */
import { useRef, useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import moment from "moment";

type DataType = {
  name: string;
  data: Array<number>;
  color: string;
};

type BarStackProps = {
  data: Array<DataType>;
  timezone: string;
};

export function WidgetStackBarGraph(props: BarStackProps) {
  const {
    data,
    timezone: tz,
  } = props;
  const chartRef = useRef(null);

  const chartOptions: Highcharts.Options = useMemo(
    () => ({
      time: {
        timezone: tz,
        moment: moment,
        useUTC: false,

      
      },
      chart: {
        type: "bar",
        height: 58,

      },
      credits: {
        enabled: false
      },
      title: {
        text: "",
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        type: "logarithmic",
        reversedStacks: false,
        visible: false
      },
      legend: {
        reversed: false,
        enabled: true,
        align: "right",
        verticalAlign: "middle",
        layout: "horizontal",
        itemDistance: 6,
        lineHeight: 12,
        margin: 0,
        symbolRadius: 2,
        padding: 0,

        labelFormatter: function() {
          if (this.data.every(point => point.y === 0)) {
            return '<span style="color: #ccc; pointer-events: none;">' + this.name + '</span>';
          } else {
            return this.name;
          }}
        
      },

      plotOptions: {
        series: {

          stacking: "normal",
          borderWidth: 2,
          pointWidth: 15,
          borderRadiusTopLeft: "50%",
          borderRadiusTopRight: "50%",
          dataLabels: {
            formatter: function() {
              // Check if the point's value is 0
              if (this.y === 0) {
                // Return false to not display the label
                return ;
              } else {
                // Return the default label text
                return this.y;
              }},
            enabled: true,
            align: "center",
            y: 20,
            style: {
              textOutline: "none",
              color: "#352aff"
            }
          }
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: function (this: any) {
          return `<strong>${this.series.name}:</strong> ${this.y}`;
        }
      },
      series: data
    }),
    [data, tz]
  );

  return (
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
        />
  );
}