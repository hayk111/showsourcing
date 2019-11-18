import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
	selector: 'line-chart-app',
	templateUrl: './line-chart.component.html',
	styleUrls: ['./line-chart.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit {

	private _chartData: Array<any>;

	@Input() set chartData(chartData: any[]) {
		this._chartData = chartData;
	}

	get chartData(): any[] {
		return this._chartData;
	}

	lineChartData: Array<ChartDataSets>;
	legends: { [key: string]: boolean; };

	lineChartLabels: Label[] = ['4 weeks ago', '3 weeks ago', '2 weeks ago', 'Last Week', 'This Week'];
	lineChartOptions: (ChartOptions & { annotation: any }) = {
		maintainAspectRatio: false,
		elements: {
			point: { radius: 0 }
		},
		legend: {
			display: false,
		},
		responsive: true,
		scales: {
			xAxes: [{
				gridLines: {
					display: false
				},
				ticks: {
					fontSize: 10,
					fontColor: '#C8CBE1',
					beginAtZero: true
				}
			}],
			yAxes: [{
				gridLines: {
					drawBorder: false,
					borderDash: [3, 4],
					color: '#F3F5FE',
				},
				ticks: {
					padding: 10,
					fontSize: 10,
					fontColor: '#C8CBE1',
					beginAtZero: true
				}
			}]
		},
		annotation: {},
	};
	lineChartColors: Color[] = [
		{
			backgroundColor: '#789DF8',
			borderColor: '#789DF8',
		},
		{
			backgroundColor: '#D7E3FD',
			borderColor: '#D7E3FD',
		}
	];
	lineChartType = 'line';
	lineChartPlugins = [pluginAnnotations];

	@ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

	constructor() { }

	ngOnInit() {
		this.lineChartData = this._chartData.slice();
		this.legends = {};

		this._chartData.forEach((item: ChartDataSets) => {
			this.legends[item.label] = true;
		});
	}

	toggleItem(itemClass: string) {
		this.legends[itemClass] = !this.legends[itemClass];

		if (this.legends[itemClass]) {
			this.toggleDataItem(itemClass, false);
			return;
		}

		this.toggleDataItem(itemClass, true);
	}

	toggleDataItem(label: string, toAdd: boolean) {
		const index = this.lineChartData.findIndex(el => el.label === label);
		this.lineChartData[index].hidden = toAdd;
		this.chart.update();
	}
}
