import { Component, OnInit } from '@angular/core';
import { PhimService } from 'src/app/services/phim.service';
import { GoogleChartInterface, GoogleChartsControlInterface, GoogleChartsDashboardInterface } from 'ng2-google-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color, SingleDataSet } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  topRatedMovies: any[] = [];

  // Doughnut Chart
  doughnutChartOptions: any = {
    responsive: false,
    legend: {
      fullSize: false, 
      position: 'bottom', 
      labels: {
        font: {
          size: 10
        },
        fontColor: 'white', 
        usePointStyle: true, 
        padding: 20,
      }
    },

  }
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    [999552, 856421, 786147, 625121]
  ];
  public doughnutChartColors: Color[] = [{
    backgroundColor: ['#e20e02', '#f68a04', '#007aff', '#14e788']
  }];
  doughnutChartType: ChartType = 'doughnut';

  // Bar chart
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { //you're missing this
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Billion'
         }
      }]
   },
   legend: {
    position: "bottom",
    labels: {
      fontColor: 'white'
    }
  }

  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: '#411714' },
  ]

  barChartData: ChartDataSets[] = [
    { data: [4.8, 3.5, 3.2, 2.1, 0], label: 'Revenue' }
  ];

  //Pie Chart
  public pieChartOptions: ChartOptions = {
    responsive: false,
    legend: {
      position: "right",
      labels: {
        fontColor: 'white',
        
      }
    }
    };
  public pieChartLabels: string[] = ['Action', 'Comedy', 'Horror', 'Drama', 'Kids', 'Science'];
  public pieChartData: SingleDataSet  = [30, 16, 14, 25, 10, 25];
  public pieChartType: ChartType  = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    borderColor: ['#e20e02', '#75868a', '#1060ff', '#f68a04', '#14e788', "#545e75"],
    backgroundColor: ['#411714', '#2e2f30', '#142c47','#453015', "#18422f", "#25272b"]
  }];
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // Test với GoogleChart
  // public pieChart: GoogleChartInterface = {
  //   chartType: 'PieChart',
  //   dataTable: [
  //     ['Task', 'Hours per Day'],
  //     ['Work', 11],
  //     ['Eat', 2],
  //     ['Commute', 2],
  //     ['Watch TV', 2],
  //     ['Sleep', 7]
  //   ],
  //   //firstRowIsData: true,
  //   options: { 'title': 'Tasks' },
  // };

  // public slider: GoogleChartsControlInterface = {
  //   controlType: 'NumberRangeFilter',
  //   options: {
  //     filterColumnIndex: 2,
  //     ui: {
  //       labelStacking: 'vertical',
  //       label: 'Age Filter:'
  //     }
  //   }
  // };

  // public categoryPicker: GoogleChartsControlInterface = {
  //   controlType: 'CategoryFilter',
  //   options: {
  //     filterColumnIndex: 1,
  //     ui: {
  //       labelStacking: 'vertical',
  //       label: 'Gender Selection:',
  //       allowTyping: false,
  //       allowMultiple: false
  //     }
  //   }
  // };

  // public dashboardPieChart: GoogleChartInterface = {
  //   chartType: 'PieChart',
  //   options: {
  //     width: 250,
  //     height: 250,
  //     legend: 'none',
  //     chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
  //     pieSliceText: 'label',
  //     backgroundColor: 'transparent',
  //   },
  //   view: { columns: [0, 3] }
  // };

  // public dashboardTable: GoogleChartInterface = {
  //   chartType: 'Table',
  //   options: {
  //     alternatingRowStyle: true,
  //     showRowNumber: true,
  //     allowHtml: true,
  //   },
  // };

  // public dashboard: GoogleChartsDashboardInterface = {
  //   dataTable: [
  //     // ['Cinema Complex', 'Movie', 'Ticket', 'Revenue'],
  //     ['BHD Phạm Hùng', '', 525000, 7000000000],
  //     ['BHD Vincom Quang Trung', '', 426000, 5000000000],
  //     ['BHD Vincom Thảo Điền', '', 325500, 3000000000],
  //     ['BHD Đường 3/2', '', 25000, 1000000000],

  //     // ['Elisa', 'Female', 20, 7],
  //     // ['Robert', 'Male', 7, 3],
  //     // ['John', 'Male', 54, 2],
  //     // ['Jessica', 'Female', 22, 6],
  //     // ['Aaron', 'Male', 3, 1],
  //     // ['Margareth', 'Female', 42, 8],
  //     // ['Miranda', 'Female', 33, 6],
  //     // ['Miranda', 'Óc chó', 33, 6]
  //   ],
  //   formatters: [
  //     {
  //       columns: [3],
  //       type: 'ArrowFormat',
  //       options: {
  //         base: 5,
  //       },
  //     },
  //   ],
  //   bind: [
  //     [
  //       [this.slider, this.categoryPicker],
  //       [this.dashboardPieChart, this.dashboardTable]
  //     ]
  //   ],
  // };

  constructor(private phimSV: PhimService) { }

  ngOnInit(): void {
   
    this.phimSV.LayDanhSachPhim().subscribe(
      (movieList) => {
        movieList.sort((a: any, b: any) => b.danhGia - a.danhGia);
        console.log(movieList); // Danh dánh đã được sort theo thứ tự điểm cao nhất
        this.topRatedMovies = movieList.slice(0, 4);
        this.topRatedMovies.forEach(
          (item) => {
            this.doughnutChartLabels.push(item.tenPhim);
            this.barChartLabels.push(item.tenPhim) 
          }
        )
        // Thêm 2 phim cho bar chart nhiều nhiều tí
        // this.barChartLabels .push(movieList[4].tenPhim);
        // this.barChartLabels .push(movieList[5].tenPhim);

        
      }
    )
  }

}


