import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';
// import * as d3 from 'd3-selection';
// import * as d3Scale from 'd3-scale';
// import * as d3Shape from 'd3-shape';
// import * as d3Array from 'd3-array';
// import * as d3Axis from 'd3-axis';

import { Attack } from '../attack-round/attack/attack.model';
import { AttackRound } from '../attack-round/attack-round.model';
import { DamageCalculatorService } from '../damage-calculator.service';

@Component({
  selector: 'app-damage-stats',
  templateUrl: './damage-stats.component.html',
  styleUrls: ['./damage-stats.component.css']
})
export class DamageStatsComponent implements OnInit {
  @Input() data: [number, number][][];
  @Input() statColors: string[];
  @Input() statColorLabels: string[] = [];
  private svg;
  private xScale;
  private yScale;
  private colorMap;
  private margin = 50;
  private width = 800 - (this.margin * 2);
  private height = 600 - (this.margin * 2);
  private transitionDuration = 750;

  private adv: boolean = false;

  private bisectAC = d3.bisector((d) => (d[0])).left;

  constructor(private dcService: DamageCalculatorService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.statColors.length; i++) {
      this.statColorLabels.push(`${i}`);
    }

    this.createSvg();
    this.drawPlot();

    this.dcService.statsUpdated.subscribe(
      (data: [number, number][][]) => {
        if (data.length == this.data.length) {
          this.data = data;
          this.updatePlot();
        } else {
          this.data = data;
          d3.selectAll("svg").remove();
          this.createSvg();
          this.drawPlot();
        }
      }
    );
  }

  private createSvg(): void {
    this.svg = d3.select("figure#damage-stats")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private setScales() {
    this.xScale = d3.scaleLinear()
      .domain([this.data[0][0][0], this.data[0].slice(-1)[0][0]])
      .range([ 0, this.width ]);

    var yMax = this.data[0][0][1];
    for (let i = 1; i < this.data.length; i++) {
      if (yMax < this.data[i][0][1]) {
        yMax = this.data[i][0][1];
      }
    }

    this.yScale = d3.scaleLinear()
      .domain([0, yMax + 1])
      .range([ this.height, 0]);
  }

  private drawPlot(): void {
    this.setScales();

    this.svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));

    this.svg.append("g")
      .attr("id", "y-axis")
      .call(d3.axisLeft(this.yScale));

    this.colorMap = d3.scaleOrdinal()
      .domain(this.statColorLabels)
      .range(this.statColors);

    var ac = Math.ceil((this.data[0][0][0] + this.data[0].slice(-1)[0][0]) / 2);
    var acIndex = ac - this.data[0][0][0];

    this.svg.append("text")
      .attr("id", "text-xlabel")
      .attr("x", this.width / 2 - 20)
      .attr("y", this.height + 35)
      .text("AC");

    this.svg.append("text")
      .attr("id", "text-ylabel")
      .attr("x", -this.height / 2 - 80)
      .attr("y", -25)
      .attr("transform", "rotate(-90)")
      .text("Expected Damage per Turn");

    this.svg.append("text")
      .attr("id", "text-ac")
      .style("stroke", "black")
      .style("stroke-width", "0.5px")
      .attr("x", this.width - this.margin - 200)
      .attr("y", 30)
      .text(`Damage/Turn vs. AC: ${this.data[0][acIndex][0]}`);

    for (let i = 0; i < this.data.length; i++) {
      this.svg
        .append("path")
        .datum(this.data[i])
        .attr("id", `path-${i}`)
        .attr("fill", "none")
        .attr("stroke", this.colorMap(`${i}`))
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x((d) => { return this.xScale(d[0]) })
        .y((d) => { return this.yScale(d[1]) })
             );

      this.svg
        .append("circle")
        .attr("id", `circle-${i}`)
        .style("fill", this.colorMap(`${i}`))
        .style("stroke", this.colorMap(`${i}`))
        .style("display", "none")
        .attr("r", 2);

      this.svg.append("text")
        .attr("id", `text-dmg-${i}`)
        .style("stroke", "black")
        .style("stroke-width", "0.5px")
        .style("stroke", this.colorMap(`${i}`))
        .attr("x", this.width - this.margin - 200)
        .attr("y", 30 + 20 * (i + 1))
        .text(`Attack Option #${i + 1}: ${this.data[i][acIndex][1].toFixed(2)}`);
    }

    this.svg.append("rect")
      .attr("id", "rect-tooltip")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => { this.mouseOver(); })
      .on("mouseout", () => { this.mouseOut(); })
      .on("mousemove", () => { this.mouseMove(); });
  }

  updatePlot() {
    this.setScales();

    d3.select("#x-axis")
      .transition()
      .duration(this.transitionDuration)
      .call(d3.axisBottom(this.xScale).bind(this));

    d3.select("#y-axis")
      .transition()
      .duration(this.transitionDuration)
      .call(d3.axisLeft(this.yScale).bind(this));

    for (let i = 0; i < this.data.length; i++) {
      d3.select(`#path-${i}`)
        .datum(this.data[i])
        .transition()
        .duration(this.transitionDuration)
        .attr("d", d3.line()
        .x((d) => { return this.xScale(d[0]) })
        .y((d) => { return this.yScale(d[1]) })
             );
    }

    this.updateText(
      Math.ceil(
        (this.data[0][0][0] + this.data[0].slice(-1)[0][0]) / 2
      )
    );
  }

  updateText(ac: number) {
    var index = ac - this.data[0][0][0];

    d3.select("#text-ac")
      .text(`Damage/Turn vs. AC ${ac}`);

    for (let i = 0; i < this.data.length; i++) {
      var x = this.xScale(this.data[i][index][0]);
      var y = this.yScale(this.data[i][index][1]);
      // console.log(`translate(${x},${y})`);

      d3.select(`#circle-${i}`)
        .attr("transform", `translate(${x},${y})`);

      d3.select(`#text-dmg-${i}`)
        .text(`Attack Option #${i + 1}: ${this.data[i][index][1].toFixed(2)}`);
    }
  }

  mouseOver() {
    for (let i = 0; i < this.data.length; i++) {
      d3.select(`#circle-${i}`)
        .style("display", null);
    }
  }

  mouseOut() {
    for (let i = 0; i < this.data.length; i++) {
      d3.select(`#circle-${i}`)
        .style("display", "none");
    }
  }

  mouseMove() {
    var ac = Math.round(
      this.xScale.invert(
        d3.mouse(this.svg.select("g").node())[0]
      )
    );

    this.updateText(ac);
  }
}
